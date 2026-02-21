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
      <nav className="nav-bar" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: "16px 52px",
        background: "rgba(253,248,241,0.92)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ display: "flex", gap: 28 }}>
              {links.map((l) => (
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

          {/* Mobile toggle */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setOpen(!open)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 24,
              color: "var(--green)",
            }}
            aria-label="Меню"
          >
            {open ? "\u2715" : "\u2630"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed",
          top: 56,
          left: 0,
          right: 0,
          zIndex: 199,
          background: "rgba(253,248,241,0.98)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--border)",
          padding: "16px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: 16,
                fontWeight: pathname.startsWith(l.href) ? 600 : 400,
                color: pathname.startsWith(l.href) ? "var(--amber)" : "var(--dark)",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={quizHref}
            onClick={() => setOpen(false)}
            className="btn-amber"
            style={{ textAlign: "center", marginTop: 16 }}
          >
            Пройти квиз →
          </Link>
        </div>
      )}
    </>
  );
}
