import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Профориентация для взрослых — Светлана Жукова",
  description: "Выгораете или хотите сменить профессию? Консультация с профориентологом, которая сама нашла призвание в 50 лет.",
  openGraph: {
    title: "Профориентация для взрослых — Светлана Жукова",
    description: "Выгораете или хотите сменить профессию? Консультация с профориентологом.",
  },
};

const S: Record<string, React.CSSProperties> = {
  section: { padding: "96px 52px" },
  container: { maxWidth: 1080, margin: "0 auto" },
};

export default function AdultsPage() {
  return (
    <div style={{ background: "var(--cream)", overflowX: "hidden" }}>
      <Navigation />

      {/* ── HERO ── */}
      <div style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "55% 45%",
        paddingTop: 64,
      }} className="hero-grid">
        {/* Left: green */}
        <div className="hero-left" style={{
          background: "var(--green)",
          paddingTop: 88,
          paddingRight: 52,
          paddingBottom: 80,
          paddingLeft: "max(52px, calc(50vw - 540px))",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -100, right: -100,
            width: 380, height: 380, borderRadius: "50%",
            background: "rgba(224,152,48,.07)", pointerEvents: "none",
          }} />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--amber-2)", marginBottom: 28, animation: "fadeUp .65s .08s ease both" }}>
            Профориентация для взрослых · Карьерный переход · Онлайн
          </p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(38px, 4.2vw, 62px)",
            fontWeight: 400,
            lineHeight: 1.12,
            color: "var(--white)",
            marginBottom: 26,
            animation: "fadeUp .65s .2s ease both",
          }}>
            Найдите работу,<br />которая даёт смысл —<br />
            <em style={{ fontStyle: "italic", color: "var(--amber-2)" }}>и достойный доход</em>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.68)", maxWidth: 420, marginBottom: 48, lineHeight: 1.75, animation: "fadeUp .65s .32s ease both" }}>
            Светлана Жукова нашла своё призвание в{" "}
            <strong style={{ color: "rgba(255,255,255,.9)", fontWeight: 600 }}>50 лет</strong>.
            Она знает изнутри, каково это — искать себя. И помогает другим сделать это{" "}
            <strong style={{ color: "rgba(255,255,255,.9)", fontWeight: 600 }}>за одну встречу</strong>.
          </p>
          <Link href="/quiz/adults" className="btn-amber" style={{ animation: "fadeUp .65s .44s ease both" }}>
            Пройти бесплатный квиз →
          </Link>
          <p style={{ marginTop: 18, fontSize: 13, color: "rgba(255,255,255,.38)", animation: "fadeUp .65s .52s ease both" }}>
            5 минут · Бесплатно · Без обязательств
          </p>
        </div>

        {/* Right: full-bleed photo */}
        <div className="hero-image" style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/images/photo-hero.jpg"
            alt="Светлана Жукова — профориентолог"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
          <div className="hero-overlay" style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "linear-gradient(to top, rgba(30,61,47,.92) 0%, rgba(30,61,47,.5) 60%, transparent 100%)",
            padding: "40px 44px 36px",
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500, color: "var(--white)" }}>
              Светлана Жукова
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.65)", marginTop: 4, letterSpacing: "0.04em" }}>
              Профориентолог · Кандидат социологических наук
            </div>
            <div className="hero-stats" style={{ display: "flex", gap: 28, marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.2)" }}>
              {[
                { n: "50+", l: "лет — нашла себя" },
                { n: "32", l: "научные работы" },
              ].map((s) => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 600, color: "var(--amber-2)", display: "block", lineHeight: 1 }}>{s.n}</span>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── AHA strip ── */}
      <div className="aha-strip" style={{ background: "var(--amber-pale)", textAlign: "center", padding: "72px 52px", borderTop: "3px solid var(--amber)", borderBottom: "3px solid var(--amber)" }}>
        <p className="tag" style={{ color: "var(--amber)" }}>Начните отсюда</p>
        <h2 className="h2" style={{ maxWidth: 680, margin: "0 auto 16px" }}>
          Пройдите бесплатный квиз —<br /><em>5 минут о вашей ситуации</em>
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 17, maxWidth: 520, margin: "0 auto 40px" }}>
          Ответьте на 7 вопросов. Светлана получит первичное представление о вашем запросе и честно скажет, поможет ли консультация именно вам.
        </p>
        <Link href="/quiz/adults" className="btn-amber">Начать квиз →</Link>
      </div>

      {/* ── BENEFITS ── */}
      <section className="section-pad" style={{ ...S.section, background: "var(--white)" }}>
        <div style={S.container}>
          <p className="tag">Что вы получите</p>
          <h2 className="h2">Не абстрактные советы —<br /><em>конкретный вектор</em></h2>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 540, marginBottom: 52 }}>
            После консультации у вас будет ясность: что делать, в каком порядке, с чего начать прямо сейчас.
          </p>
          <div className="benefits-grid">
            {[
              { n: "1", icon: "🧭", h: "Понять своё призвание", p: "Не просто «что я умею», а что мне подходит по характеру, ценностям и образу жизни. Конкретно, без расплывчатых формулировок." },
              { n: "2", icon: "🗺️", h: "Реалистичный план перехода", p: "Что делать, в каком порядке, с чего начать. Без иллюзий и без страха «уже поздно начинать»." },
              { n: "3", icon: "💪", h: "Уверенность, что всё решаемо", p: "Светлана сама нашла призвание в 50 лет. Взрослые клиенты это чувствуют — и именно они чаще всего уходят с чёткой картиной." },
              { n: "4", icon: "💰", h: "Смысл и доход — не выбор", p: "Работа, которая даёт и то, и другое, существует. Консультация помогает найти именно вашу точку пересечения." },
            ].map((b) => (
              <div key={b.n} className="benefit">
                <span className="benefit-bg-n">{b.n}</span>
                <span className="benefit-icon">{b.icon}</span>
                <h3 className="benefit-h">{b.h}</h3>
                <p className="benefit-p">{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESONANCE ── */}
      <section className="section-pad" style={{ ...S.section, background: "var(--cream-2)" }}>
        <div style={S.container}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }} className="resonance-grid">
            <div>
              <p className="tag">Узнаёте себя?</p>
              <h2 className="h2">Когда понимаешь,<br /><em>что занимаешься не своим делом</em></h2>
              <ul className="resonance-list" style={{ marginTop: 36 }}>
                {[
                  "Работаете, но каждое утро просыпаетесь без желания идти",
                  "Думаете о смене профессии, но страшно начинать всё с нуля",
                  "Слышите внутренний голос «занимаюсь не своим» — и игнорируете его годами",
                  "Боитесь, что в 35, 40, 50 уже поздно что-то менять",
                  "Не знаете что умеете и чего хотите — кроме «не это»",
                ].map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div>
              <div style={{ background: "var(--green)", position: "sticky", top: 88 }}>
                <Image
                  src="/images/photo-about.jpg"
                  alt="Светлана Жукова"
                  width={540}
                  height={220}
                  style={{ width: "100%", height: 220, objectFit: "cover", objectPosition: "center 20%", display: "block" }}
                />
                <div style={{ padding: "36px 40px 44px" }}>
                  <h3 className="h2" style={{ color: "var(--white)", fontSize: 30, marginBottom: 14 }}>
                    Первый шаг —<br /><em>квиз, бесплатно</em>
                  </h3>
                  <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, marginBottom: 32 }}>
                    7 вопросов о вашей ситуации. Светлана честно скажет, чем сможет помочь.
                  </p>
                  <Link href="/quiz/adults" className="btn-white">Пройти квиз →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-pad" style={S.section}>
        <div style={S.container}>
          <p className="tag">Как проходит работа</p>
          <h2 className="h2">Три шага<br /><em>от выгорания к ясности</em></h2>
          <div className="steps-grid">
            {[
              { n: "01", tag: "Бесплатно · 5 минут", h: "Квиз", p: "Расскажите о текущей ситуации и вашем запросе. Светлана заранее понимает контекст и приходит на встречу подготовленной." },
              { n: "02", tag: "Онлайн · 60–90 минут", h: "Консультация", p: "Разбираем ваш опыт, ценности, страхи, возможности. Светлана работает без осуждения и без шаблонов — с реальной историей каждого человека." },
              { n: "03", tag: "На руках · Конкретно", h: "Результат", p: "Вы уходите с пониманием: вот мои сильные стороны, вот направления которые мне подходят, вот первые шаги прямо сейчас." },
            ].map((s) => (
              <div key={s.n} className="step">
                <div className="step-n">{s.n}</div>
                <p className="step-tag">{s.tag}</p>
                <h3 className="step-h">{s.h}</h3>
                <p className="step-p">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO BANNER ── */}
      <div className="photo-banner" style={{ position: "relative", height: 480, overflow: "hidden" }}>
        <Image
          src="/images/photo-action.jpg"
          alt="Светлана Жукова"
          fill
          style={{ objectFit: "cover", objectPosition: "center 25%" }}
        />
        <div className="photo-banner-overlay" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(30,61,47,.82) 0%, rgba(30,61,47,.3) 55%, transparent 100%)",
          display: "flex", alignItems: "center", padding: "0 52px",
        }}>
          <div style={{ maxWidth: 480 }}>
            <p className="tag" style={{ color: "var(--amber-2)" }}>Личный опыт, не теория</p>
            <h2 className="h2" style={{ color: "var(--white)" }}>
              Я нашла своё призвание<br />в 50 лет — <em>поэтому знаю,<br />что это возможно</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,.72)", fontSize: 16, lineHeight: 1.72 }}>
              13 лет в науке, Министерство занятости, корпоративный HR — и только в 50 нашла то, что по-настоящему моё. Клиенты в возрасте 35–50 это чувствуют: разговор с человеком, который прошёл через это сам.
            </p>
          </div>
        </div>
      </div>

      {/* ── OUTCOMES ── */}
      <section className="section-pad" style={{ ...S.section, background: "var(--green)" }}>
        <div style={S.container}>
          <p className="tag" style={{ color: "var(--amber-2)" }}>К чему вы придёте</p>
          <h2 className="h2" style={{ color: "var(--white)" }}>После консультации</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,.5)", maxWidth: 540, marginBottom: 52 }}>
            Что изменится для вас.
          </p>
          <div className="outcome-grid">
            {[
              { icon: "🔍", t: "Вы поймёте, что именно вам подходит — не «вообще», а конкретно, для вашего характера и опыта" },
              { icon: "🗺️", t: "У вас будет план: что делать, в каком порядке, что изменить прямо сейчас" },
              { icon: "😌", t: "Страх «уже поздно» уйдёт — появится понимание, что изменения реальны и достижимы" },
              { icon: "⚡", t: "Вы вернёте энергию — когда есть вектор, появляется и силы двигаться" },
            ].map((o) => (
              <div key={o.icon} className="outcome-card">
                <span className="outcome-icon">{o.icon}</span>
                <p className="outcome-text">{o.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section-pad" style={{ ...S.section, background: "var(--white)" }}>
        <div style={S.container}>
          <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 72, alignItems: "start" }} className="about-grid">
            <div>
              <div style={{ width: "100%", aspectRatio: "3/4", background: "var(--green-light)", position: "relative", overflow: "hidden", borderBottom: "4px solid var(--amber)" }}>
                <Image
                  src="/images/photo-work.jpg"
                  alt="Светлана Жукова за работой"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </div>
            </div>
            <div>
              <p className="tag">О Светлане</p>
              <h2 className="h2">Светлана Жукова</h2>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22, fontStyle: "italic", color: "var(--green)",
                borderLeft: "3px solid var(--amber)", paddingLeft: 24,
                marginBottom: 32, lineHeight: 1.55,
              }}>
                «Я нашла своё призвание в 50 лет — после науки, госслужбы, HR и преподавания. Клиенты старше 35 особенно это чувствуют. Я не по книгам знаю, каково это.»
              </p>
              <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 20, lineHeight: 1.75 }}>
                Профориентолог, преподаватель, наставник. Кандидат социологических наук. Работает онлайн по всей России.
              </p>
              <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 20, lineHeight: 1.75 }}>
                До профориентации — 13 лет ведущим научным сотрудником в ВНИИ труда Минтруда России, работа в Министерстве занятости Саратовской области, преподавание в вузе, HR. Соавтор 32 научно-исследовательских работ.
              </p>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.75 }}>
                Специализируется на профориентации подростков и взрослых. Работает онлайн — по всей России.
              </p>
              <div className="creds">
                {["Кандидат социологических наук", "Профориентолог (2024)", "Психолог", "32 научные работы", "Академия WhoAmI"].map((c) => (
                  <span key={c} className="cred">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OBJECTIONS ── */}
      <section className="section-pad" style={{ ...S.section, background: "var(--cream-2)" }}>
        <div style={S.container}>
          <p className="tag">Частые вопросы</p>
          <h2 className="h2" style={{ marginBottom: 44 }}>Сомнения,<br /><em>которые у вас могут быть</em></h2>
          <div className="objections-wrap">
            {[
              { q: "«Мне уже за 40 — поздно менять»", a: "Светлана сама нашла призвание в 50 лет, после науки, госслужбы и HR. Возраст — это не ограничение, это накопленный опыт. Именно взрослые клиенты чаще всего уходят с чёткой, реалистичной картиной." },
              { q: "«Я не знаю, что мне нравится»", a: "Это нормально — и именно с этим помогает консультация. Светлана умеет находить интересы там, где человек давно перестал их замечать." },
              { q: "«Я пробовал переходить — не получилось»", a: "Хаотичные попытки редко работают. Консультация помогает понять, почему предыдущие переходы не сложились, и что делать по-другому." },
              { q: "«Это дорого»", a: "Консультация стоит 2 950 рублей. Это дешевле одного месяца тревожного бездействия. Одна встреча — конкретный вектор." },
            ].map((o) => (
              <div key={o.q} className="objection">
                <p className="obj-q">{o.q}</p>
                <p className="obj-a">{o.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section className="section-pad" style={{ ...S.section, background: "var(--cream)" }} id="quiz">
        <div style={S.container}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }} className="form-grid">
            <div>
              <p className="tag">Следующий шаг</p>
              <h2 className="h2">Начните с квиза —<br /><em>5 минут о вашей ситуации</em></h2>
              <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.72, marginBottom: 28 }}>
                Ответьте на 7 вопросов. Светлана получит первичное представление о вашем запросе и честно скажет, поможет ли консультация именно вам.
              </p>
              <Link href="/quiz/adults" className="btn-amber" style={{ marginBottom: 32, display: "inline-block" }}>
                Пройти квиз →
              </Link>
              <p style={{ fontSize: 14, marginBottom: 16 }}>Не готовы к квизу? Просто оставьте контакт — Светлана напишет сама.</p>
              <a
                href="https://t.me/rabotaizhizn24"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  background: "var(--green)", color: "var(--white)",
                  fontSize: 14, fontWeight: 600, padding: "14px 22px", textDecoration: "none",
                }}
              >
                📢 Telegram-канал Светланы
              </a>
            </div>
            <div className="form-box">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, fontWeight: 400, color: "var(--green)", marginBottom: 6 }}>
                Оставить заявку
              </h3>
              <p style={{ fontSize: 15, color: "var(--muted)", marginBottom: 36 }}>
                Светлана свяжется с вами в течение дня.
              </p>
              <ContactForm source="adults" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
