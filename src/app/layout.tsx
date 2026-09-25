import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { COMPANY } from "@/lib/company";
import "./globals.css";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${COMPANY.name} — ремонт квартир и санузлов под ключ в ${COMPANY.city}е`,
  description:
    "Ремонт квартир, ванных и санузлов под ключ в Подольске: плитка, сантехника, электрика, потолки и чистовая отделка. Работаем ежедневно с 09:00 до 21:00.",
  openGraph: {
    title: `${COMPANY.name} — ремонт под ключ в ${COMPANY.city}е`,
    description:
      "Ремонт квартир, ванных и санузлов под ключ: плитка, сантехника, электрика, потолки, чистовая отделка.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
};

/** Разметка для карт и поиска: адрес, часы и рейтинг ровно из карточки. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: COMPANY.name,
  telephone: COMPANY.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address,
    addressLocality: COMPANY.city,
    postalCode: COMPANY.postcode,
    addressCountry: "RU",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: COMPANY.opensAt,
    closes: COMPANY.closesAt,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: COMPANY.rating,
    reviewCount: COMPANY.reviewCount,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
