export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        fontFamily: "'Nunito', sans-serif",
        background: "#f5f4f0",
        minHeight: "100vh",
      }}
    >
      <nav
        style={{
          background: "var(--green)",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 32,
            height: 56,
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 22,
              color: "white",
              fontWeight: 400,
            }}
          >
            Блог
          </span>
          <a
            href="/admin/posts"
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
            }}
          >
            Статьи
          </a>
          <a
            href="/blog"
            target="_blank"
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
            }}
          >
            Открыть блог ↗
          </a>
          <div style={{ flex: 1 }} />
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.65)",
                background: "none",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "6px 16px",
                cursor: "pointer",
                fontFamily: "'Nunito', sans-serif",
              }}
            >
              Выйти
            </button>
          </form>
        </div>
      </nav>
      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
