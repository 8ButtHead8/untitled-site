import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Профориентация для школьников — Светлана Жукова",
  description: "Помогите ребёнку определиться с профессией до ЕГЭ. Консультация онлайн — кандидат наук, 5000+ отзывов на Профи.ру.",
};

const S: Record<string, React.CSSProperties> = {
  section: { padding: "96px 52px" },
  container: { maxWidth: 1080, margin: "0 auto" },
};

export default function ParentsPage() {
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
        <div style={{
          background: "var(--green)",
          padding: "88px 72px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -100, right: -100,
            width: 380, height: 380, borderRadius: "50%",
            background: "rgba(224,152,48,.07)",
            pointerEvents: "none",
          }} />
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--amber-2)", marginBottom: 28, animation: "fadeUp .65s .08s ease both" }}>
            Профориентация для школьников 9–11 класса · Онлайн
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
            Помогите ребёнку<br />найти своё дело —<br />до того, как ЕГЭ{" "}
            <em style={{ fontStyle: "italic", color: "var(--amber-2)" }}>решит за вас</em>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.68)", maxWidth: 420, marginBottom: 48, lineHeight: 1.75, animation: "fadeUp .65s .32s ease both" }}>
            Не тест из интернета — живой разговор со Светланой Жуковой,{" "}
            <strong style={{ color: "rgba(255,255,255,.9)", fontWeight: 600 }}>кандидатом наук</strong>{" "}
            и профориентологом с{" "}
            <strong style={{ color: "rgba(255,255,255,.9)", fontWeight: 600 }}>более чем 5 000 отзывами</strong>.
            Ваш ребёнок поймёт куда поступать — за одну встречу.
          </p>
          <Link href="/quiz/parents" className="btn-amber" style={{ animation: "fadeUp .65s .44s ease both" }}>
            Пройти бесплатный квиз →
          </Link>
          <p style={{ marginTop: 18, fontSize: 13, color: "rgba(255,255,255,.38)", animation: "fadeUp .65s .52s ease both" }}>
            5 минут · Бесплатно · Без обязательств
          </p>
        </div>

        {/* Right: full-bleed photo */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Image
            src="/images/photo-hero.jpg"
            alt="Светлана Жукова — профориентолог"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
          <div style={{
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
            <div style={{ display: "flex", gap: 28, marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.2)" }}>
              {[
                { n: "5 015", l: "отзывов" },
                { n: "4+", l: "года практики" },
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
      <div style={{ background: "var(--amber-pale)", textAlign: "center", padding: "72px 52px", borderTop: "3px solid var(--amber)", borderBottom: "3px solid var(--amber)" }}>
        <p className="tag" style={{ color: "var(--amber)" }}>Начните отсюда</p>
        <h2 className="h2" style={{ maxWidth: 680, margin: "0 auto 16px" }}>
          Пройдите бесплатный квиз —<br /><em>5 минут о вашем ребёнке</em>
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 17, maxWidth: 520, margin: "0 auto 40px" }}>
          Ответьте на 8 вопросов. Светлана получит первичное представление о ситуации и честно скажет, подойдёт ли консультация именно вам.
        </p>
        <Link href="/quiz/parents" className="btn-amber">Начать квиз →</Link>
      </div>

      {/* ── BENEFITS ── */}
      <section style={{ ...S.section, background: "var(--white)" }}>
        <div style={S.container}>
          <p className="tag">Что вы получите</p>
          <h2 className="h2">Конкретный результат —<br /><em>не список из 40 профессий</em></h2>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 540, marginBottom: 52 }}>
            После консультации у вас и ребёнка будет ясность. Не «подумаем», а конкретный план.
          </p>
          <div className="benefits-grid">
            {[
              { n: "1", icon: "🎯", h: "Конкретный список профессий", p: "Не «врач или юрист», а именно то, что подходит вашему ребёнку — исходя из его интересов, сильных сторон и характера." },
              { n: "2", icon: "📋", h: "Чёткий план по ЕГЭ", p: "Поймёте, какие предметы выбрать и почему — с обоснованием под конкретную цель. Без тревоги и угадайки." },
              { n: "3", icon: "💡", h: "Ребёнок уйдёт с решением", p: "Придёт закрытым, уйдёт с пониманием «вот куда я иду и зачем». Его собственное решение — не навязанное." },
              { n: "4", icon: "🗺️", h: "Несколько вариантов, а не один", p: "Несколько направлений и вузов — готовая дорожная карта, к которой можно возвращаться." },
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
      <section style={{ ...S.section, background: "var(--cream-2)" }}>
        <div style={S.container}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }} className="resonance-grid">
            <div>
              <p className="tag">Узнаёте себя?</p>
              <h2 className="h2">Хотите, чтобы ребёнок<br /><em>уверенно выбрал путь</em></h2>
              <ul className="resonance-list" style={{ marginTop: 36 }}>
                {[
                  "Ребёнок говорит «не знаю кем хочу быть» — и так каждый раз",
                  "Скоро выбирать предметы ЕГЭ, а ничего не решено",
                  "Смотрите на чужих детей, у которых «всё понятно», и тревожитесь",
                  "Беспокоитесь: потратите деньги на вуз — а ребёнок бросит после первого курса",
                  "Пытались поговорить сами — но разговор не получается",
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
                    Начните с квиза —<br /><em>это бесплатно</em>
                  </h3>
                  <p style={{ color: "rgba(255,255,255,.6)", fontSize: 15, marginBottom: 32 }}>
                    5 минут, 8 вопросов о вашем ребёнке. Первый шаг к ясности.
                  </p>
                  <Link href="/quiz/parents" className="btn-white">Пройти квиз →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={S.section}>
        <div style={S.container}>
          <p className="tag">Как проходит работа</p>
          <h2 className="h2">Три шага<br /><em>от тревоги к ясности</em></h2>
          <div className="steps-grid">
            {[
              { n: "01", tag: "Бесплатно · 5 минут", h: "Квиз", p: "Отвечаете на 8 вопросов о ребёнке — его интересах, ситуации, что уже пробовали. Светлана приходит на встречу подготовленной." },
              { n: "02", tag: "Онлайн · 60–90 минут", h: "Консультация", p: "Встреча с ребёнком. Разбираем склонности, интересы, мотивацию. Светлана умеет разговорить даже самых закрытых подростков — к середине они сами не хотят заканчивать." },
              { n: "03", tag: "На руках · Конкретно", h: "Результат", p: "Ребёнок уходит с пониманием: вот мои сильные стороны, вот профессии которые мне подходят, вот куда поступать. Несколько вариантов." },
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
      <div style={{ position: "relative", height: 480, overflow: "hidden" }}>
        <Image
          src="/images/photo-action.jpg"
          alt="Светлана Жукова"
          fill
          style={{ objectFit: "cover", objectPosition: "center 25%" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(30,61,47,.82) 0%, rgba(30,61,47,.3) 55%, transparent 100%)",
          display: "flex", alignItems: "center", padding: "0 72px",
        }}>
          <div style={{ maxWidth: 480 }}>
            <p className="tag" style={{ color: "var(--amber-2)" }}>Живой разговор, не тест</p>
            <h2 className="h2" style={{ color: "var(--white)" }}>
              Я нашла своё призвание<br />в 50 лет — <em>и знаю,<br />как это сделать</em>
            </h2>
            <p style={{ color: "rgba(255,255,255,.72)", fontSize: 16, lineHeight: 1.72 }}>
              До профориентации — 13 лет в науке, Министерство занятости, корпоративный HR. Собственный опыт поиска себя делает каждую консультацию настоящей.
            </p>
          </div>
        </div>
      </div>

      {/* ── OUTCOMES ── */}
      <section style={{ ...S.section, background: "var(--green)" }}>
        <div style={S.container}>
          <p className="tag" style={{ color: "var(--amber-2)" }}>К чему вы придёте</p>
          <h2 className="h2" style={{ color: "var(--white)" }}>После консультации</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,.5)", maxWidth: 540, marginBottom: 52 }}>
            Что изменится для вас и для ребёнка.
          </p>
          <div className="outcome-grid">
            {[
              { icon: "😮‍💨", t: "Вы почувствуете облегчение — важное решение принято осознанно, а не наугад" },
              { icon: "🧭", t: "Ребёнок скажет «я знаю куда иду» — и это будет его собственное решение" },
              { icon: "🏠", t: "Разговоры о выборе профессии перестанут быть источником тревоги в семье" },
              { icon: "🚀", t: "Ваш ребёнок получит уверенный старт во взрослой жизни — именно то, чего вы хотите для него" },
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
      <section style={{ ...S.section, background: "var(--white)" }}>
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
                «Я знаю как сложно найти любимое дело. Смогла найти своё призвание только в 50 лет — и теперь помогаю другим не тратить годы на поиск того, что можно найти за одну встречу.»
              </p>
              <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 20, lineHeight: 1.75 }}>
                Профориентолог, преподаватель, наставник. Кандидат социологических наук. На Профи.ру с 2021 года — <strong style={{ color: "var(--dark)" }}>более 5 000 отзывов</strong>, один из самых опытных специалистов в своей нише.
              </p>
              <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 20, lineHeight: 1.75 }}>
                До профориентации — 13 лет ведущим научным сотрудником в ВНИИ труда Минтруда России, работа в Министерстве занятости Саратовской области, преподавание в вузе, HR. Соавтор 32 научно-исследовательских работ по психологии и управлению персоналом.
              </p>
              <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.75 }}>
                Прошла специализированную подготовку по профориентации подростков в Академии WhoAmI. Работает онлайн — по всей России.
              </p>
              <div className="creds">
                {["Кандидат социологических наук", "Профориентолог (2024)", "Психолог", "32 научные работы", "5 015 отзывов", "Академия WhoAmI"].map((c) => (
                  <span key={c} className="cred">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OBJECTIONS ── */}
      <section style={{ ...S.section, background: "var(--cream-2)" }}>
        <div style={S.container}>
          <p className="tag">Частые вопросы</p>
          <h2 className="h2" style={{ marginBottom: 44 }}>Сомнения,<br /><em>которые у вас могут быть</em></h2>
          <div className="objections-wrap">
            {[
              { q: "«Ребёнок не захочет разговаривать с незнакомым человеком»", a: "Это нормально — так почти у всех. Светлана работает с подростками много лет и умеет разговорить даже самых закрытых. Первые минуты уходят на то, чтобы ребёнок расслабился. К середине встречи они сами не хотят заканчивать." },
              { q: "«Мы уже проходили тесты — результат был бесполезным»", a: "Тесты дают направление, а не ответ. Светлана работает с живым разговором — именно поэтому результат конкретный, а не список из 40 профессий без объяснений." },
              { q: "«Не знаем, подойдёт ли это именно нашему ребёнку»", a: "Для этого и нужен квиз — он бесплатный. Пройдите его, и Светлана честно скажет, подойдёт ли консультация вашей ситуации." },
              { q: "«Это дорого»", a: "Консультация стоит 2 950 рублей. Это дешевле одного месяца обучения на ненужной специальности. Дешевле года сомнений. Одна встреча — конкретный результат." },
            ].map((o) => (
              <div key={o.q} className="objection">
                <p className="obj-q">{o.q}</p>
                <p className="obj-a">{o.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VS ── */}
      <section style={{ ...S.section, background: "var(--cream-2)" }}>
        <div style={S.container}>
          <p className="tag">Почему не агрегатор</p>
          <h2 className="h2" style={{ marginBottom: 44 }}>Чем отличается<br /><em>личный специалист</em></h2>
          <div className="vs-grid">
            <div className="vs-card">
              <p className="vs-label">Профи.ру и агрегаторы</p>
              <h3 className="vs-h">Много выбора, мало понимания</h3>
              <p className="vs-p">50 специалистов без возможности понять, кто из них реально работает с подростками. Выбираете по рейтингу и фотографии. Плюс комиссия.</p>
            </div>
            <div className="vs-card">
              <p className="vs-label">Онлайн-тесты</p>
              <h3 className="vs-h">Список профессий без контекста</h3>
              <p className="vs-p">Дают 20–40 профессий без объяснения почему именно они. Ребёнок остаётся с тем же вопросом — только теперь с распечаткой в руках.</p>
            </div>
            <div className="vs-card featured">
              <p className="vs-label">Светлана Жукова</p>
              <h3 className="vs-h">Один человек. Конкретный результат.</h3>
              <p className="vs-p">Видите кто работает с вашим ребёнком — её историю, статьи, 5 000+ отзывов. Квиз даёт Светлане контекст ещё до встречи. Напрямую, без посредников.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section style={{ ...S.section, background: "var(--cream)" }} id="quiz">
        <div style={S.container}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "start" }} className="form-grid">
            <div>
              <p className="tag">Следующий шаг</p>
              <h2 className="h2">Начните с квиза —<br /><em>5 минут о вашем ребёнке</em></h2>
              <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.72, marginBottom: 28 }}>
                Ответьте на 8 вопросов. Светлана получит первичное представление о ситуации и честно скажет, подойдёт ли консультация именно вам. Бесплатно, без обязательств.
              </p>
              <Link href="/quiz/parents" className="btn-amber" style={{ marginBottom: 32, display: "inline-block" }}>
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
              <ContactForm source="parents" />
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; min-height: auto !important; }
          .resonance-grid, .about-grid, .form-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}
