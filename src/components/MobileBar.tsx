"use client";

import { useEffect, useState } from "react";
import { TEL_URL, WHATSAPP_URL } from "@/lib/company";

/**
 * Нижняя панель на телефоне: два действия, до которых всегда дотягивается
 * большой палец. Появляется после первого экрана, чтобы не перекрывать
 * кнопки героя.
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
      className={`fixed inset-x-0 bottom-0 z-40 border-t bg-plaster/95 p-3 backdrop-blur transition-transform duration-500 seam lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-2.5">
        <a
          href={TEL_URL}
          className="flex-1 rounded-tile border px-4 py-3.5 text-center text-[15px] font-medium seam"
        >
          Позвонить
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.4] rounded-tile bg-brass px-4 py-3.5 text-center text-[15px] font-medium text-plaster"
        >
          Написать в WhatsApp
        </a>
      </div>
    </div>
  );
}
