import { NextRequest, NextResponse } from "next/server";

async function computeToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD || "";
  const secret = process.env.ADMIN_SECRET || "default-secret";
  const data = password + ":" + secret;
  const msgBuffer = new TextEncoder().encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // These paths are always public
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get("admin_session");
  const expectedToken = await computeToken();

  if (!cookie || cookie.value !== expectedToken) {
    if (pathname.startsWith("/api/admin/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
