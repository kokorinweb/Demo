"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { TEL_URL, WHATSAPP_URL } from "@/lib/company";

/** Нижняя панель на телефоне: два действия под большой палец. */
export function MobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-sand/95 px-3 py-3 backdrop-blur warm-transition lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-2.5">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-[1.25] cursor-pointer items-center justify-center gap-2 press active:scale-[0.97] rounded-full bg-walnut px-4 py-3.5 text-[15px] font-semibold text-sand"
        >
          <Icon name="whatsapp" className="h-[18px] w-[18px]" />
          WhatsApp
        </a>
        <a
          href={TEL_URL}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 press active:scale-[0.97] rounded-full bg-surface px-4 py-3.5 text-[15px] font-semibold"
        >
          <Icon name="phone" className="h-[18px] w-[18px] text-walnut" />
          Позвонить
        </a>
      </div>
    </div>
  );
}
