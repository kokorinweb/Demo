"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { TEL_URL, WHATSAPP_URL } from "@/lib/company";

/**
 * Нижняя панель на телефоне: два действия под большой палец.
 * Появляется после первого экрана, чтобы не перекрывать кнопки героя.
 */
export function MobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card p-3 transition-transform duration-200 ease-out lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-2.5">
        <a
          href={TEL_URL}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 border-2 border-primary px-4 py-3.5 text-[15px] font-bold text-primary"
        >
          <Icon name="phone" className="h-[18px] w-[18px]" />
          Позвонить
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-[1.3] cursor-pointer items-center justify-center gap-2 bg-accent px-4 py-3.5 text-[15px] font-bold text-on-accent"
        >
          <Icon name="message" className="h-[18px] w-[18px]" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
