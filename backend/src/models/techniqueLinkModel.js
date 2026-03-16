import { pool } from "./db.js";

async function listTechniqueLinks(techniqueId) {
  const result = await pool.query(
    `SELECT tl.*, t.name AS related_name, t.category AS related_category
     FROM technique_links tl
     JOIN techniques t ON tl.related_technique_id = t.id
     WHERE tl.technique_id = $1
     ORDER BY tl.relation_type, t.name`,
    [techniqueId]
  );
  return result.rows;
}

async function createTechniqueLink({ technique_id, related_technique_id, relation_type }) {
  const result = await pool.query(
    `INSERT INTO technique_links (technique_id, related_technique_id, relation_type)
     VALUES ($1, $2, $3)
     ON CONFLICT (technique_id, related_technique_id, relation_type) DO NOTHING
     RETURNING *`,
    [technique_id, related_technique_id, relation_type || "related"]
  );
  return result.rows[0] || null;
}

export { listTechniqueLinks, createTechniqueLink };
