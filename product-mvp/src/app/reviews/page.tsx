import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { reviews } from "@/data/reviews";

export const metadata = {
  title: "Отзывы клиентов — Светлана Жукова",
  description:
    "Реальные отзывы клиентов профориентолога Светланы Жуковой. Профориентация для взрослых и школьников онлайн.",
  openGraph: {
    title: "Отзывы клиентов — Светлана Жукова",
    description:
      "Реальные отзывы клиентов профориентолога Светланы Жуковой.",
  },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ReviewsPage() {
  return (
    <div style={{ background: "var(--cream)", overflowX: "hidden" }}>
      <Navigation />

      {/* ── HERO ── */}
      <div
        style={{
          background: "var(--green)",
          paddingTop: 128,
          paddingBottom: 80,
          paddingLeft: "max(52px, calc(50vw - 540px))",
          paddingRight: "max(52px, calc(50vw - 540px))",
        }}
        className="blog-header"
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--amber-2)",
              marginBottom: 20,
            }}
          >
            Профориентология · Светлана Жукова
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 4vw, 60px)",
              fontWeight: 400,
              lineHeight: 1.14,
              color: "var(--white)",
              marginBottom: 20,
            }}
          >
            Отзывы клиентов
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,.6)",
              maxWidth: 520,
              lineHeight: 1.72,
            }}
          >
            Что говорят взрослые и родители школьников после консультаций со
            Светланой Жуковой.
          </p>
        </div>
      </div>

      {/* ── REVIEWS ── */}
      <section
        style={{ padding: "80px 52px", background: "var(--cream)" }}
        className="section-pad"
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}
            className="reviews-page-grid"
          >
            {reviews.map((r) => (
              <div
                key={r.id}
                className="review-card review-card-full"
                style={{ background: "var(--white)" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 18,
                  }}
                >
                  <div className="review-initials">{getInitials(r.name)}</div>
                  <div>
                    <p className="review-name">{r.name}</p>
                    {r.date && <p className="review-date">{r.date}</p>}
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--dark)",
                    lineHeight: 1.72,
                  }}
                >
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{ background: "var(--green)", padding: "72px 52px" }}
        className="section-pad"
      >
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--amber-2)",
              marginBottom: 20,
            }}
          >
            Ваш шаг
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 400,
              color: "var(--white)",
              lineHeight: 1.2,
              marginBottom: 20,
            }}
          >
            Запишитесь на бесплатный квиз —<br />
            <em style={{ fontStyle: "italic", color: "var(--amber-2)" }}>
              5 минут о вашей ситуации
            </em>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,.6)",
              marginBottom: 40,
            }}
          >
            Ответьте на несколько вопросов — и я покажу, как именно могу
            помочь именно вам.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/quiz/adults" className="btn-amber">
              Квиз для взрослых →
            </Link>
            <Link href="/quiz/parents" className="btn-amber">
              Квиз для родителей →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
