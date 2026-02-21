import { Pool } from "pg";

let pool: Pool | null = null;

export function getDb(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
}

export async function saveSubmission({
  name,
  contact,
  source,
  quizAnswers,
}: {
  name: string;
  contact: string;
  source: string;
  quizAnswers?: Record<string, string>;
}): Promise<void> {
  const db = getDb();
  await db.query(
    `INSERT INTO submissions (name, contact, source, quiz_answers)
     VALUES ($1, $2, $3, $4)`,
    [name, contact, source, quizAnswers ? JSON.stringify(quizAnswers) : null]
  );
}

export const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL,
  source VARCHAR(100) NOT NULL,
  quiz_answers JSONB,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);
`;
