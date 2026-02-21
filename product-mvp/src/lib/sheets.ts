import { google } from "googleapis";

export async function appendToSheet({
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
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!credentials || !spreadsheetId) return;

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credentials),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

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

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[now, name, contact, sourceLabel, answersStr, "новая"]],
    },
  });
}
