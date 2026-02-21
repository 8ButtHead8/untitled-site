import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db";
import { sendTelegramNotification } from "@/lib/telegram";
import { appendToSheet } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contact, source, quizAnswers } = body;

    if (!name?.trim() || !contact?.trim() || !source) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to DB (if DATABASE_URL is set)
    if (process.env.DATABASE_URL) {
      await saveSubmission({ name, contact, source, quizAnswers });
    }

    // Send Telegram notification (non-blocking)
    sendTelegramNotification({ name, contact, source, quizAnswers }).catch(
      (e) => console.error("Telegram error:", e)
    );

    // Append to Google Sheets (non-blocking)
    appendToSheet({ name, contact, source, quizAnswers }).catch((e) =>
      console.error("Sheets error:", e)
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
