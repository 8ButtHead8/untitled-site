// import { createHash } from "crypto";

/* export function computeToken(): string {
	const password = process.env.ADMIN_PASSWORD || "";
	const secret = process.env.ADMIN_SECRET || "default-secret";
	return createHash("sha256").update(password + ":" + secret).digest("hex");
} */

export async function computeToken(): Promise<string> {
	const password = process.env.ADMIN_PASSWORD || "";
	const secret = process.env.ADMIN_SECRET || "default-secret";

	const encoder = new TextEncoder();
	const encoded = encoder.encode(password + ":" + secret);

	const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

	return hashHex;
}
