import { notFound } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { getPostBySlug } from "@/lib/blog";
import { marked } from "marked";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  // Content comes from trusted local markdown files (content/blog/), not user input.
  // If user-generated content is ever added, sanitize with DOMPurify.
  const html = marked(post.content);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://moy-proforientolog.ru";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Светлана Жукова",
      jobTitle: "Профориентолог",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Светлана Жукова",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${slug}`,
    },
    image: `${siteUrl}/images/photo-hero.jpg`,
    inLanguage: "ru",
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navigation />

      <article style={{ paddingTop: 64 }}>
        {/* Header */}
        <div className="blog-post-header" style={{ background: "var(--green)", padding: "72px 52px 64px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <Link href="/blog" style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none", letterSpacing: "0.05em", display: "inline-block", marginBottom: 32 }}>
              ← Все статьи
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, flexWrap: "wrap" as const }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "var(--amber-2)", background: "rgba(255,255,255,0.1)", padding: "4px 12px" }}>
                {post.category}
              </span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{post.readTime}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                {new Date(post.date).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 400, lineHeight: 1.15, color: "var(--white)", marginBottom: 20 }}>
              {post.title}
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, maxWidth: 620 }}>{post.excerpt}</p>
          </div>
        </div>

        {/* Author */}
        <div className="blog-post-author" style={{ maxWidth: 800, margin: "0 auto", padding: "32px 52px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 32, borderBottom: "1px solid var(--border)" }}>
            <div style={{
              width: 48, height: 48,
              background: "var(--green-light)",
              border: "2px solid var(--amber)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 16, fontWeight: 500, color: "var(--green)",
            }}>СЖ</div>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 500, color: "var(--green)" }}>Светлана Жукова</p>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>Профориентолог · Кандидат социологических наук</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="blog-post-content" style={{ maxWidth: 800, margin: "0 auto", padding: "48px 52px" }}>
          <div className="prose-custom" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </article>

      {/* CTA */}
      <div className="blog-post-cta-wrap" style={{ maxWidth: 800, margin: "0 auto", padding: "0 52px 96px" }}>
        <div className="blog-post-cta" style={{ background: "var(--green)", padding: 52 }}>
          <p className="tag" style={{ color: "var(--amber-2)" }}>Следующий шаг</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 400, color: "var(--white)", marginBottom: 12, lineHeight: 1.2 }}>
            Хотите разобраться в своей ситуации?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>
            Запишитесь на консультацию или пройдите бесплатный квиз — Светлана заранее поймёт ваш запрос.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" as const, marginBottom: 40 }}>
            <Link href="/quiz/parents" className="btn-amber">Квиз для родителей →</Link>
            <Link href="/quiz/adults" style={{
              display: "inline-block",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "var(--white)",
              fontSize: 14, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" as const,
              padding: "18px 32px", textDecoration: "none",
            }}>Квиз для взрослых →</Link>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 36 }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>Или просто оставьте контакт — Светлана напишет сама</p>
            <ContactForm source="blog" dark />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
