import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

function computeToken(): string {
  const password = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_SECRET || "default-secret";
  return createHash("sha256").update(password + ":" + secret).digest("hex");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
  }

  const token = computeToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 дней
    path: "/",
  });
  return response;
}
