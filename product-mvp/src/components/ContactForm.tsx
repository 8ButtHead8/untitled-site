"use client";

import { useState } from "react";

interface ContactFormProps {
  source: "parents" | "adults" | "blog";
  quizAnswers?: Record<string, string>;
  dark?: boolean;
}

export default function ContactForm({ source, quizAnswers, dark }: ContactFormProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, source, quizAnswers }),
      });
      if (res.ok) setSuccess(true);
      else setError("Что-то пошло не так. Попробуйте ещё раз.");
    } catch {
      setError("Ошибка соединения.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div style={{
        background: dark ? "rgba(255,255,255,0.08)" : "var(--green-light)",
        border: dark ? "1px solid rgba(255,255,255,0.2)" : "2px solid var(--green)",
        color: dark ? "var(--white)" : "var(--green)",
        padding: "28px",
        textAlign: "center",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 24,
        lineHeight: 1.45,
      }}>
        Спасибо! Светлана свяжется с вами в ближайшее время. 🌿
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    fontFamily: "'Nunito', sans-serif",
    fontSize: 16,
    border: dark ? "1.5px solid rgba(255,255,255,0.25)" : "1.5px solid var(--border)",
    background: dark ? "rgba(255,255,255,0.07)" : "var(--cream)",
    color: dark ? "var(--white)" : "var(--dark)",
    outline: "none",
    marginBottom: 14,
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label" style={{ color: dark ? "rgba(255,255,255,0.6)" : undefined }}>
        Ваше имя
      </label>
      <input
        type="text"
        placeholder="Елена"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={inputStyle}
      />
      <label className="form-label" style={{ color: dark ? "rgba(255,255,255,0.6)" : undefined }}>
        Телефон или мессенджер
      </label>
      <input
        type="text"
        placeholder="+7 900 000-00-00 или @username"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
        style={inputStyle}
      />
      {error && <p style={{ fontSize: 13, color: "#e05c5c", marginBottom: 10 }}>{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="form-btn"
      >
        {loading ? "Отправляем..." : "Отправить заявку"}
      </button>
      <p style={{ fontSize: 12, color: dark ? "rgba(255,255,255,0.3)" : "var(--muted)", textAlign: "center", marginTop: 14 }}>
        Не звоним без предупреждения · 2 950 руб./консультация
      </p>
    </form>
  );
}
