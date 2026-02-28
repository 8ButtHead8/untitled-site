export async function appendToAirtable({
  name,
  contact,
  source,
  quizAnswers,
}: {
  name: string;
  contact: string;
  source: string;
  quizAnswers?: Record<string, string>;
}): Promise<void> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Заявки";

  if (!token || !baseId) return;

  const sourceLabel =
    source === "parents"
      ? "Для родителей"
      : source === "adults"
      ? "Для взрослых"
      : "Блог";

  const answersStr = quizAnswers
    ? Object.entries(quizAnswers)
        .map(([k, v]) => `${k}: ${v}`)
        .join(" | ")
    : "";

  const now = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
  });

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          "Дата": now,
          "Имя": name,
          "Контакт": contact,
          "Источник": sourceLabel,
          "Ответы": answersStr,
        },
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Airtable error: ${res.status} ${text}`);
  }
}
