"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { DbPost } from "@/lib/db-blog";

const CATEGORIES = ["Для родителей", "Для взрослых", "Профориентация"];

const TRANSLIT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
  з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
  п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts",
  ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((ch) => TRANSLIT[ch] ?? ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

interface Props {
  post?: DbPost;
}

export default function PostEditor({ post }: Props) {
  const router = useRouter();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [category, setCategory] = useState(post?.category ?? "Для родителей");
  const [readTime, setReadTime] = useState(post?.readTime ?? "5 мин");
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription ?? "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!post);
  const [preview, setPreview] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManuallyEdited]);

  // Build preview HTML
  useEffect(() => {
    if (!preview) return;
    import("marked").then(({ marked }) => {
      Promise.resolve(marked(content)).then(setPreviewHtml);
    });
  }, [preview, content]);

  async function handleSave(publish: boolean) {
    if (!title.trim() || !slug.trim()) {
      setError("Заголовок и URL обязательны");
      return;
    }
    setSaving(true);
    setError("");

    try {
      const body = {
        slug: slug.trim(),
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        category,
        readTime: readTime.trim() || "5 мин",
        metaDescription: metaDescription.trim() || null,
      };

      let res: Response;
      if (isEdit) {
        res = await fetch(`/api/admin/posts/${post!.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/admin/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Ошибка сохранения");
        setSaving(false);
        return;
      }

      const savedPost = await res.json();

      // Publish if requested and not already published
      if (publish && !savedPost.published) {
        await fetch(`/api/admin/posts/${savedPost.id}/publish`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "publish" }),
        });
      }

      router.push("/admin/posts");
      router.refresh();
    } catch {
      setError("Ошибка соединения");
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <button
          onClick={() => router.push("/admin/posts")}
          style={{
            background: "none",
            border: "1px solid #ddd",
            fontSize: 18,
            cursor: "pointer",
            color: "#666",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 32,
            color: "#2d5a4e",
            margin: 0,
            fontWeight: 400,
          }}
        >
          {isEdit ? "Редактировать статью" : "Новая статья"}
        </h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Left: main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Title */}
          <Card>
            <Field label="Заголовок *">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Как помочь ребёнку выбрать профессию"
                style={inputStyle}
              />
            </Field>

            <div style={{ marginTop: 16 }}>
              <Field
                label="URL статьи (slug) *"
                hint="Генерируется из заголовка. Используйте только латинские буквы и дефисы."
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 13,
                      color: "#aaa",
                      padding: "10px 10px 10px 12px",
                      border: "1px solid #e5e0d8",
                      borderRight: "none",
                      background: "#fafaf8",
                      whiteSpace: "nowrap",
                    }}
                  >
                    /blog/
                  </span>
                  <input
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setSlugManuallyEdited(true);
                    }}
                    placeholder="kak-pomoch-rebenku"
                    style={{ ...inputStyle, flex: 1 }}
                  />
                </div>
              </Field>
            </div>
          </Card>

          {/* Excerpt */}
          <Card>
            <Field
              label="Краткое описание *"
              hint="2–3 предложения. Показывается в списке статей."
            >
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="О чём эта статья? Почему её стоит прочитать?"
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </Field>
          </Card>

          {/* Content */}
          <Card>
            <Field
              label="Текст статьи"
              hint="Пишите в формате Markdown: # Заголовок, ## Подзаголовок, **жирный**, *курсив*, - список"
            >
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  marginBottom: 12,
                  borderBottom: "1px solid #eee",
                }}
              >
                <TabBtn active={!preview} onClick={() => setPreview(false)}>
                  Редактор
                </TabBtn>
                <TabBtn active={preview} onClick={() => setPreview(true)}>
                  Превью
                </TabBtn>
              </div>

              {preview ? (
                <div
                  className="prose-custom"
                  style={{
                    background: "#fafaf8",
                    border: "1px solid #e5e0d8",
                    padding: "20px 24px",
                    minHeight: 400,
                    fontSize: 16,
                    lineHeight: 1.75,
                  }}
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              ) : (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={22}
                  placeholder={`# Введение\n\nНачните писать статью здесь...\n\n## Первый раздел\n\nТекст раздела.`}
                  style={{
                    ...inputStyle,
                    fontFamily: "monospace",
                    fontSize: 14,
                    lineHeight: 1.6,
                    resize: "vertical",
                  }}
                />
              )}
            </Field>
          </Card>
        </div>

        {/* Right: sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Actions */}
          <Card>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#aaa",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: "0 0 16px",
              }}
            >
              Публикация
            </p>

            {error && (
              <p
                style={{
                  fontSize: 13,
                  color: "#c0392b",
                  marginBottom: 12,
                  padding: "8px 12px",
                  background: "#fef5f5",
                }}
              >
                {error}
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={() => handleSave(false)}
                disabled={saving}
                style={{
                  ...fullBtn,
                  background: "white",
                  border: "1px solid #ddd",
                  color: "#555",
                }}
              >
                {saving ? "Сохраняем..." : "Сохранить черновик"}
              </button>

              <button
                onClick={() => handleSave(true)}
                disabled={saving}
                style={{
                  ...fullBtn,
                  background: "#2d5a4e",
                  color: "white",
                  border: "none",
                }}
              >
                {saving
                  ? "Сохраняем..."
                  : isEdit && post?.published
                  ? "Сохранить"
                  : "Опубликовать →"}
              </button>
            </div>

            {isEdit && (
              <p style={{ fontSize: 12, color: "#aaa", marginTop: 14 }}>
                Статус:{" "}
                <strong style={{ color: post?.published ? "#2d5a4e" : "#999" }}>
                  {post?.published ? "Опубликована" : "Черновик"}
                </strong>
              </p>
            )}
          </Card>

          {/* Meta */}
          <Card>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#aaa",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: "0 0 16px",
              }}
            >
              Настройки
            </p>

            <Field label="Категория">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={inputStyle}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>

            <div style={{ marginTop: 14 }}>
              <Field label="Время чтения">
                <input
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="5 мин"
                  style={inputStyle}
                />
              </Field>
            </div>
          </Card>

          {/* SEO */}
          <Card>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#aaa",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: "0 0 16px",
              }}
            >
              SEO
            </p>

            <Field
              label="Meta description"
              hint="До 160 символов. Это текст, который Google показывает в поиске. Если не заполнить — берётся краткое описание."
            >
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                maxLength={200}
                placeholder="Описание для Google..."
                style={{ ...inputStyle, resize: "none" }}
              />
              <p
                style={{
                  fontSize: 11,
                  color: metaDescription.length > 160 ? "#c0392b" : "#bbb",
                  marginTop: 4,
                  textAlign: "right",
                }}
              >
                {metaDescription.length}/160
              </p>
            </Field>

            {/* SERP preview */}
            <div
              style={{
                marginTop: 12,
                padding: 12,
                background: "#f8f7f4",
                fontSize: 12,
                borderLeft: "2px solid #e5e0d8",
              }}
            >
              <p
                style={{
                  color: "#1a0dab",
                  fontWeight: 600,
                  marginBottom: 2,
                  fontSize: 14,
                  lineHeight: 1.3,
                }}
              >
                {title || "Заголовок статьи"}
              </p>
              <p style={{ color: "#006621", marginBottom: 4, fontSize: 12 }}>
                moy-proforientolog.ru › blog › {slug || "slug"}
              </p>
              <p style={{ color: "#545454", lineHeight: 1.4 }}>
                {metaDescription || excerpt || "Описание статьи появится здесь..."}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "white", padding: 24 }}>{children}</div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 700,
          color: "#555",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {hint && (
        <p style={{ fontSize: 11, color: "#bbb", marginBottom: 8, lineHeight: 1.4 }}>
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        borderBottom: active ? "2px solid #2d5a4e" : "2px solid transparent",
        fontSize: 13,
        cursor: "pointer",
        padding: "6px 16px 8px",
        color: active ? "#2d5a4e" : "#999",
        fontWeight: active ? 700 : 400,
        fontFamily: "'Nunito', sans-serif",
        marginBottom: -1,
      }}
    >
      {children}
    </button>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e5e0d8",
  fontSize: 15,
  outline: "none",
  boxSizing: "border-box",
  background: "white",
  fontFamily: "'Nunito', sans-serif",
};

const fullBtn: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  cursor: "pointer",
  fontFamily: "'Nunito', sans-serif",
};
