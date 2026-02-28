export default function Footer() {
  return (
    <footer className="footer-bar" style={{
      background: "var(--dark)",
      padding: "56px 52px",
    }}>
      <div style={{
        maxWidth: 1080,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap" as const,
        gap: 16,
      }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
          © 2026 · Светлана Жукова · Профориентолог · Онлайн по всей России
        </p>
        <a
          href="https://t.me/rabotaizhizn24"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
        >
          Telegram @rabotaizhizn24
        </a>
      </div>
    </footer>
  );
}
