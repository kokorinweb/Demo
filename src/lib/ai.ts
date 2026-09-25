import Anthropic from "@anthropic-ai/sdk";
import { COMPANY } from "./company";
import { PRICES, PRICE_DISCLAIMER, SERVICES, STAGES } from "./services";

/**
 * Модель. По умолчанию Haiku 4.5: консультант на лендинге должен отвечать
 * быстро, а вопросы тут простые — услуги, цены, адрес. Если понадобятся
 * ответы поумнее, меняется одной переменной окружения.
 */
export const AI_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5";

export type ChatMessage = { role: "user" | "assistant"; content: string };

/** Что фронт делает после ответа помощника. */
export type AssistantAction =
  | { type: "show_section"; section: string }
  | { type: "prefill_request"; service?: string; area?: number; comment?: string };

export type StreamEvent =
  | { type: "text"; text: string }
  | { type: "action"; action: AssistantAction };

const SECTIONS = [
  { id: "services", title: "Услуги" },
  { id: "works", title: "Примеры работ" },
  { id: "prices", title: "Примеры цен" },
  { id: "stages", title: "Этапы работы" },
  { id: "reviews", title: "Отзывы" },
  { id: "request", title: "Форма заявки" },
  { id: "contacts", title: "Контакты" },
] as const;

let client: Anthropic | null = null;

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY не задан");
  client ??= new Anthropic({ apiKey });
  return client;
}

export function aiConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

function servicesForPrompt(): string {
  return SERVICES.map(
    (service) =>
      `- [${service.id}] ${service.title}. ${service.lead} Входит: ${service.includes.join(", ")}.`,
  ).join("\n");
}

function buildSystemPrompt(): string {
  return `Ты — Марк, консультант компании «${COMPANY.name}»: ремонт квартир и санузлов под ключ в городе ${COMPANY.city}.

ЧТО ТЫ ТОЧНО ЗНАЕШЬ
Адрес: ${COMPANY.city}, ${COMPANY.address}.
Телефон и WhatsApp: ${COMPANY.phone}. Есть Viber на том же номере.
Часы: ${COMPANY.hours}.
Оценка на Яндекс Картах: ${COMPANY.rating} из 5 (${COMPANY.reviewCount} оценок, ${COMPANY.textReviewCount} текстовых отзывов).

УСЛУГИ (других не существует)
${servicesForPrompt()}

ЦЕНЫ (известны ровно две)
${PRICES.map((p) => `- ${p.title}: ${p.price}. ${p.note}.`).join("\n")}
${PRICE_DISCLAIMER}

КАК ИДЁТ РАБОТА
${STAGES.map((stage, index) => `${index + 1}. ${stage.title}: ${stage.text}`).join("\n")}

ЧЕГО ТЫ НЕ ЗНАЕШЬ И НЕ ПРИДУМЫВАЕШЬ НИКОГДА
Срок и условия гарантии. Стаж компании и число сделанных объектов. Бесплатный ли замер. Цену за квадратный метр. Сроки ремонта в днях. Работает ли компания в Москве и области. Делает ли дизайн-проекты. Закупает ли материалы. Юридическое название и реквизиты. Есть ли скидки и акции. Занимается ли компания каркасными домами, фундаментами, гаражами и промышленными полами.
Если спрашивают об этом — прямо скажи, что не можешь ответить за компанию, и предложи спросить по телефону ${COMPANY.phone} или в WhatsApp. Не угадывай и не отвечай «обычно бывает так».

ПРАВИЛА
1. Отвечай только по сведениям выше. Никаких выдуманных цифр, сроков и обещаний.
2. Обе цены называй ровно как есть и всегда добавляй, что точная сумма считается после осмотра.
3. Отвечай по-русски, коротко: 2–4 предложения. Без списков на пол-экрана, если не просят подробностей.
4. Когда человек описал, что нужно сделать, предложи оставить заявку и вызови prefill_request — заполни форму за него.
5. Когда просят показать работы, цены, этапы или контакты — вызывай show_section.
6. Ты не принимаешь заявки сам и не назначаешь время. Форма на сайте открывает WhatsApp, там с человеком говорит мастер.
7. Не пиши Markdown, таблицы и заголовки — только обычный текст.`;
}

const TOOLS: Anthropic.Tool[] = [
  {
    name: "show_section",
    description:
      "Прокрутить сайт к нужному разделу. Вызывай, когда человек просит показать работы, цены, этапы, отзывы или контакты.",
    input_schema: {
      type: "object",
      properties: {
        section: {
          type: "string",
          enum: SECTIONS.map((section) => section.id),
          description: "Идентификатор раздела",
        },
      },
      required: ["section"],
    },
  },
  {
    name: "prefill_request",
    description:
      "Заполнить форму заявки за человека и прокрутить к ней. Вызывай, когда понятно, что именно нужно отремонтировать.",
    input_schema: {
      type: "object",
      properties: {
        service: {
          type: "string",
          enum: SERVICES.map((service) => service.id),
          description: "Услуга из списка",
        },
        area: { type: "number", description: "Площадь в квадратных метрах, если человек её назвал" },
        comment: {
          type: "string",
          description: "Короткое описание задачи словами человека, до 200 символов",
        },
      },
      required: [],
    },
  },
];

const MAX_TOOL_ROUNDS = 3;

function runTool(
  name: string,
  input: Record<string, unknown>,
): { result: string; action?: AssistantAction; isError?: boolean } {
  if (name === "show_section") {
    const section = String(input.section ?? "");
    const known = SECTIONS.find((item) => item.id === section);
    if (!known) return { result: `Ошибка: раздела «${section}» нет.`, isError: true };
    return { result: `Открыт раздел «${known.title}».`, action: { type: "show_section", section } };
  }

  if (name === "prefill_request") {
    const service = SERVICES.find((item) => item.id === input.service)?.id;
    const rawArea = Number(input.area);
    const area = Number.isFinite(rawArea) && rawArea > 0 ? Math.round(rawArea) : undefined;
    const comment =
      typeof input.comment === "string" ? input.comment.slice(0, 200).trim() || undefined : undefined;

    return {
      result: "Форма заявки заполнена и открыта. Человек проверит поля и отправит сам.",
      action: { type: "prefill_request", service, area, comment },
    };
  }

  return { result: `Ошибка: инструмента «${name}» нет.`, isError: true };
}

/**
 * Один ход диалога. Токены отдаём по мере генерации, действия — по мере
 * вызова инструментов, поэтому виджет начинает печатать почти сразу.
 */
export async function* streamAssistant(
  history: ChatMessage[],
): AsyncGenerator<StreamEvent> {
  const anthropic = getClient();
  const messages: Anthropic.MessageParam[] = history.map((message) => ({
    role: message.role,
    content: message.content,
  }));

  for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
    const stream = anthropic.messages.stream({
      model: AI_MODEL,
      max_tokens: 600,
      system: buildSystemPrompt(),
      tools: TOOLS,
      messages,
    });

    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        yield { type: "text", text: event.delta.text };
      }
    }

    const message = await stream.finalMessage();
    const toolUses = message.content.filter(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use",
    );

    // Обрезанный по лимиту вызов инструмента исполнять нельзя: аргументы
    // могли не дописаться.
    if (message.stop_reason === "max_tokens" && toolUses.length > 0) return;
    if (message.stop_reason === "refusal") return;
    if (toolUses.length === 0) return;

    const results: Anthropic.ToolResultBlockParam[] = [];
    for (const toolUse of toolUses) {
      const outcome = runTool(toolUse.name, (toolUse.input ?? {}) as Record<string, unknown>);
      if (outcome.action) yield { type: "action", action: outcome.action };
      results.push({
        type: "tool_result",
        tool_use_id: toolUse.id,
        content: outcome.result,
        is_error: outcome.isError,
      });
    }

    messages.push({ role: "assistant", content: message.content });
    messages.push({ role: "user", content: results });
  }
}
