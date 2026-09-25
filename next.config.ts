import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Помощник ходит наружу — держим его только на Node-рантайме.
  serverExternalPackages: ["@anthropic-ai/sdk"],
  images: {
    // В галерее сейчас лежат наши собственные SVG-заглушки. Когда на их место
    // придут фотографии клиента, эту настройку можно убрать.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
