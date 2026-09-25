"use client";

import { useEffect, useState } from "react";
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled
          ? "border-b bg-plaster/95 backdrop-blur seam text-ink"
          : "border-b border-transparent text-plaster"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <a href="#top" className="group flex items-baseline gap-2.5">
          <span className="font-display text-[15px] font-medium tracking-tight sm:text-lg">
            RemontHouseRoom
          </span>
          <span
            className={`hidden text-xs transition-colors sm:inline ${
              scrolled ? "text-ink-soft" : "text-plaster/60"
            }`}
          >
            {COMPANY.city}
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`group relative py-1 transition-colors ${
                scrolled ? "hover:text-brass" : "text-plaster/80 hover:text-plaster"
              }`}
            >
              <span>{link.label}</span>
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brass transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={TEL_URL}
            className={`hidden text-sm tabular-nums transition-colors sm:block ${
              scrolled ? "hover:text-brass" : "text-plaster/85 hover:text-plaster"
            }`}
          >
            {COMPANY.phone}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sheen whitespace-nowrap rounded-tile bg-brass px-3.5 py-2.5 text-[13px] font-medium text-plaster transition-colors hover:bg-brass-bright sm:px-4 sm:text-sm"
          >
            <span className="sm:hidden">WhatsApp</span>
            <span className="hidden sm:inline">Написать в WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
