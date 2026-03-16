"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted");
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_accepted", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(22, 47, 36, 0.97)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <p style={{
        fontSize: 13,
        color: "rgba(255,255,255,0.65)",
        lineHeight: 1.6,
        margin: 0,
        maxWidth: 700,
      }}>
        Мы собираем данные о посещаемости сайта (cookie, IP-адрес, действия на сайте) для его корректной работы и улучшения.
        При отправке заявки вы передаёте имя и контакт для связи с вами.{" "}
        <Link
          href="/privacy"
          style={{ color: "rgba(255,255,255,0.85)", textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          Политика конфиденциальности
        </Link>
      </p>
      <button
        onClick={accept}
        style={{
          flexShrink: 0,
          background: "var(--amber)",
          color: "var(--white)",
          border: "none",
          padding: "10px 24px",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          cursor: "pointer",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        Принять
      </button>
    </div>
  );
}
