CREATE TABLE IF NOT EXISTS belt_progress (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  belt TEXT NOT NULL,
  stripe INTEGER NOT NULL DEFAULT 0,
  promotion_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_belt_progress_student_id ON belt_progress(student_id);
