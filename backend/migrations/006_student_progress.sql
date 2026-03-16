CREATE TABLE IF NOT EXISTS student_progress (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  technique_id INTEGER NOT NULL REFERENCES techniques(id) ON DELETE CASCADE,
  progress_level TEXT NOT NULL DEFAULT 'learning',
  last_practiced_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, technique_id)
);

CREATE INDEX IF NOT EXISTS idx_student_progress_student_id ON student_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_technique_id ON student_progress(technique_id);
