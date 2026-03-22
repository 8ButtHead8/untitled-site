import { getAllPostsAdmin, type DbPost } from "@/lib/db-blog";
import PostsTable from "./_components/PostsTable";
import InitDbButton from "./_components/InitDbButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = { title: "Статьи — Админка" };

export default async function AdminPostsPage() {
	let posts: DbPost[] = [];
	let dbError = false;

	try {
		posts = await getAllPostsAdmin();
	} catch {
		dbError = true;
		posts = [];
	}

	return (
		<div>
			<div
				style={{
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "space-between",
					marginBottom: 32,
					flexWrap: "wrap" as const,
					gap: 16,
				}}
			>
				<div>
					<h1
						style={{
							fontFamily: "'Cormorant Garamond', serif",
							fontSize: 36,
							color: "#2d5a4e",
							margin: 0,
							fontWeight: 400,
						}}
					>
						Статьи блога
					</h1>
					{!dbError && (
						<p style={{ fontSize: 14, color: "#999", marginTop: 4 }}>
							{posts.length === 0
								? "Статей нет — создайте первую"
								: declension(posts.length)}
						</p>
					)}
				</div>

				<Link
					href="/admin/posts/new"
					style={{
						display: "inline-block",
						background: "#2d5a4e",
						color: "white",
						padding: "12px 24px",
						textDecoration: "none",
						fontSize: 13,
						fontWeight: 700,
						letterSpacing: "0.07em",
						textTransform: "uppercase" as const,
					}}
				>
					+ Новая статья
				</Link>
			</div>

			{dbError ? (
				<div
					style={{
						background: "white",
						padding: 48,
						textAlign: "center" as const,
					}}
				>
					<p style={{ fontSize: 16, color: "#c0392b", marginBottom: 8 }}>
						Не удалось подключиться к базе данных
					</p>
					<p style={{ fontSize: 14, color: "#999", marginBottom: 28 }}>
						Нажмите кнопку ниже чтобы создать таблицы (нужно сделать один раз).
					</p>
					<InitDbButton />
				</div>
			) : posts.length === 0 ? (
				<div
					style={{
						background: "white",
						padding: 64,
						textAlign: "center" as const,
					}}
				>
					<p style={{ fontSize: 18, color: "#ccc", marginBottom: 20 }}>
						Статей пока нет
					</p>
					<Link
						href="/admin/posts/new"
						style={{
							display: "inline-block",
							background: "#2d5a4e",
							color: "white",
							padding: "12px 28px",
							textDecoration: "none",
							fontSize: 14,
							fontWeight: 700,
						}}
					>
						Создать первую статью
					</Link>
				</div>
			) : (
				<PostsTable posts={posts} />
			)}
		</div>
	);
}

function declension(n: number): string {
	const forms: [string, string, string] = ["статья", "статьи", "статей"];
	const cases = [2, 0, 1, 1, 1, 2];
	const idx = n % 100 > 4 && n % 100 < 20 ? 2 : cases[Math.min(n % 10, 5)];
	return `${n} ${forms[idx]}`;
}
