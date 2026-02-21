"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

const QUESTIONS = [
  { id: "situation", question: "Что происходит сейчас?", options: ["Работаю, но сильно выгораю", "Ищу работу — уволился или уволили", "Хочу сменить профессию, но не знаю на что", "Не понимаю куда двигаться дальше"] },
  { id: "age", question: "Сколько вам лет?", options: ["25–30", "31–40", "41–50", "50 и больше"] },
  { id: "problem", question: "Что больше всего не устраивает в текущей ситуации?", options: ["Нет смысла в том, что делаю", "Мало зарабатываю", "Нет роста и перспектив", "Физически и эмоционально истощён"] },
  { id: "priority", question: "Что важнее всего в новой работе?", options: ["Смысл и ощущение, что делаю важное", "Достойная зарплата", "Гибкость и свобода", "Рост и развитие"] },
  { id: "tried", question: "Пробовали ли уже что-то менять?", options: ["Менял работу внутри той же сферы — не помогло", "Пробовал другую профессию — не прижилась", "Думал об этом, но не решался начать", "Нет, это первая попытка разобраться"] },
  { id: "block", question: "Что останавливает прямо сейчас?", options: ["Страх провала и осуждения", "Не знаю что умею и что хочу", "Финансовые обязательства — нельзя рисковать", "Кажется, что в моём возрасте уже поздно"] },
  { id: "want", question: "Что вы хотите получить от консультации?", options: ["Понять своё призвание — что мне реально подходит", "Конкретный план перехода в другую сферу", "Уверенность, что всё можно изменить", "Просто поговорить с кем-то, кто понимает"] },
];

function getResult(answers: Record<string, string>): { title: string; text: string; tip: string } {
  const block = answers.block || "";
  const situation = answers.situation || "";
  const age = answers.age || "";

  if (block.includes("поздно") || age === "50 и больше") {
    return {
      title: "«Уже поздно» — это самый распространённый миф",
      text: "Светлана нашла своё призвание в 50 лет — после науки, госслужбы, HR и преподавания. Она не по книгам знает, каково это — начинать сначала в зрелом возрасте. Именно взрослые клиенты чаще всего уходят с чёткой, реалистичной картиной.",
      tip: "Возраст — это не ограничение, это накопленный опыт. Запишитесь на консультацию.",
    };
  }
  if (situation.includes("выгораю")) {
    return {
      title: "Выгорание — это сигнал, не приговор",
      text: "Выгорание почти всегда означает одно из двух: либо вы занимаетесь не тем, либо занимаетесь тем, но не так. Консультация поможет понять, что происходит на самом деле — и что с этим делать.",
      tip: "Не ждите, пока станет хуже. Один разговор — и картина станет яснее.",
    };
  }
  if (block.includes("Не знаю")) {
    return {
      title: "«Не знаю чего хочу» — это тоже материал для работы",
      text: "Отсутствие ясности — не тупик. Светлана умеет находить сильные стороны и подлинные интересы там, где человек их давно перестал замечать. Именно это и отличает живой разговор от онлайн-теста.",
      tip: "Расскажите о себе в форме — Светлана получит первичное представление и свяжется с вами.",
    };
  }
  return {
    title: "Судя по вашим ответам — вы уже готовы к изменениям",
    text: "Осознание проблемы и желание разобраться — это половина пути. Консультация поможет превратить это в конкретный план: что делать, в каком порядке, с чего начать прямо сейчас.",
    tip: "Запишитесь на консультацию — первый шаг уже сделан.",
  };
}

export default function QuizAdultsPage() {
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
              <p className="tag">Квиз для взрослых · Бесплатно</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: "var(--green)", marginBottom: 20 }}>
                7 вопросов о вашей ситуации
              </h1>
              <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 480, margin: "0 auto 48px", lineHeight: 1.72 }}>
                Светлана получит первичное представление о вашем запросе и свяжется с вами. Квиз занимает 3–5 минут.
              </p>
              <button onClick={() => setStep(1)} className="btn-amber">Начать квиз →</button>
              <p style={{ marginTop: 16, fontSize: 13, color: "var(--muted)" }}>Без регистрации · Бесплатно · 3–5 минут</p>
            </div>
          )}

          {currentQ && (
            <div>
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
                <ContactForm source="adults" quizAnswers={answers} dark />
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
