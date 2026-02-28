import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "@/lib/db";
import { sendTelegramNotification } from "@/lib/telegram";
import { appendToAirtable } from "@/lib/airtable";
import { isRateLimited } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, contact, source, quizAnswers } = body;

    const ALLOWED_SOURCES = ["parents", "adults", "blog"];

    if (!name?.trim() || !contact?.trim() || !source) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!ALLOWED_SOURCES.includes(source)) {
      return NextResponse.json(
        { error: "Invalid source" },
        { status: 400 }
      );
    }

    if (name.length > 200 || contact.length > 200) {
      return NextResponse.json(
        { error: "Input too long" },
        { status: 400 }
      );
    }

    // Save to DB (if DATABASE_URL is set)
    if (process.env.DATABASE_URL) {
      await saveSubmission({ name, contact, source, quizAnswers });
    }

    // Send Telegram + Airtable in parallel, await both
    const results = await Promise.allSettled([
      sendTelegramNotification({ name, contact, source, quizAnswers }),
      appendToAirtable({ name, contact, source, quizAnswers }),
    ]);

    for (const r of results) {
      if (r.status === "rejected") {
        console.error("Integration error:", r.reason);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
