"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

const QUESTIONS = [
  { id: "grade", question: "В каком классе ваш ребёнок?", options: ["9 класс", "10 класс", "11 класс"] },
  { id: "interests", question: "Есть ли у ребёнка хоть какие-то интересы или увлечения?", options: ["Да, есть конкретные интересы", "Есть, но они размытые или неустойчивые", "Ничего особенного не интересует"] },
  { id: "main_concern", question: "Что вас беспокоит больше всего?", options: ["Не знает куда поступать после школы", "Вообще не хочет учиться дальше", "Хочет поступать, но в «неправильное» место", "Просто хочу помочь ему/ей определиться заранее"] },
  { id: "tried", question: "Что уже пробовали?", options: ["Онлайн-тесты — не помогло", "Разговоры с учителями или психологом", "Ничего ещё не пробовали", "Пробовали разное, но без результата"] },
  { id: "child_reaction", question: "Как ребёнок реагирует на разговоры о будущем?", options: ["Уходит от темы или злится", "Говорит «не знаю» и на этом всё", "Обсуждает, но без конкретных выводов", "Сам переживает, хочет разобраться"] },
  { id: "urgency", question: "Когда планируете определиться с выбором?", options: ["Срочно — выбор ЕГЭ или поступление уже скоро", "Есть 1–2 года в запасе", "Пока непонятно"] },
  { id: "priority", question: "Что для вас важнее всего в консультации?", options: ["Конкретные профессии и направления", "Понимание сильных сторон ребёнка", "Чтобы ребёнок сам захотел и загорелся", "Чёткий план по ЕГЭ"] },
  { id: "budget", question: "Как вы относитесь к цене 2 950 ₽ за консультацию?", options: ["Готовы — главное результат", "Хочу сначала убедиться что это подойдёт нам", "Дорого, но если поможет — соглашусь"] },
];

function getResult(answers: Record<string, string>): { title: string; text: string; tip: string } {
  const urgency = answers.urgency || "";
  const reaction = answers.child_reaction || "";
  const interests = answers.interests || "";

  if (urgency.includes("Срочно") || answers.grade === "11 класс") {
    return {
      title: "Времени мало — но этого достаточно",
      text: "Даже если до ЕГЭ или поступления остались месяцы, одна качественная консультация даёт чёткий вектор. Светлана работала со многими семьями в такой же срочной ситуации — и результат всегда был конкретным.",
      tip: "Запишитесь как можно скорее — чем раньше разберётесь, тем спокойнее пройдёт этот год.",
    };
  }
  if (reaction.includes("Уходит") || reaction.includes("злится")) {
    return {
      title: "Даже с закрытым подростком — это работает",
      text: "Светлана специализируется на работе с подростками, которые не хотят говорить. Первые минуты уходят на то, чтобы ребёнок расслабился. К середине встречи они сами не хотят заканчивать.",
      tip: "Не нужно ничего объяснять ребёнку заранее — просто запишитесь на встречу.",
    };
  }
  if (interests.includes("Ничего")) {
    return {
      title: "«Ничего не интересует» — это тоже материал для работы",
      text: "Отсутствие явных интересов — это не тупик. Светлана умеет находить склонности там, где сам ребёнок их не замечает. Именно это и отличает живой разговор от онлайн-теста.",
      tip: "Расскажите Светлане о ситуации — она честно скажет, поможет ли консультация.",
    };
  }
  return {
    title: "Хорошая новость: у вас уже есть с чем работать",
    text: "Судя по вашим ответам, у ребёнка есть хоть какой-то материал — интересы, реакции, сомнения. Именно с этого Светлана и начинает. Одна встреча — конкретный список профессий и понимание по ЕГЭ.",
    tip: "Пройдите квиз и оставьте заявку — Светлана свяжется и ответит на вопросы.",
  };
}

export default function QuizParentsPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);

  const isIntro = step === 0;
  const isResult = step === QUESTIONS.length + 1;
  const currentQ = step >= 1 && step <= QUESTIONS.length ? QUESTIONS[step - 1] : null;
  const progress = step === 0 ? 0 : Math.round((step / QUESTIONS.length) * 100);

  function next() {
    if (!selected || !currentQ) return;
    setAnswers((p) => ({ ...p, [currentQ.id]: selected }));
    setSelected(null);
    setStep((s) => s + 1);
  }

  const result = isResult ? getResult(answers) : null;

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />
      <div style={{ paddingTop: 64 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "72px 32px 96px" }}>

          {isIntro && (
            <div style={{ textAlign: "center" }}>
              <p className="tag">Квиз для родителей · Бесплатно</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: "var(--green)", marginBottom: 20 }}>
                8 вопросов о вашем ребёнке
              </h1>
              <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.72 }}>
                Светлана получит первичное представление о ситуации и свяжется с вами. Квиз занимает 3–5 минут.
              </p>
              <button onClick={() => setStep(1)} className="btn-amber">Начать квиз →</button>
              <p style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>Без регистрации · Бесплатно · 3–5 минут</p>
            </div>
          )}

          {currentQ && (
            <div>
              {/* Progress */}
              <div style={{ marginBottom: 48 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>Вопрос {step} из {QUESTIONS.length}</span>
                  <span style={{ fontSize: 13, color: "var(--amber)", fontWeight: 700 }}>{progress}%</span>
                </div>
                <div style={{ height: 3, background: "var(--border)", borderRadius: 99 }}>
                  <div style={{ height: "100%", background: "var(--amber)", borderRadius: 99, width: `${progress}%`, transition: "width 0.3s ease" }} />
                </div>
              </div>

              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 400, lineHeight: 1.2, color: "var(--green)", marginBottom: 32 }}>
                {currentQ.question}
              </h2>

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

              <button
                onClick={next}
                disabled={!selected}
                style={{
                  width: "100%",
                  padding: 18,
                  background: selected ? "var(--amber)" : "var(--border)",
                  color: selected ? "var(--white)" : "var(--muted)",
                  border: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase" as const,
                  cursor: selected ? "pointer" : "default",
                  fontFamily: "'Nunito', sans-serif",
                  transition: "background 0.2s",
                }}
              >
                {step === QUESTIONS.length ? "Получить результат →" : "Следующий вопрос →"}
              </button>
            </div>
          )}

          {isResult && result && (
            <div>
              <p className="tag">Результат квиза</p>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.18, color: "var(--green)", marginBottom: 20 }}>
                {result.title}
              </h2>
              <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.72, marginBottom: 24 }}>{result.text}</p>
              <div style={{ background: "var(--amber-pale)", borderLeft: "4px solid var(--amber)", padding: "20px 24px", marginBottom: 48 }}>
                <p style={{ fontSize: 16, color: "var(--dark)", fontStyle: "italic", lineHeight: 1.65 }}>{result.tip}</p>
              </div>

              <div style={{ background: "var(--green)", padding: "52px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 400, color: "var(--white)", marginBottom: 8 }}>
                  Оставьте контакт
                </h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 36 }}>
                  Светлана свяжется с вами, ответит на вопросы и предложит удобное время.
                </p>
                <ContactForm source="parents" quizAnswers={answers} dark />
              </div>

              <div style={{ marginTop: 32, textAlign: "center" }}>
                <Link href="/parents" style={{ fontSize: 14, color: "var(--muted)", textDecoration: "none" }}>
                  ← Вернуться на страницу для родителей
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
