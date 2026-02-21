"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

/* ─── Questions ─── */

interface Question {
  id: string;
  question: string;
  options?: string[];
  isTextInput?: boolean;
  optional?: boolean;
}

const Q: Record<string, Question> = {
  grade: {
    id: "grade",
    question: "В каком классе ваш ребёнок сейчас?",
    options: ["9 класс", "10 класс", "11 класс", "Другое / не уверен(а)"],
  },
  trigger: {
    id: "trigger",
    question: "Что прямо сейчас больше всего тревожит?",
    options: [
      "Скоро выбирать ЕГЭ / поступление, а ясности нет",
      "Ребёнок говорит «не знаю» и закрывается",
      "Есть интересы, но не понимаю куда это «приземлить»",
      "Он/она хочет «не туда», боюсь ошибиться",
      "Хочу помочь заранее, пока без паники",
    ],
  },
  child_reaction: {
    id: "child_reaction",
    question: "Как ребёнок реагирует, когда вы поднимаете тему будущего?",
    options: [
      "Злится / уходит от разговора",
      "Отвечает «не знаю» и всё",
      "Говорит, но без конкретики",
      "Сам переживает и хочет понять",
      "Спокойно обсуждает, но буксует на выборе",
    ],
  },
  conflict_level: {
    id: "conflict_level",
    question: "Насколько часто из-за этого возникают конфликты дома?",
    options: [
      "Почти каждый раз",
      "Иногда",
      "Редко, но напряжение есть",
      "Конфликтов нет, просто избегает",
    ],
  },
  interests: {
    id: "interests",
    question: "Есть ли у ребёнка интересы, от которых «загораются глаза»?",
    options: [
      "Да, есть 1–2 конкретных интереса",
      "Есть, но они размытые / быстро меняются",
      "Похоже, ничего по-настоящему не цепляет",
      "Не знаю, сложно понять",
    ],
  },
  where_energy: {
    id: "where_energy",
    question: "Где вы всё же видите хоть какую-то энергию?",
    options: [
      "Общение / люди (друзья, командные истории)",
      "Компьютер / игры / техника",
      "Творчество / красота (рисует, делает, придумывает)",
      "Спорт / движение / практика руками",
      "Пока не вижу нигде",
    ],
  },
  already_tried: {
    id: "already_tried",
    question: "Что вы уже пробовали, чтобы помочь определиться?",
    options: [
      "Онлайн-тесты / профориентационные сайты",
      "Разговоры с учителями / психологом / куратором",
      "Разные кружки / олимпиады / мероприятия",
      "Пока ничего системного",
      "Пробовали многое, но без результата",
    ],
  },
  time_pressure: {
    id: "time_pressure",
    question: "Насколько срочно вам нужно принять решение?",
    options: [
      "Очень срочно (месяцы)",
      "В этом учебном году",
      "Есть 1–2 года",
      "Пока не понимаю сроки",
    ],
  },
  success_criteria: {
    id: "success_criteria",
    question: "Какой результат консультации для вас будет «вау, не зря»?",
    options: [
      "Понятный список направлений и профессий, которые реально подходят",
      "Чтобы ребёнок сам захотел и успокоился",
      "Чёткий план действий и понимание по ЕГЭ / вузу",
      "Чтобы мы перестали ссориться и смогли нормально говорить",
      "Хочу увидеть сильные стороны ребёнка, которые мы не замечаем",
    ],
  },
  note: {
    id: "note",
    question: "Если хотите, опишите в 1–2 предложениях ситуацию своими словами",
    isTextInput: true,
    optional: true,
  },
};

/* ─── Branching ─── */

function getNextId(currentId: string, answers: Record<string, string>): string | null {
  switch (currentId) {
    case "grade":
      return "trigger";
    case "trigger":
      return "child_reaction";
    case "child_reaction":
      return (answers.child_reaction || "").includes("Злится") ? "conflict_level" : "interests";
    case "conflict_level":
      return "interests";
    case "interests": {
      const v = answers.interests || "";
      return v.includes("Похоже") || v.includes("Не знаю") ? "where_energy" : "already_tried";
    }
    case "where_energy":
      return "already_tried";
    case "already_tried":
      return "time_pressure";
    case "time_pressure":
      return "success_criteria";
    case "success_criteria":
      return "note";
    case "note":
      return null;
    default:
      return null;
  }
}

function getEstimatedTotal(answers: Record<string, string>): number {
  let total = 8; // base questions including note
  if ((answers.child_reaction || "").includes("Злится")) total += 1;
  const v = answers.interests || "";
  if (v.includes("Похоже") || v.includes("Не знаю")) total += 1;
  return total;
}

/* ─── Result segments ─── */

interface ResultData {
  title: string;
  text: string;
  benefits: string[];
  urgentBenefit?: string;
}

function getResult(answers: Record<string, string>): ResultData {
  const grade = answers.grade || "";
  const trigger = answers.trigger || "";
  const childReaction = answers.child_reaction || "";
  const interests = answers.interests || "";
  const timePressure = answers.time_pressure || "";

  // Segment: Urgent
  if (grade === "11 класс" || timePressure.includes("Очень срочно")) {
    return {
      title: "Похоже, у вас сейчас горячий период: ЕГЭ и поступление на носу",
      text: "Даже если до решения остались месяцы — одна качественная консультация даёт чёткий вектор. Светлана работала со многими семьями в такой же срочной ситуации.",
      benefits: [
        "Ясный вектор: какие направления подходят именно вашему ребёнку",
        "Список 5–10 реалистичных профессий и направлений — и почему именно они",
        "Следующий шаг: что делать дальше и как говорить с ребёнком без давления",
      ],
      urgentBenefit: "Как принять решение по ЕГЭ / поступлению без паники",
    };
  }

  // Segment: Resistance
  if (childReaction.includes("Злится")) {
    return {
      title: "Похоже, у вас сейчас напряжение: ребёнок закрывается, а время идёт",
      text: "Светлана специализируется на работе с подростками, которые «не хотят говорить». Первые минуты уходят на то, чтобы ребёнок расслабился. К середине встречи они сами не хотят заканчивать.",
      benefits: [
        "Ясный вектор: какие направления подходят именно вашему ребёнку",
        "Список 5–10 реалистичных профессий и направлений — и почему именно они",
        "Как начать диалог с ребёнком без давления и конфликтов",
      ],
    };
  }

  // Segment: No interests
  if (interests.includes("Похоже") || interests.includes("Не знаю")) {
    return {
      title: "Похоже, у вас сейчас ситуация «ничего не интересует» — и это тоже материал",
      text: "Отсутствие явных интересов — это не тупик. Светлана умеет находить склонности там, где сам ребёнок их не замечает. Именно это и отличает живой разговор от онлайн-теста.",
      benefits: [
        "Ясный вектор: какие направления подходят именно вашему ребёнку",
        "Сильные стороны ребёнка, которые вы могли не замечать",
        "Следующий шаг: что делать дальше и как поддержать без давления",
      ],
    };
  }

  // Segment: Wrong direction
  if (trigger.includes("не туда")) {
    return {
      title: "Похоже, у вас сейчас сомнение: правильно ли выбирает ребёнок",
      text: "Бывает, что интересы ребёнка пугают — «это несерьёзно» или «на этом не заработать». Консультация помогает увидеть реальную картину: что стоит за этим интересом и куда он реально может привести.",
      benefits: [
        "Ясный вектор: какие направления подходят именно вашему ребёнку",
        "Разбор интересов ребёнка: что за ними стоит и куда они ведут",
        "Как поддержать выбор, даже если он вас удивляет",
      ],
    };
  }

  // Segment: Proactive
  if (trigger.includes("заранее")) {
    return {
      title: "Хорошая новость: вы начинаете заранее — это лучшая стратегия",
      text: "Когда нет давления сроков, консультация работает максимально глубоко. Ребёнок расслаблен, вы спокойны, и вместе можно найти по-настоящему подходящее направление.",
      benefits: [
        "Ясный вектор: какие направления подходят именно вашему ребёнку",
        "Список 5–10 реалистичных профессий и направлений — и почему именно они",
        "Карта сильных сторон ребёнка и понимание, что делать дальше",
      ],
    };
  }

  // Default
  return {
    title: "Хорошая новость: у вас уже есть с чем работать",
    text: "Судя по вашим ответам, у ребёнка есть материал — интересы, реакции, сомнения. Именно с этого Светлана и начинает. Одна встреча — и картина становится ясной.",
    benefits: [
      "Ясный вектор: какие направления подходят именно вашему ребёнку",
      "Список 5–10 реалистичных профессий и направлений — и почему именно они",
      "Следующий шаг: что делать дальше и как говорить с ребёнком без давления",
    ],
  };
}

/* ─── Component ─── */

export default function QuizParentsPage() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQId, setCurrentQId] = useState("grade");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [answeredCount, setAnsweredCount] = useState(0);

  const currentQ = Q[currentQId];
  const estimatedTotal = getEstimatedTotal(answers);
  const progress = phase === "quiz" ? Math.min(Math.round(((answeredCount + 1) / estimatedTotal) * 100), 100) : 0;
  const isLastQuestion = getNextId(currentQId, { ...answers, [currentQId]: selected || textInput || "" }) === null;

  function handleAnswer() {
    const answer = currentQ.isTextInput ? textInput : selected;
    if (!currentQ.optional && !answer) return;

    const newAnswers = { ...answers };
    if (answer) newAnswers[currentQId] = answer;

    setAnswers(newAnswers);
    setAnsweredCount((c) => c + 1);

    const nextId = getNextId(currentQId, newAnswers);
    if (nextId) {
      setCurrentQId(nextId);
      setSelected(null);
      setTextInput("");
    } else {
      setPhase("result");
    }
  }

  const result = phase === "result" ? getResult(answers) : null;

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />
      <div style={{ paddingTop: 64 }}>
        <div className="quiz-content" style={{ maxWidth: 720, margin: "0 auto", padding: "72px 32px 96px" }}>

          {/* ─── Intro ─── */}
          {phase === "intro" && (
            <div style={{ textAlign: "center" }}>
              <p className="tag">Квиз для родителей · Бесплатно</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: "var(--green)", marginBottom: 20 }}>
                Несколько вопросов о вашем ребёнке
              </h1>
              <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.72 }}>
                Светлана получит первичное представление о ситуации и свяжется с вами. Квиз занимает 3–5 минут.
              </p>
              <button onClick={() => setPhase("quiz")} className="btn-amber">Начать квиз →</button>
              <p style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>Без регистрации · Бесплатно · 3–5 минут</p>
            </div>
          )}

          {/* ─── Questions ─── */}
          {phase === "quiz" && currentQ && (
            <div>
              {/* Progress */}
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

              {/* Options */}
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

              {/* Text input for note */}
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
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.18, color: "var(--green)", marginBottom: 20 }}>
                {result.title}
              </h2>
              <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.72, marginBottom: 32 }}>{result.text}</p>

              {/* Value proposition */}
              <div style={{ background: "var(--white)", border: "2px solid var(--border)", padding: "32px 36px", marginBottom: 48 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--green)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  За 1 консультацию вы получите:
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

              {/* Contact form */}
              <div className="quiz-result-form" style={{ background: "var(--green)", padding: "52px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 400, color: "var(--white)", marginBottom: 8 }}>
                  Оставьте контакт
                </h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>
                  Светлана прочитает ваши ответы и напишет вам. В первом сообщении уточнит 1–2 детали и предложит удобное время.
                </p>
                <p style={{ fontSize: 17, color: "var(--amber-2)", fontWeight: 600, marginBottom: 36 }}>
                  Стоимость консультации: 2 950 ₽
                </p>
                <ContactForm
                  source="parents"
                  quizAnswers={answers}
                  dark
                  buttonText="Получить сообщение от Светланы"
                  privacyText="Без спама и рассылок"
                />
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
