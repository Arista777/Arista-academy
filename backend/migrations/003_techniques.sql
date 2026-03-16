CREATE TABLE IF NOT EXISTS techniques (
  id SERIAL PRIMARY KEY,
  academy_id INTEGER REFERENCES academies(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_techniques_academy_id ON techniques(academy_id);
