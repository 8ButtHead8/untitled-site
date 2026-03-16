"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InitDbButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleInit() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/init", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setMessage("База данных инициализирована!");
        setTimeout(() => router.refresh(), 800);
      } else {
        setMessage(data.error || "Ошибка инициализации");
      }
    } catch {
      setMessage("Ошибка соединения");
    }
    setLoading(false);
  }

  return (
    <div>
      <button
        onClick={handleInit}
        disabled={loading}
        style={{
          background: "#2d5a4e",
          color: "white",
          border: "none",
          padding: "12px 28px",
          fontSize: 14,
          fontWeight: 700,
          cursor: loading ? "default" : "pointer",
          opacity: loading ? 0.7 : 1,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        {loading ? "Инициализируем..." : "Инициализировать базу данных"}
      </button>
      {message && (
        <p style={{ fontSize: 13, color: "#2d5a4e", marginTop: 12 }}>{message}</p>
      )}
    </div>
  );
}
