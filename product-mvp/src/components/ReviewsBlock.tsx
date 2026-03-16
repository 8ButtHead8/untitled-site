import Link from "next/link";
import { reviews } from "@/data/reviews";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface ReviewsBlockProps {
  ids: string[];
  title?: string;
  subtitle?: string;
}

export default function ReviewsBlock({
  ids,
  title = "Что говорят клиенты",
  subtitle = "Реальные отзывы клиентов Светланы.",
}: ReviewsBlockProps) {
  const selected = ids
    .map((id) => reviews.find((r) => r.id === id))
    .filter(Boolean) as typeof reviews;

  return (
    <section
      className="section-pad"
      style={{ padding: "96px 52px", background: "var(--white)" }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <p className="tag">Отзывы клиентов</p>
        <h2 className="h2" style={{ marginBottom: 16 }}>
          {title.includes("\n") ? (
            <>
              {title.split("\n")[0]}
              <br />
              <em>{title.split("\n")[1]}</em>
            </>
          ) : (
            title
          )}
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "var(--muted)",
            marginBottom: 48,
            maxWidth: 540,
          }}
        >
          {subtitle}
        </p>

        <div className="reviews-grid">
          {selected.map((r) => (
            <div key={r.id} className="review-card">
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
              <p className="review-text">{r.text}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            href="/reviews"
            style={{
              fontSize: 15,
              color: "var(--green)",
              fontWeight: 600,
              textDecoration: "none",
              borderBottom: "2px solid var(--amber)",
              paddingBottom: 3,
            }}
          >
            Все отзывы →
          </Link>
        </div>
      </div>
    </section>
  );
}
