import { pool } from "./db.js";

async function listTechniqueResources(techniqueId) {
  const result = await pool.query(
    `SELECT * FROM technique_resources
     WHERE technique_id = $1
     ORDER BY created_at DESC`,
    [techniqueId]
  );
  return result.rows;
}

async function createTechniqueResource({ technique_id, resource_type, title, url, content }) {
  const result = await pool.query(
    `INSERT INTO technique_resources (technique_id, resource_type, title, url, content)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [technique_id, resource_type, title, url || null, content || null]
  );
  return result.rows[0];
}

export { listTechniqueResources, createTechniqueResource };
