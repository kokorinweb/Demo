"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { COMPANY, TEL_URL, WHATSAPP_URL } from "@/lib/company";

const LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#works", label: "Что делаем" },
  { href: "#prices", label: "Цены" },
  { href: "#request", label: "Заявка" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 warm-transition ${
        scrolled ? "border-b border-line bg-sand/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-walnut text-[17px] font-bold text-sand">
            R
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[17px] font-bold">RemontHouseRoom</span>
            <span className="block text-[12.5px] text-ink-soft">
              Ремонт под ключ · {COMPANY.city}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] text-ink-soft warm-transition hover:text-walnut"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={TEL_URL}
            className="hidden text-[15px] font-semibold tabular-nums warm-transition hover:text-walnut xl:block"
          >
            {COMPANY.phone}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden cursor-pointer items-center gap-2 press active:scale-[0.97] rounded-full bg-walnut px-5 py-2.5 text-[14px] font-semibold text-sand warm-transition hover:bg-walnut-deep sm:inline-flex"
          >
            <Icon name="whatsapp" className="h-[18px] w-[18px]" />
            Написать
          </a>
        </div>
      </div>
    </header>
  );
}
