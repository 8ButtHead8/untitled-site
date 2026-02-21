-- Run this on your VPS PostgreSQL to create the database schema
-- Connect: psql -U postgres

-- Create database and user
CREATE USER svetlana WITH PASSWORD 'your_password_here';
CREATE DATABASE svetlana_mvp OWNER svetlana;

\c svetlana_mvp

-- Main submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(255) NOT NULL,
  source VARCHAR(100) NOT NULL,      -- 'parents', 'adults', 'blog'
  quiz_answers JSONB,                -- all quiz Q&A as JSON
  status VARCHAR(50) DEFAULT 'new',  -- 'new', 'contacted', 'converted', 'closed'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for sorting by date
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);

-- Sample seed data to verify setup
INSERT INTO submissions (name, contact, source, quiz_answers, status) VALUES
  (
    'Тестовая заявка',
    'test@example.com',
    'parents',
    '{"grade": "10 класс", "interests": "Да, есть конкретные интересы", "urgency": "Есть 1–2 года в запасе"}',
    'new'
  );

SELECT 'Schema created successfully!' as result;
