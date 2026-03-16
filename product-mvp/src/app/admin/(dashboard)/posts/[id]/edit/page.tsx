import { notFound } from "next/navigation";
import { getPostByIdAdmin } from "@/lib/db-blog";
import PostEditor from "../../_components/PostEditor";

export const metadata = { title: "Редактировать статью — Админка" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostByIdAdmin(Number(id));
  if (!post) notFound();
  return <PostEditor post={post} />;
}
