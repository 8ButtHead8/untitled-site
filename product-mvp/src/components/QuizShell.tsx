"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

/* ─── Types ─── */

export interface Question {
  id: string;
  question: string;
  options?: string[];
  isTextInput?: boolean;
  optional?: boolean;
}

export interface ResultData {
  title: string;
  mirror: string;      // Empathetic reflection of their situation
  howWeHelp: string;   // Specific approach for their case
  benefits: string[];
  urgentBenefit?: string;
}

export interface QuizConfig {
  questions: Record<string, Question>;
  firstQuestionId: string;
  getNextId: (currentId: string, answers: Record<string, string>) => string | null;
  getEstimatedTotal: (answers: Record<string, string>) => number;
  getResult: (answers: Record<string, string>) => ResultData;
  intro: {
    tag: string;
    title: string;
    description: string;
  };
  result: {
    benefitsHeader: string;
    contactDescription: string;
    source: "parents" | "adults";
    buttonText: string;
    privacyText: string;
    backHref: string;
    backLabel: string;
  };
}

/* ─── Component ─── */

export default function QuizShell({ config }: { config: QuizConfig }) {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQId, setCurrentQId] = useState(config.firstQuestionId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [answeredCount, setAnsweredCount] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  const currentQ = config.questions[currentQId];
  const estimatedTotal = config.getEstimatedTotal(answers);
  const progress = phase === "quiz" ? Math.min(Math.round(((answeredCount + 1) / estimatedTotal) * 100), 100) : 0;
  const isLastQuestion = config.getNextId(currentQId, { ...answers, [currentQId]: selected || textInput || "" }) === null;

  function handleAnswer() {
    const answer = currentQ.isTextInput ? textInput : selected;
    if (!currentQ.optional && !answer) return;

    const newAnswers = { ...answers };
    if (answer) newAnswers[currentQId] = answer;

    setAnswers(newAnswers);
    setAnsweredCount((c) => c + 1);
    setHistory((h) => [...h, currentQId]);

    const nextId = config.getNextId(currentQId, newAnswers);
    if (nextId) {
      setCurrentQId(nextId);
      setSelected(null);
      setTextInput("");
    } else {
      setPhase("result");
    }
  }

  function handleBack() {
    if (history.length === 0) return;
    const prevId = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentQId(prevId);
    setSelected(answers[prevId] || null);
    setTextInput("");
    setAnsweredCount((c) => Math.max(0, c - 1));
  }

  const result = phase === "result" ? config.getResult(answers) : null;

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />
      <div style={{ paddingTop: 64 }}>
        <div className="quiz-content" style={{ maxWidth: 720, margin: "0 auto", padding: "72px 32px 96px" }}>

          {/* ─── Intro ─── */}
          {phase === "intro" && (
            <div style={{ textAlign: "center" }}>
              <p className="tag">{config.intro.tag}</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: "var(--green)", marginBottom: 20 }}>
                {config.intro.title}
              </h1>
              <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.72 }}>
                {config.intro.description}
              </p>
              <button onClick={() => setPhase("quiz")} className="btn-amber">Начать квиз →</button>
              <p style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>Без регистрации · Бесплатно · 3–5 минут</p>
            </div>
          )}

          {/* ─── Questions ─── */}
          {phase === "quiz" && currentQ && (
            <div>
              {history.length > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--muted)",
                    fontSize: 14,
                    cursor: "pointer",
                    padding: "0 0 16px",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  ← Назад
                </button>
              )}

              <div style={{ marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>Вопрос {answeredCount + 1} из ~{estimatedTotal}</span>
                  <span style={{ fontSize: 13, color: "var(--amber)", fontWeight: 700 }}>{progress}%</span>
                </div>
                <div style={{ height: 3, background: "var(--border)", borderRadius: 99 }}>
                  <div style={{ height: "100%", background: "var(--amber)", borderRadius: 99, width: `${progress}%`, transition: "width 0.3s ease" }} />
                </div>
              </div>

              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 400, lineHeight: 1.2, color: "var(--green)", marginBottom: 32 }}>
                {currentQ.question}
              </h2>

              {currentQ.options && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelected(opt)}
                      style={{
                        textAlign: "left",
                        padding: "18px 24px",
                        border: selected === opt ? "2px solid var(--green)" : "2px solid var(--border)",
                        background: selected === opt ? "var(--green)" : "var(--white)",
                        color: selected === opt ? "var(--white)" : "var(--dark)",
                        fontSize: 16,
                        cursor: "pointer",
                        transition: "all 0.18s",
                        fontFamily: "'Nunito', sans-serif",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {currentQ.isTextInput && (
                <div style={{ marginBottom: 32 }}>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Необязательно — но Светлане будет полезно"
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: 16,
                      border: "2px solid var(--border)",
                      background: "var(--white)",
                      color: "var(--dark)",
                      resize: "vertical",
                      outline: "none",
                      lineHeight: 1.6,
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--green)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                  />
                </div>
              )}

              <button
                onClick={handleAnswer}
                disabled={!currentQ.optional && !selected && !textInput}
                style={{
                  width: "100%",
                  padding: 18,
                  background: (currentQ.optional || selected || textInput) ? "var(--amber)" : "var(--border)",
                  color: (currentQ.optional || selected || textInput) ? "var(--white)" : "var(--muted)",
                  border: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase" as const,
                  cursor: (currentQ.optional || selected || textInput) ? "pointer" : "default",
                  fontFamily: "'Nunito', sans-serif",
                  transition: "background 0.2s",
                }}
              >
                {isLastQuestion ? "Получить результат →" : currentQ.optional ? "Пропустить / Далее →" : "Следующий вопрос →"}
              </button>
            </div>
          )}

          {/* ─── Result ─── */}
          {phase === "result" && result && (
            <div>
              <p className="tag">Результат квиза</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.18, color: "var(--green)", marginBottom: 24 }}>
                {result.title}
              </h2>

              {/* Mirror block — we show we understood them */}
              <div style={{
                borderLeft: "3px solid var(--amber)",
                paddingLeft: 24,
                marginBottom: 28,
              }}>
                <p style={{ fontSize: 17, color: "var(--dark)", lineHeight: 1.78, fontStyle: "italic", margin: 0 }}>
                  {result.mirror}
                </p>
              </div>

              {/* How we help in their specific situation */}
              <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.72, marginBottom: 40 }}>
                {result.howWeHelp}
              </p>

              <div style={{ background: "var(--white)", border: "2px solid var(--border)", padding: "32px 36px", marginBottom: 48 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--green)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {config.result.benefitsHeader}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {result.benefits.map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12, fontSize: 16, color: "var(--dark)", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--amber)", flexShrink: 0, marginTop: 2 }}>{i + 1}.</span>
                      {b}
                    </li>
                  ))}
                  {result.urgentBenefit && (
                    <li style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 0, fontSize: 16, color: "var(--dark)", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--amber)", flexShrink: 0, marginTop: 2 }}>{result.benefits.length + 1}.</span>
                      {result.urgentBenefit}
                    </li>
                  )}
                </ul>
              </div>

              <div className="quiz-result-form" style={{ background: "var(--green)", padding: "52px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 400, color: "var(--white)", marginBottom: 8 }}>
                  Запишитесь на бесплатную встречу
                </h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 36 }}>
                  {config.result.contactDescription}
                </p>
                <ContactForm
                  source={config.result.source}
                  quizAnswers={answers}
                  dark
                  buttonText={config.result.buttonText}
                  privacyText={config.result.privacyText}
                />
              </div>

              <div style={{ marginTop: 32, textAlign: "center" }}>
                <Link href={config.result.backHref} style={{ fontSize: 14, color: "var(--muted)", textDecoration: "none" }}>
                  {config.result.backLabel}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
