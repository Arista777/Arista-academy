import { pool } from "./db.js";

async function listTechniques() {
  const result = await pool.query(
    "SELECT * FROM techniques ORDER BY category, name"
  );
  return result.rows;
}

async function createTechnique({ name, category, description }) {
  const result = await pool.query(
    `INSERT INTO techniques (name, category, description, academy_id)
     VALUES ($1, $2, $3, NULL)
     RETURNING *`,
    [name, category, description || null]
  );
  return result.rows[0];
}

export { listTechniques, createTechnique };
