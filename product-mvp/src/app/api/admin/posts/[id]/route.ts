import { NextRequest, NextResponse } from "next/server";
import { getPostByIdAdmin, updatePost, deletePost } from "@/lib/db-blog";
import { revalidatePath } from "next/cache";

interface Props {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: Props) {
  const { id } = await params;
  const post = await getPostByIdAdmin(Number(id));
  if (!post) return NextResponse.json({ error: "Не найдено" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const data = await request.json();

  try {
    const post = await updatePost(Number(id), {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || "",
      content: data.content || "",
      category: data.category || "Для родителей",
      readTime: data.readTime || "5 мин",
      metaDescription: data.metaDescription || null,
    });

    if (!post) return NextResponse.json({ error: "Не найдено" }, { status: 404 });

    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json(post);
  } catch (error) {
    console.error("Update post error:", error);
    return NextResponse.json({ error: "Ошибка обновления" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Props) {
  const { id } = await params;

  const post = await getPostByIdAdmin(Number(id));
  const ok = await deletePost(Number(id));
  if (!ok) return NextResponse.json({ error: "Не найдено" }, { status: 404 });

  if (post) {
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
  }

  return NextResponse.json({ ok: true });
}
