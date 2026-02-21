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
  situation: {
    id: "situation",
    question: "Что ближе всего к вашей ситуации сейчас?",
    options: [
      "Работаю, но выгораю и сил всё меньше",
      "Ищу работу (уволился / уволили)",
      "Хочу сменить профессию, но не понимаю на что",
      "Всё «нормально», но нет смысла и радости",
      "Хочу роста, но не вижу куда",
    ],
  },
  job_search_state: {
    id: "job_search_state",
    question: "Какой запрос по работе сейчас ближе?",
    options: [
      "Вернуться в свою сферу",
      "Перейти в смежную",
      "Полностью сменить направление",
      "Пока вообще не понимаю куда",
    ],
  },
  main_pain: {
    id: "main_pain",
    question: "Что больше всего давит / раздражает в текущей ситуации?",
    options: [
      "Нет смысла в том, что делаю",
      "Истощение и постоянная усталость",
      "Деньги не соответствуют усилиям",
      "Нет роста / перспектив",
      "Страшно, что так будет всегда",
    ],
  },
  blocker: {
    id: "blocker",
    question: "Что сильнее всего останавливает двигаться дальше прямо сейчас?",
    options: [
      "Не понимаю, что умею и чего хочу",
      "Финансовые обязательства: нельзя рисковать",
      "Страх провала / осуждения",
      "Кажется, что уже поздно что-то менять",
      "Нет сил и ресурса",
    ],
  },
  attempts: {
    id: "attempts",
    question: "Что вы уже пробовали, чтобы изменить ситуацию?",
    options: [
      "Менял(а) работу в той же сфере, но стало так же",
      "Пробовал(а) другую сферу, но не прижилось",
      "Читал(а) / смотрел(а) много, но не собралось в план",
      "Думал(а), но не решался(лась) начать",
      "Это первая попытка разобраться",
    ],
  },
  time_horizon: {
    id: "time_horizon",
    question: "Когда вы хотите почувствовать первые понятные изменения?",
    options: [
      "В ближайшие 2–4 недели",
      "В течение 2–3 месяцев",
      "В этом году",
      "Сроков нет, хочу ясность",
    ],
  },
  desired_outcome: {
    id: "desired_outcome",
    question: "Что вам важнее получить на выходе консультации?",
    options: [
      "Понять направление и «своё» поле (призвание / сильные стороны)",
      "Реалистичный план перехода: что делать по шагам",
      "Уверенность, что всё можно изменить и я не один(одна)",
      "Разобрать хаос в голове и принять решение",
      "Понять, как зарабатывать больше без выгорания",
    ],
  },
  note: {
    id: "note",
    question: "Если хотите, напишите 1–2 строки: что будет для вас «хорошим исходом» через 3 месяца?",
    isTextInput: true,
    optional: true,
  },
};

/* ─── Branching ─── */

function getNextId(currentId: string, answers: Record<string, string>): string | null {
  switch (currentId) {
    case "situation":
      return (answers.situation || "").includes("Ищу работу") ? "job_search_state" : "main_pain";
    case "job_search_state":
      return "main_pain";
    case "main_pain":
      return "blocker";
    case "blocker":
      return "attempts";
    case "attempts":
      return "time_horizon";
    case "time_horizon":
      return "desired_outcome";
    case "desired_outcome":
      return "note";
    case "note":
      return null;
    default:
      return null;
  }
}

function getEstimatedTotal(answers: Record<string, string>): number {
  let total = 7; // base questions including note
  if ((answers.situation || "").includes("Ищу работу")) total += 1;
  return total;
}

/* ─── Result segments ─── */

interface ResultData {
  title: string;
  text: string;
  benefits: string[];
}

function getResult(answers: Record<string, string>): ResultData {
  const situation = answers.situation || "";
  const blocker = answers.blocker || "";
  const mainPain = answers.main_pain || "";

  // Segment: "Too late"
  if (blocker.includes("поздно")) {
    return {
      title: "Кажется, вы в точке, где кажется — уже поздно. Но это не так",
      text: "Светлана нашла своё призвание в 50 лет — после науки, госслужбы, HR и преподавания. Она не по книгам знает, каково это — начинать сначала в зрелом возрасте. Именно взрослые клиенты чаще всего уходят с чёткой, реалистичной картиной.",
      benefits: [
        "Ясную картину: что именно происходит и что с этим делать",
        "Опору на сильные стороны и опыт: что можно «перенести» в новую роль",
        "Реалистичный план: 3–5 шагов, с чего начать уже сейчас",
      ],
    };
  }

  // Segment: Burnout
  if (situation.includes("выгораю")) {
    return {
      title: "Кажется, вы в точке, где силы закончились, а ясности нет",
      text: "Выгорание почти всегда означает одно из двух: вы занимаетесь не тем, или занимаетесь тем, но не так. Консультация поможет понять, что происходит на самом деле — и что с этим делать.",
      benefits: [
        "Ясную картину: выгорание, тупик или не ваш путь — и что с этим делать",
        "Опору на сильные стороны и опыт: что можно «перенести» в новую роль",
        "Реалистичный план: 3–5 шагов, с чего начать уже сейчас",
      ],
    };
  }

  // Segment: Job search
  if (situation.includes("Ищу работу")) {
    return {
      title: "Кажется, вы в точке, где нужно выбирать — но непонятно куда",
      text: "Когда ты без работы, давление нарастает: хочется схватить первое предложение. Консультация помогает остановиться, увидеть картину целиком и выбрать направление, а не просто «ближайшую вакансию».",
      benefits: [
        "Ясную картину: куда двигаться, а что точно не ваше",
        "Опору на сильные стороны и опыт: как «продать» себя на рынке",
        "Реалистичный план: 3–5 шагов, с чего начать уже сейчас",
      ],
    };
  }

  // Segment: Don't know what I want
  if (blocker.includes("Не понимаю")) {
    return {
      title: "Кажется, вы в точке, где всё смешалось — и хочется ясности",
      text: "Отсутствие ясности — не тупик. Светлана умеет находить сильные стороны и подлинные интересы там, где человек их давно перестал замечать. Именно это и отличает живой разговор от онлайн-теста.",
      benefits: [
        "Ясную картину: что вам действительно подходит, а не «кажется»",
        "Опору на сильные стороны и опыт: что можно «перенести» в новую роль",
        "Реалистичный план: 3–5 шагов, с чего начать уже сейчас",
      ],
    };
  }

  // Segment: No meaning
  if (situation.includes("нормально") || mainPain.includes("Нет смысла")) {
    return {
      title: "Кажется, вы в точке, где всё «нормально» — но внутри пусто",
      text: "Это одна из самых сложных ситуаций: объективно всё хорошо, но энергии и смысла нет. Консультация помогает понять — что именно «не то» и куда на самом деле хочется.",
      benefits: [
        "Ясную картину: что стоит за ощущением «не то» и где искать смысл",
        "Опору на сильные стороны: в чём вы по-настоящему хороши",
        "Реалистичный план: 3–5 шагов, с чего начать уже сейчас",
      ],
    };
  }

  // Default
  return {
    title: "Судя по вашим ответам — вы уже готовы к изменениям",
    text: "Осознание проблемы и желание разобраться — это половина пути. Консультация поможет превратить это в конкретный план: что делать, в каком порядке, с чего начать.",
    benefits: [
      "Ясную картину: что именно происходит (выгорание / тупик / не ваш путь)",
      "Опору на сильные стороны и опыт: что можно «перенести» в новую роль",
      "Реалистичный план: 3–5 шагов, с чего начать уже сейчас",
    ],
  };
}

/* ─── Component ─── */

export default function QuizAdultsPage() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQId, setCurrentQId] = useState("situation");
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
              <p className="tag">Квиз для взрослых · Бесплатно</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: "var(--green)", marginBottom: 20 }}>
                Несколько вопросов о вашей ситуации
              </h1>
              <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.72 }}>
                Светлана получит первичное представление о вашем запросе и свяжется с вами. Квиз занимает 3–5 минут.
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
                  На консультации вы получите:
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {result.benefits.map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12, fontSize: 16, color: "var(--dark)", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--amber)", flexShrink: 0, marginTop: 2 }}>{i + 1}.</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact form */}
              <div className="quiz-result-form" style={{ background: "var(--green)", padding: "52px" }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 400, color: "var(--white)", marginBottom: 8 }}>
                  Оставьте контакт
                </h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>
                  Светлана посмотрит ответы и напишет вам лично. Вы коротко уточните вводные и поймёте, подходит ли вам консультация и какой формат лучше.
                </p>
                <p style={{ fontSize: 17, color: "var(--amber-2)", fontWeight: 600, marginBottom: 36 }}>
                  Стоимость консультации: 2 950 ₽
                </p>
                <ContactForm
                  source="adults"
                  quizAnswers={answers}
                  dark
                  buttonText="Получить план и варианты времени"
                  privacyText="Без навязчивых звонков"
                />
              </div>

              <div style={{ marginTop: 32, textAlign: "center" }}>
                <Link href="/adults" style={{ fontSize: 14, color: "var(--muted)", textDecoration: "none" }}>
                  ← Вернуться на страницу для взрослых
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
