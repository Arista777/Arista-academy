import { pool } from "./db.js";

async function addClassHistory({ class_id, coach_id, class_date, notes }) {
  const result = await pool.query(
    `INSERT INTO class_history (class_id, coach_id, class_date, notes)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [class_id, coach_id || null, class_date, notes || null]
  );
  return result.rows[0];
}

async function listClassHistory(classId) {
  const result = await pool.query(
    `SELECT ch.*, c.name AS class_name
     FROM class_history ch
     JOIN classes c ON ch.class_id = c.id
     WHERE ch.class_id = $1
     ORDER BY ch.class_date DESC`,
    [classId]
  );
  return result.rows;
}

export { addClassHistory, listClassHistory };
