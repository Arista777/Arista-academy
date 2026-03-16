import { pool } from "./db.js";

async function createAttendance({ class_id, student_id, attended_at, status }) {
  const result = await pool.query(
    `INSERT INTO attendance (class_id, student_id, attended_at, status)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [class_id, student_id, attended_at || new Date(), status || "present"]
  );
  return result.rows[0];
}

async function listAttendanceByClass(classId) {
  const result = await pool.query(
    `SELECT a.*, s.name AS student_name
     FROM attendance a
     JOIN students s ON a.student_id = s.id
     WHERE a.class_id = $1
     ORDER BY a.attended_at DESC`,
    [classId]
  );
  return result.rows;
}

async function listAttendanceByStudent(studentId) {
  const result = await pool.query(
    `SELECT a.*, c.name AS class_name, c.discipline
     FROM attendance a
     JOIN classes c ON a.class_id = c.id
     WHERE a.student_id = $1
     ORDER BY a.attended_at DESC`,
    [studentId]
  );
  return result.rows;
}

async function getAttendanceStats({ classId, studentId }) {
  if (classId) {
    const result = await pool.query(
      `SELECT COUNT(*) AS total
       FROM attendance
       WHERE class_id = $1`,
      [classId]
    );
    return { total: result.rows[0].total };
  }

  if (studentId) {
    const result = await pool.query(
      `SELECT COUNT(*) AS total
       FROM attendance
       WHERE student_id = $1`,
      [studentId]
    );
    return { total: result.rows[0].total };
  }

  const result = await pool.query("SELECT COUNT(*) AS total FROM attendance");
  return { total: result.rows[0].total };
}

export { createAttendance, listAttendanceByClass, listAttendanceByStudent, getAttendanceStats };
