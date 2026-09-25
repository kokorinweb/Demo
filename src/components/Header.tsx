"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { COMPANY, TEL_URL, WHATSAPP_URL } from "@/lib/company";

const LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#works", label: "Работы" },
  { href: "#prices", label: "Цены" },
  { href: "#stages", label: "Этапы" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b flat-transition ${
        scrolled
          ? "border-border bg-card text-foreground"
          : "border-transparent bg-primary-deep text-on-primary"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px]">
        <a href="#top" className="flex items-center gap-2.5">
          <span
            className={`flex h-8 w-8 items-center justify-center border-2 font-bold flat-transition ${
              scrolled ? "border-primary text-primary" : "border-on-primary text-on-primary"
            }`}
          >
            R
          </span>
          <span className="text-[15px] font-bold tracking-tight sm:text-base">
            RemontHouseRoom
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium flat-transition ${
                scrolled ? "hover:text-primary" : "text-on-primary/80 hover:text-on-primary"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={TEL_URL}
            className={`hidden items-center gap-2 text-sm font-semibold tabular-nums flat-transition sm:flex ${
              scrolled ? "hover:text-primary" : "text-on-primary/90 hover:text-on-primary"
            }`}
          >
            <Icon name="phone" className="h-[18px] w-[18px]" />
            {COMPANY.phone}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer whitespace-nowrap bg-accent px-4 py-2.5 text-[13px] font-bold text-on-accent flat-transition hover:bg-accent-hover hover:text-on-primary sm:px-5 sm:text-sm"
          >
            <span className="sm:hidden">Написать</span>
            <span className="hidden sm:inline">Получить расчёт</span>
          </a>
        </div>
      </div>
    </header>
  );
}
