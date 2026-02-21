"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const quizHref = pathname.startsWith("/adults") ? "/quiz/adults" : "/quiz/parents";

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 52px",
        background: "rgba(253,248,241,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <Link href="/parents" style={{ display: "flex", flexDirection: "column", gap: 1, textDecoration: "none" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 500, color: "var(--green)", letterSpacing: "0.01em" }}>
            Светлана Жукова
          </span>
          <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>
            Профориентолог · Онлайн
          </span>
        </Link>

        {/* Desktop */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", gap: 28 }}>
            {[
              { href: "/parents", label: "Родителям" },
              { href: "/adults", label: "Взрослым" },
              { href: "/blog", label: "Блог" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 14,
                  fontWeight: pathname.startsWith(l.href) ? 600 : 400,
                  color: pathname.startsWith(l.href) ? "var(--amber)" : "var(--muted)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href={quizHref}
            style={{
              background: "var(--green)", color: "var(--white)",
              fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const,
              padding: "11px 26px", textDecoration: "none",
            }}
          >
            Пройти квиз
          </Link>
        </div>
      </nav>

      {/* Mobile nav handled via CSS (hidden on small screens for simplicity) */}
    </>
  );
}
