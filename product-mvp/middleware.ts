import { NextRequest, NextResponse } from "next/server";
import { computeToken } from "@/lib/auth";

export async function verifyAdminSession(request: NextRequest): Promise<boolean> {
	const sessionToken = request.cookies.get("admin_session")?.value;
	const expectedToken = await computeToken();

	return sessionToken === expectedToken;
}

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/api/admin") && !request.nextUrl.pathname.startsWith("/api/admin/login") ||
		request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login")) {

		if (!await verifyAdminSession(request)) {
			if (request.nextUrl.pathname.startsWith("/admin/")) {
				return NextResponse.redirect(new URL("/admin/login", request.url));
			} else if (request.nextUrl.pathname.startsWith("/api/admin/")) {
			}
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/api/admin/:path*", "/admin/:path*"]
};
