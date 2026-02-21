import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Светлана Жукова — профориентолог",
  description: "Личный сайт профориентолога Светланы Жуковой. Профориентация для школьников и взрослых. Кандидат наук, 5000+ отзывов на Профи.ру.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
