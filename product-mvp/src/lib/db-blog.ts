import { getDb } from "./db";

export const CREATE_BLOG_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category VARCHAR(100) NOT NULL DEFAULT 'Для родителей',
  read_time VARCHAR(50) NOT NULL DEFAULT '5 мин',
  meta_description TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
`;

export interface DbPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  metaDescription: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToDbPost(row: any): DbPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content ?? "",
    category: row.category,
    readTime: row.read_time,
    metaDescription: row.meta_description,
    published: row.published,
    publishedAt: row.published_at ? new Date(row.published_at).toISOString() : null,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export async function getAllPublishedPosts(): Promise<DbPost[]> {
  const db = getDb();
  const result = await db.query(
    `SELECT id, slug, title, excerpt, category, read_time, meta_description, published, published_at, created_at
     FROM blog_posts
     WHERE published = true
     ORDER BY published_at DESC, created_at DESC`
  );
  return result.rows.map(rowToDbPost);
}

export async function getPublishedPostBySlug(slug: string): Promise<DbPost | null> {
  const db = getDb();
  const result = await db.query(
    `SELECT * FROM blog_posts WHERE slug = $1 AND published = true`,
    [slug]
  );
  if (result.rows.length === 0) return null;
  return rowToDbPost(result.rows[0]);
}

export async function getAllPostsAdmin(): Promise<DbPost[]> {
  const db = getDb();
  const result = await db.query(
    `SELECT id, slug, title, excerpt, category, read_time, meta_description, published, published_at, created_at
     FROM blog_posts
     ORDER BY created_at DESC`
  );
  return result.rows.map(rowToDbPost);
}

export async function getPostByIdAdmin(id: number): Promise<DbPost | null> {
  const db = getDb();
  const result = await db.query(
    `SELECT * FROM blog_posts WHERE id = $1`,
    [id]
  );
  if (result.rows.length === 0) return null;
  return rowToDbPost(result.rows[0]);
}

export async function createPost(data: {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  metaDescription?: string | null;
}): Promise<DbPost> {
  const db = getDb();
  const result = await db.query(
    `INSERT INTO blog_posts (slug, title, excerpt, content, category, read_time, meta_description)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [data.slug, data.title, data.excerpt, data.content, data.category, data.readTime, data.metaDescription ?? null]
  );
  return rowToDbPost(result.rows[0]);
}

export async function updatePost(
  id: number,
  data: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    readTime: string;
    metaDescription?: string | null;
  }
): Promise<DbPost | null> {
  const db = getDb();
  const result = await db.query(
    `UPDATE blog_posts
     SET slug = $2,
         title = $3,
         excerpt = $4,
         content = $5,
         category = $6,
         read_time = $7,
         meta_description = $8,
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id, data.slug, data.title, data.excerpt, data.content, data.category, data.readTime, data.metaDescription ?? null]
  );
  if (result.rows.length === 0) return null;
  return rowToDbPost(result.rows[0]);
}

export async function deletePost(id: number): Promise<boolean> {
  const db = getDb();
  const result = await db.query(`DELETE FROM blog_posts WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
}

export async function publishPost(id: number): Promise<DbPost | null> {
  const db = getDb();
  const result = await db.query(
    `UPDATE blog_posts
     SET published = true,
         published_at = COALESCE(published_at, NOW()),
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  if (result.rows.length === 0) return null;
  return rowToDbPost(result.rows[0]);
}

export async function unpublishPost(id: number): Promise<DbPost | null> {
  const db = getDb();
  const result = await db.query(
    `UPDATE blog_posts
     SET published = false,
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  if (result.rows.length === 0) return null;
  return rowToDbPost(result.rows[0]);
}
