import { NextRequest, NextResponse } from "next/server";
import { computeToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { password } = body;

	const adminPassword = process.env.ADMIN_PASSWORD;
	if (!adminPassword || password !== adminPassword) {
		return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
	}

	const token = await computeToken();
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
