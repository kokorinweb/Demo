/**
 * Сборка статики для GitHub Pages.
 *
 * Экспорт не умеет серверные маршруты, поэтому на время сборки убираем
 * src/app/api и возвращаем обратно. Помощник в заявке это переживает: без
 * ответа от сервера он ведёт по шагам, ради чего и написан.
 */
import { execFileSync } from "node:child_process";
import { existsSync, renameSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const api = path.join(root, "src", "app", "api");
const parked = path.join(root, ".api-parked");
const base = process.env.PAGES_BASE_PATH ?? "/Demo";

if (existsSync(parked)) rmSync(parked, { recursive: true, force: true });
const moved = existsSync(api);
if (moved) renameSync(api, parked);

try {
  execFileSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      PAGES_BASE_PATH: base,
      NEXT_PUBLIC_BASE_PATH: base,
    },
  });
} finally {
  if (moved) renameSync(parked, api);
}
