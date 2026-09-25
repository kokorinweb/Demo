type IconProps = {
  name: IconName;
  className?: string;
};

export type IconName =
  | "home"
  | "droplet"
  | "building"
  | "ceiling"
  | "tile"
  | "bolt"
  | "phone"
  | "message"
  | "pin"
  | "clock"
  | "star"
  | "check"
  | "arrow"
  | "chevron"
  | "whatsapp";

/**
 * Свой набор штриховых иконок на сетке 24×24: чек-лист скилла запрещает
 * эмодзи вместо иконок, а тащить пакет ради двенадцати штук незачем.
 */
const PATHS: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 3.5c3 3.7 5.5 6.6 5.5 9.6a5.5 5.5 0 0 1-11 0c0-3 2.5-5.9 5.5-9.6Z" />
      <path d="M9.5 13.8a2.6 2.6 0 0 0 2.5 2.7" />
    </>
  ),
  building: (
    <>
      <path d="M4 20V7l8-3 8 3v13" />
      <path d="M3 20h18" />
      <path d="M9 11h2M13 11h2M9 15h2M13 15h2" />
    </>
  ),
  ceiling: (
    <>
      <path d="M3 5h18" />
      <path d="M12 5v4" />
      <path d="M7.5 15a4.5 4.5 0 0 1 9 0Z" />
      <path d="M6 18h12" />
    </>
  ),
  tile: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1" />
      <rect x="13" y="4" width="7" height="7" rx="1" />
      <rect x="4" y="13" width="7" height="7" rx="1" />
      <rect x="13" y="13" width="7" height="7" rx="1" />
    </>
  ),
  bolt: (
    <>
      <path d="M13 3 5.5 13.5H11L10 21l7.5-10.5H12L13 3Z" />
    </>
  ),
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 5.5h3" />
      <path d="M12 18.2h.01" />
    </>
  ),
  message: (
    <>
      <path d="M20.5 12c0 4.1-3.8 7.4-8.5 7.4-1 0-2-.15-2.9-.43L4 20.5l1.6-3.7A7 7 0 0 1 3.5 12c0-4.1 3.8-7.4 8.5-7.4s8.5 3.3 8.5 7.4Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.5s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10.3" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.2 2.2" />
    </>
  ),
  star: (
    <>
      <path d="m12 3.6 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L12 3.6Z" />
    </>
  ),
  check: (
    <>
      <path d="m20 6.5-10.5 11L4 12" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  chevron: (
    <>
      <path d="m6 9.5 6 6 6-6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.5 11.7c0 4.2-3.5 7.6-7.8 7.6-1.3 0-2.6-.3-3.7-.9L4 19.8l1.5-4.7a7.4 7.4 0 0 1-1.1-3.9c0-4.2 3.5-7.6 7.8-7.6s8.3 3.4 8.3 7.6Z" />
      <path d="M9.4 8.6c.4-.1.7 0 .9.4l.6 1.2c.1.3.1.5-.1.7l-.4.5c-.2.2-.2.4-.1.6.4.8 1.1 1.5 2 1.9.2.1.4.1.6-.1l.5-.5c.2-.2.4-.2.7-.1l1.2.6c.3.2.5.5.4.8-.2.9-1.1 1.4-2 1.2-2.4-.5-4.3-2.4-4.8-4.8-.2-.9.3-1.7 1.1-2Z" />
    </>
  ),
};

export function Icon({ name, className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
