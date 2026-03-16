"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/posts");
    } else {
      const data = await res.json();
      setError(data.error || "Ошибка входа");
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "var(--cream)",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <div
        style={{
          width: 400,
          background: "white",
          padding: 48,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 32,
            color: "var(--green)",
            marginBottom: 8,
            fontWeight: 400,
          }}
        >
          Блог — Админка
        </h1>
        <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 32 }}>
          Введите пароль для входа
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                color: "#555",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                border: "1px solid var(--border)",
                fontSize: 16,
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "'Nunito', sans-serif",
              }}
              required
              autoFocus
            />
          </div>

          {error && (
            <p style={{ fontSize: 13, color: "#c0392b", marginBottom: 16 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: "var(--green)",
              color: "white",
              border: "none",
              padding: "14px",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              cursor: loading ? "default" : "pointer",
              opacity: loading ? 0.7 : 1,
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {loading ? "Входим..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
