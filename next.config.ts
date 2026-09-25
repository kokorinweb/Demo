import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 собирает статику для GitHub Pages: без сервера, поэтому
 * помощник в заявке работает по шагам, а ИИ-ответы отключаются сами.
 * Обычная сборка (Vercel, Docker) поднимает и /api/chat.
 */
const isExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@anthropic-ai/sdk"],
  ...(isExport ? { output: "export" as const, basePath } : {}),
  images: {
    // В галерее лежат наши собственные SVG-иллюстрации.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    ...(isExport ? { unoptimized: true } : {}),
  },
};

export default nextConfig;
