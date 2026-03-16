CREATE TABLE IF NOT EXISTS class_history (
  id SERIAL PRIMARY KEY,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  coach_id INTEGER REFERENCES coaches(id) ON DELETE SET NULL,
  class_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_class_history_class_id ON class_history(class_id);
