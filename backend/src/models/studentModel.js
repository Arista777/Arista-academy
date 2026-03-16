import { pool } from "./db.js";

async function listStudents() {
  const result = await pool.query("SELECT * FROM students ORDER BY id");
  return result.rows;
}

async function createStudent({
  name,
  belt,
  age,
  monthly_fee,
  payment_date,
  status,
}) {
  const result = await pool.query(
    `INSERT INTO students (name, belt, age, monthly_fee, payment_date, status)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [name, belt, age, monthly_fee, payment_date, status]
  );

  return result.rows[0];
}

async function deleteStudent(id) {
  const result = await pool.query("DELETE FROM students WHERE id = $1", [id]);
  return result.rowCount;
}

async function updateStudent(id, fields, values) {
  const query = `
    UPDATE students
    SET ${fields.join(", ")}
    WHERE id = $${values.length + 1}
    RETURNING *
  `;

  const result = await pool.query(query, [...values, id]);
  return result;
}

export { listStudents, createStudent, deleteStudent, updateStudent };
