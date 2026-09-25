/**
 * Путь к файлу из public. На GitHub Pages сайт лежит в подкаталоге, а
 * next/image в статическом экспорте не подставляет basePath сам.
 */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE}${path}`;
}
