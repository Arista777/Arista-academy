import { pool } from "./db.js";

async function upsertStudentProgress({ student_id, technique_id, progress_level, last_practiced_at, notes }) {
  const result = await pool.query(
    `INSERT INTO student_progress (student_id, technique_id, progress_level, last_practiced_at, notes)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (student_id, technique_id)
     DO UPDATE SET
       progress_level = EXCLUDED.progress_level,
       last_practiced_at = EXCLUDED.last_practiced_at,
       notes = EXCLUDED.notes
     RETURNING *`,
    [
      student_id,
      technique_id,
      progress_level || "learning",
      last_practiced_at || null,
      notes || null,
    ]
  );
  return result.rows[0];
}

async function listStudentProgress(studentId) {
  const result = await pool.query(
    `SELECT sp.*, t.name AS technique_name, t.category
     FROM student_progress sp
     JOIN techniques t ON sp.technique_id = t.id
     WHERE sp.student_id = $1
     ORDER BY t.category, t.name`,
    [studentId]
  );
  return result.rows;
}

export { upsertStudentProgress, listStudentProgress };
