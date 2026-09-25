"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Задержка внутри одной группы, чтобы элементы проявлялись каскадом. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Показывает блок, когда он въезжает в экран. Один наблюдатель на элемент,
 * отключается после срабатывания — повторные появления только отвлекают.
 */
export function Reveal({ children, className = "", delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          window.setTimeout(() => node.classList.add("is-visible"), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  const Tag = as as "div";
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
