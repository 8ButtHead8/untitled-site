"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

const OPTIONS = [
  { label: "Для ребёнка (9–11 класс)", href: "/quiz/parents" },
  { label: "Для себя (карьера, выгорание, смена сферы)", href: "/quiz/adults" },
];

export default function QuizRouterPage() {
  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />
      <div style={{ paddingTop: 64 }}>
        <div className="quiz-content" style={{ maxWidth: 720, margin: "0 auto", padding: "72px 32px 96px" }}>
          <div style={{ textAlign: "center" }}>
            <p className="tag">Квиз · Бесплатно · 3–5 минут</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: "var(--green)", marginBottom: 20 }}>
              Для кого вы хотите разобраться с выбором?
            </h1>
            <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.72 }}>
              Это поможет задать правильные вопросы и дать вам точный результат
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520, margin: "0 auto" }}>
            {OPTIONS.map((opt) => (
              <Link
                key={opt.href}
                href={opt.href}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "22px 28px",
                  border: "2px solid var(--border)",
                  background: "var(--white)",
                  color: "var(--dark)",
                  fontSize: 17,
                  cursor: "pointer",
                  transition: "all 0.18s",
                  fontFamily: "'Nunito', sans-serif",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--green)";
                  e.currentTarget.style.background = "var(--green)";
                  e.currentTarget.style.color = "var(--white)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--white)";
                  e.currentTarget.style.color = "var(--dark)";
                }}
              >
                {opt.label}
              </Link>
            ))}
          </div>

          <p style={{ marginTop: 24, fontSize: 13, color: "var(--muted)", textAlign: "center" }}>Без регистрации · Бесплатно · 3–5 минут</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
