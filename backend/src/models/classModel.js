import { pool } from "./db.js";

async function listClasses() {
  const result = await pool.query(
    `SELECT c.*, co.name AS coach_name
     FROM classes c
     LEFT JOIN coaches co ON c.coach_id = co.id
     ORDER BY c.day_of_week, c.starts_at`
  );
  return result.rows;
}

async function createClass({ name, discipline, day_of_week, starts_at, ends_at, capacity, coach_id }) {
  const result = await pool.query(
    `INSERT INTO classes (name, discipline, day_of_week, starts_at, ends_at, capacity, coach_id, academy_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, NULL)
     RETURNING *`,
    [name, discipline, day_of_week, starts_at, ends_at, capacity || null, coach_id || null]
  );
  return result.rows[0];
}

async function updateClass(id, fields, values) {
  const query = `
    UPDATE classes
    SET ${fields.join(", ")}
    WHERE id = $${values.length + 1}
    RETURNING *
  `;

  const result = await pool.query(query, [...values, id]);
  return result;
}

async function getClassById(id) {
  const result = await pool.query(
    `SELECT c.*, co.name AS coach_name
     FROM classes c
     LEFT JOIN coaches co ON c.coach_id = co.id
     WHERE c.id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

export { listClasses, createClass, updateClass, getClassById };
