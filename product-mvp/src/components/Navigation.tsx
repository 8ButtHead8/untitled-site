"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const quizHref = pathname.startsWith("/adults") ? "/quiz/adults" : "/quiz/parents";

  const links = [
    { href: "/parents", label: "Родителям" },
    { href: "/adults", label: "Взрослым" },
    { href: "/blog", label: "Блог" },
  ];

  return (
    <>
      <nav className="nav-bar fixed top-0 left-0 right-0 z-[200] px-[52px] py-4 bg-cream/92 backdrop-blur-[14px] border-b border-border">
        <div className="max-w-[1080px] mx-auto flex items-center justify-between">
          <Link href="/parents" className="flex flex-col gap-px no-underline">
            <span className="font-[family-name:var(--font-cormorant),'Cormorant_Garamond',serif] text-[19px] font-medium text-green tracking-[0.01em]">
              Светлана Жукова
            </span>
            <span className="text-[11px] text-muted tracking-[0.06em]">
              Профориентолог · Онлайн
            </span>
          </Link>

          {/* Desktop */}
          <div className="nav-desktop flex items-center gap-8">
            <div className="flex gap-7">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-sm no-underline ${
                    pathname.startsWith(l.href)
                      ? "font-semibold text-amber"
                      : "font-normal text-muted"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link
              href={quizHref}
              className="bg-green text-white text-[13px] font-bold tracking-[0.06em] uppercase py-[11px] px-[26px] no-underline"
            >
              Пройти квиз
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="nav-mobile-toggle items-center justify-center w-10 h-10 bg-transparent border-none cursor-pointer text-2xl text-green"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            {open ? "\u2715" : "\u2630"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed top-14 left-0 right-0 z-[199] bg-cream/[0.98] backdrop-blur-[14px] border-b border-border px-5 pt-4 pb-5 flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-base no-underline py-3.5 border-b border-border ${
                pathname.startsWith(l.href)
                  ? "font-semibold text-amber"
                  : "font-normal text-dark"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={quizHref}
            onClick={() => setOpen(false)}
            className="btn-amber text-center mt-4"
          >
            Пройти квиз →
          </Link>
        </div>
      )}
    </>
  );
}
