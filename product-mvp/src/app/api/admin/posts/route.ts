import { NextRequest, NextResponse } from "next/server";
import { getAllPostsAdmin, createPost } from "@/lib/db-blog";

export async function GET() {
  try {
    const posts = await getAllPostsAdmin();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Get posts error:", error);
    return NextResponse.json({ error: "Ошибка получения статей" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { slug, title, excerpt, content, category, readTime, metaDescription } = data;

    if (!slug || !title) {
      return NextResponse.json({ error: "slug и title обязательны" }, { status: 400 });
    }

    const post = await createPost({
      slug,
      title,
      excerpt: excerpt || "",
      content: content || "",
      category: category || "Для родителей",
      readTime: readTime || "5 мин",
      metaDescription: metaDescription || null,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error.message.includes("unique") || error.message.includes("duplicate"))
    ) {
      return NextResponse.json(
        { error: "Статья с таким slug уже существует" },
        { status: 409 }
      );
    }
    console.error("Create post error:", error);
    return NextResponse.json({ error: "Ошибка создания статьи" }, { status: 500 });
  }
}
