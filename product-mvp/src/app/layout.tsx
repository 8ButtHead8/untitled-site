import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://product-mvp.vercel.app";

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
    siteName: "Светлана Жукова — профориентолог",
    title: "Светлана Жукова — профориентолог",
    description: "Профориентация для школьников и взрослых. Кандидат наук, онлайн по всей России.",
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
        {children}
      </body>
    </html>
  );
}
