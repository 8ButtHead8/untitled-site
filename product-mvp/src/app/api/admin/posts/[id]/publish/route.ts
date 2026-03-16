import { NextRequest, NextResponse } from "next/server";
import { publishPost, unpublishPost } from "@/lib/db-blog";
import { revalidatePath } from "next/cache";

interface Props {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const { action } = await request.json();

  const post =
    action === "unpublish"
      ? await unpublishPost(Number(id))
      : await publishPost(Number(id));

  if (!post) return NextResponse.json({ error: "Не найдено" }, { status: 404 });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);

  return NextResponse.json(post);
}
