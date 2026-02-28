"use client";

import { useState } from "react";
import { CONSULTATION_PRICE_TEXT } from "@/data/constants";

interface ContactFormProps {
  source: "parents" | "adults" | "blog";
  quizAnswers?: Record<string, string>;
  dark?: boolean;
  buttonText?: string;
  privacyText?: string;
}

export default function ContactForm({ source, quizAnswers, dark, buttonText, privacyText }: ContactFormProps) {
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
      <div className={`p-7 text-center font-[family-name:var(--font-cormorant),'Cormorant_Garamond',serif] text-2xl leading-[1.45] ${
        dark
          ? "bg-white/[0.08] border border-white/20 text-white"
          : "bg-green-light border-2 border-green text-green"
      }`}>
        Спасибо! Светлана свяжется с вами в ближайшее время.
      </div>
    );
  }

  const inputClasses = `w-full py-3.5 px-[18px] font-body text-base outline-none mb-3.5 ${
    dark
      ? "border-[1.5px] border-white/25 bg-white/[0.07] text-white"
      : "border-[1.5px] border-border bg-cream text-dark"
  }`;

  return (
    <form onSubmit={handleSubmit}>
      <label className={`form-label ${dark ? "!text-white/60" : ""}`}>
        Ваше имя
      </label>
      <input
        type="text"
        placeholder="Елена"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={inputClasses}
      />
      <label className={`form-label ${dark ? "!text-white/60" : ""}`}>
        Телефон или мессенджер
      </label>
      <input
        type="text"
        placeholder="+7 900 000-00-00 или @username"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
        className={inputClasses}
      />
      {error && <p className="text-[13px] text-[#e05c5c] mb-2.5">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="form-btn"
      >
        {loading ? "Отправляем..." : (buttonText || "Отправить заявку")}
      </button>
      <p className={`text-xs text-center mt-3.5 ${dark ? "text-white/30" : "text-muted"}`}>
        {privacyText || `Не звоним без предупреждения · ${CONSULTATION_PRICE_TEXT}`}
      </p>
    </form>
  );
}
