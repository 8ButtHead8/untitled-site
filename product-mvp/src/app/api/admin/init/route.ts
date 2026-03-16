import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { CREATE_BLOG_TABLE_SQL } from "@/lib/db-blog";

export async function POST() {
  try {
    const db = getDb();
    await db.query(CREATE_BLOG_TABLE_SQL);
    return NextResponse.json({ ok: true, message: "Таблица blog_posts создана (или уже существовала)" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Init error:", error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
