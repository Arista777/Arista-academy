import { pool } from "./db.js";

async function addBeltProgress({ student_id, belt, stripe, promotion_date }) {
  const result = await pool.query(
    `INSERT INTO belt_progress (student_id, belt, stripe, promotion_date)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [student_id, belt, stripe || 0, promotion_date]
  );
  return result.rows[0];
}

async function listBeltProgress(studentId) {
  const result = await pool.query(
    `SELECT * FROM belt_progress
     WHERE student_id = $1
     ORDER BY promotion_date DESC`,
    [studentId]
  );
  return result.rows;
}

export { addBeltProgress, listBeltProgress };
