import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Блог",
  description: "Статьи о профориентации, выборе профессии, выгорании и карьерных переходах.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <Navigation />

      <div style={{ paddingTop: 64 }}>
        {/* Header */}
        <div className="blog-header" style={{ background: "var(--green)", padding: "88px 52px 72px" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <p className="tag" style={{ color: "var(--amber-2)" }}>Блог</p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 58px)", fontWeight: 400, lineHeight: 1.12, color: "var(--white)", marginBottom: 16 }}>
              Статьи о профессии,<br />призвании и карьере
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", maxWidth: 520 }}>
              Пишу о выборе профессии, выгорании, сильных сторонах и карьерных переходах. Из личного опыта и многолетней практики.
            </p>
          </div>
        </div>

        {/* Posts */}
        <div className="blog-posts-wrap" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 52px 96px" }}>
          {posts.length === 0 ? (
            <p style={{ fontSize: 17, color: "var(--muted)", padding: "48px 0" }}>Статьи скоро появятся.</p>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ display: "block", textDecoration: "none" }}
              >
                <div className="blog-post-item" style={{
                  padding: "44px 0",
                  borderBottom: "1px solid var(--border)",
                  display: "grid",
                  gridTemplateColumns: "1fr 180px",
                  gap: 48,
                  alignItems: "start",
                  transition: "background 0.2s",
                }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase" as const,
                        color: "var(--muted)",
                        background: "var(--cream-2)",
                        border: "1px solid var(--border)",
                        padding: "4px 10px",
                      }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: 13, color: "var(--muted)" }}>{post.readTime}</span>
                    </div>
                    <h2 style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(22px, 2.5vw, 32px)",
                      fontWeight: 500,
                      lineHeight: 1.2,
                      color: "var(--green)",
                      marginBottom: 10,
                    }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: 16, color: "var(--muted)", lineHeight: 1.65 }}>{post.excerpt}</p>
                  </div>
                  <div className="blog-post-item-date" style={{ textAlign: "right", paddingTop: 4 }}>
                    <p style={{ fontSize: 13, color: "var(--muted)" }}>
                      {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <p style={{ fontSize: 13, color: "var(--amber)", marginTop: 8, fontWeight: 600 }}>Читать →</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
