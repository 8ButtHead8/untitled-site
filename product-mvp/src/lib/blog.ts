import { getAllPublishedPosts, getPublishedPostBySlug } from "./db-blog";

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
}

export interface PostWithContent extends Post {
  content: string;
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const posts = await getAllPublishedPosts();
    return posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      date: p.publishedAt ? p.publishedAt.split("T")[0] : p.createdAt.split("T")[0],
      excerpt: p.excerpt,
      category: p.category,
      readTime: p.readTime,
    }));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostWithContent | null> {
  try {
    const post = await getPublishedPostBySlug(slug);
    if (!post) return null;
    return {
      slug: post.slug,
      title: post.title,
      date: post.publishedAt ? post.publishedAt.split("T")[0] : post.createdAt.split("T")[0],
      excerpt: post.excerpt,
      category: post.category,
      readTime: post.readTime,
      content: post.content,
    };
  } catch {
    return null;
  }
}
