"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { DbPost } from "@/lib/db-blog";

interface Props {
  posts: DbPost[];
}

export default function PostsTable({ posts: initialPosts }: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState<number | null>(null);
  const router = useRouter();

  async function handlePublishToggle(post: DbPost) {
    setLoading(post.id);
    const action = post.published ? "unpublish" : "publish";
    const res = await fetch(`/api/admin/posts/${post.id}/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (res.ok) {
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)));
    }
    setLoading(null);
  }

  async function handleDelete(post: DbPost) {
    if (!confirm(`Удалить статью «${post.title}»?\n\nЭто действие нельзя отменить.`)) return;
    setLoading(post.id);
    const res = await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    }
    setLoading(null);
  }

  return (
    <div style={{ background: "white", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #eae8e3" }}>
            <th style={thStyle}>Заголовок</th>
            <th style={thStyle}>Категория</th>
            <th style={thStyle}>Статус</th>
            <th style={thStyle}>Дата</th>
            <th style={thStyle}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              style={{ borderBottom: "1px solid #f0ede7" }}
            >
              <td style={tdStyle}>
                <div>
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#2d5a4e",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </p>
                  <p style={{ fontSize: 11, color: "#bbb", margin: "3px 0 0" }}>
                    /blog/{post.slug}
                  </p>
                </div>
              </td>
              <td style={tdStyle}>
                <span style={{ fontSize: 13, color: "#666" }}>{post.category}</span>
              </td>
              <td style={tdStyle}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: post.published ? "#e8f4f0" : "#f5f5f5",
                    color: post.published ? "#2d5a4e" : "#999",
                  }}
                >
                  {post.published ? "Опубликована" : "Черновик"}
                </span>
              </td>
              <td style={tdStyle}>
                <span style={{ fontSize: 13, color: "#888" }}>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : new Date(post.createdAt).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                </span>
              </td>
              <td style={{ ...tdStyle, whiteSpace: "nowrap" as const }}>
                <button
                  onClick={() => router.push(`/admin/posts/${post.id}/edit`)}
                  style={actionBtn}
                  disabled={loading === post.id}
                >
                  Изменить
                </button>
                <button
                  onClick={() => handlePublishToggle(post)}
                  style={{
                    ...actionBtn,
                    color: post.published ? "#c0392b" : "#2d5a4e",
                    fontWeight: 600,
                  }}
                  disabled={loading === post.id}
                >
                  {loading === post.id
                    ? "..."
                    : post.published
                    ? "Снять"
                    : "Опубликовать"}
                </button>
                <button
                  onClick={() => handleDelete(post)}
                  style={{ ...actionBtn, color: "#c0392b" }}
                  disabled={loading === post.id}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "14px 20px",
  textAlign: "left",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#aaa",
  fontFamily: "'Nunito', sans-serif",
};

const tdStyle: React.CSSProperties = {
  padding: "18px 20px",
  verticalAlign: "middle",
};

const actionBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  fontSize: 13,
  color: "#555",
  cursor: "pointer",
  padding: "4px 8px",
  marginRight: 4,
  fontFamily: "'Nunito', sans-serif",
};
