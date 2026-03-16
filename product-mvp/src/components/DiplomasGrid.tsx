"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const diplomas = [
  { src: "/images/diplomas/diploma-1.jpg", alt: "Диплом 1" },
  { src: "/images/diplomas/diploma-2.jpg", alt: "Диплом 2" },
  { src: "/images/diplomas/diploma-3.jpg", alt: "Диплом 3" },
  { src: "/images/diplomas/diploma-4.jpg", alt: "Диплом 4" },
];

export default function DiplomasGrid() {
  const [active, setActive] = useState<string | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  return (
    <>
      <div style={{ marginTop: 28 }}>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>
          Дипломы и сертификаты
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 72px)", gap: 10 }}>
          {diplomas.map((d) => (
            <button
              key={d.src}
              onClick={() => setActive(d.src)}
              style={{
                all: "unset",
                cursor: "zoom-in",
                width: 72, height: 100,
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                border: "1.5px solid rgba(0,0,0,.12)",
                flexShrink: 0,
              }}
              aria-label={`Открыть ${d.alt}`}
            >
              <Image src={d.src} alt={d.alt} fill style={{ objectFit: "cover" }} sizes="72px" />
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,.0)",
                transition: "background .15s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
                className="diploma-hover-overlay"
              />
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          onClick={close}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "zoom-out",
            padding: 24,
          }}
        >
          <div style={{ position: "relative", maxWidth: "min(90vw, 700px)", maxHeight: "90vh" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active}
              alt="Диплом"
              style={{ maxWidth: "100%", maxHeight: "90vh", objectFit: "contain", borderRadius: 6, boxShadow: "0 24px 80px rgba(0,0,0,.5)" }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={close}
              style={{
                all: "unset",
                position: "absolute", top: -16, right: -16,
                width: 36, height: 36, borderRadius: "50%",
                background: "white", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, lineHeight: 1, color: "#333",
                boxShadow: "0 2px 8px rgba(0,0,0,.3)",
              }}
              aria-label="Закрыть"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
