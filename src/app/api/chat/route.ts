import { z } from "zod";
import { aiConfigured, streamAssistant } from "@/lib/ai";
import { COMPANY } from "@/lib/company";
import { clientIp, rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(20),
});

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  if (!aiConfigured()) {
    return errorResponse(
      `Консультант сейчас недоступен. Напишите нам в WhatsApp: ${COMPANY.phone}`,
      503,
    );
  }

  if (!rateLimit(`chat:${clientIp(request)}`, 20, 60_000)) {
    return errorResponse("Слишком много сообщений подряд. Подождите минуту.", 429);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse("Некорректный запрос", 400);
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) return errorResponse("Некорректный запрос", 400);

  // Историю присылает клиент, поэтому последнее слово всегда за человеком.
  const messages = parsed.data.messages;
  if (messages.at(-1)?.role !== "user") return errorResponse("Некорректный запрос", 400);

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      try {
        for await (const event of streamAssistant(messages)) {
          if (event.type === "text") send("text", { text: event.text });
          else send("action", event.action);
        }
        send("done", {});
      } catch (error) {
        console.error("[api/chat] ошибка помощника:", error);
        send("error", {
          message: `Помощник не ответил. Попробуйте ещё раз или напишите в WhatsApp: ${COMPANY.phone}`,
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
