CREATE TABLE IF NOT EXISTS technique_links (
  id SERIAL PRIMARY KEY,
  technique_id INTEGER NOT NULL REFERENCES techniques(id) ON DELETE CASCADE,
  related_technique_id INTEGER NOT NULL REFERENCES techniques(id) ON DELETE CASCADE,
  relation_type TEXT NOT NULL DEFAULT 'related',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (technique_id, related_technique_id, relation_type)
);

CREATE TABLE IF NOT EXISTS technique_resources (
  id SERIAL PRIMARY KEY,
  technique_id INTEGER NOT NULL REFERENCES techniques(id) ON DELETE CASCADE,
  resource_type TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT,
  content TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_technique_links_technique_id ON technique_links(technique_id);
CREATE INDEX IF NOT EXISTS idx_technique_links_related_id ON technique_links(related_technique_id);
CREATE INDEX IF NOT EXISTS idx_technique_resources_technique_id ON technique_resources(technique_id);
