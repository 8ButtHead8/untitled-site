import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const cormorant = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://moy-proforientolog.ru";

export const metadata: Metadata = {
  title: {
    default: "Светлана Жукова — профориентолог",
    template: "%s — Светлана Жукова",
  },
  description: "Личный сайт профориентолога Светланы Жуковой. Профориентация для школьников и взрослых. Кандидат наук, онлайн по всей России.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Мой профориентолог — Светлана Жукова",
    title: "Светлана Жукова — профориентолог",
    description: "Профориентация для школьников и взрослых. Кандидат наук, онлайн по всей России.",
    images: [
      {
        url: "/images/photo-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Светлана Жукова — профориентолог",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Светлана Жукова — профориентолог",
    description: "Профориентация для школьников и взрослых. Кандидат наук, онлайн по всей России.",
    images: ["/images/photo-hero.jpg"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Светлана Жукова",
  jobTitle: "Профориентолог",
  description:
    "Кандидат социологических наук, профориентолог. Помогает школьникам и взрослым найти призвание и выбрать профессию. Онлайн по всей России.",
  url: siteUrl,
  image: `${siteUrl}/images/photo-hero.jpg`,
  knowsAbout: [
    "Профориентация",
    "Карьерное консультирование",
    "Выбор профессии",
    "Профориентация подростков",
    "Смена профессии",
    "Выгорание на работе",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "Кандидат социологических наук",
    },
  ],
  alumniOf: {
    "@type": "Organization",
    name: "Академия WhoAmI",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Мой профориентолог — Светлана Жукова",
  description:
    "Профориентация для школьников 9–11 класса и взрослых. Онлайн-консультация с кандидатом наук.",
  url: siteUrl,
  image: `${siteUrl}/images/photo-hero.jpg`,
  provider: {
    "@type": "Person",
    name: "Светлана Жукова",
  },
  areaServed: {
    "@type": "Country",
    name: "Россия",
  },
  serviceType: "Профориентация",
  offers: {
    "@type": "Offer",
    price: "2950",
    priceCurrency: "RUB",
    description: "Онлайн-консультация 60–90 минут",
  },
  telephone: undefined,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Саратов",
    addressCountry: "RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${nunito.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
