import { pool } from "./db.js";

async function createPayment({ student_id, membership_plan_id, amount, currency, status, billed_month, paid_at }) {
  const result = await pool.query(
    `INSERT INTO payments (student_id, membership_plan_id, amount, currency, status, billed_month, paid_at, academy_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, NULL)
     RETURNING *`,
    [
      student_id,
      membership_plan_id || null,
      amount,
      currency || "CRC",
      status || "paid",
      billed_month || null,
      paid_at || new Date(),
    ]
  );
  return result.rows[0];
}

async function listPaymentsByStudent(studentId) {
  const result = await pool.query(
    `SELECT p.*, mp.name AS membership_plan_name
     FROM payments p
     LEFT JOIN membership_plans mp ON p.membership_plan_id = mp.id
     WHERE p.student_id = $1
     ORDER BY p.paid_at DESC`,
    [studentId]
  );
  return result.rows;
}

async function listPayments(filter = {}) {
  const clauses = [];
  const values = [];
  let index = 1;

  if (filter.student_id) {
    clauses.push(`student_id = $${index++}`);
    values.push(filter.student_id);
  }

  if (filter.status) {
    clauses.push(`status = $${index++}`);
    values.push(filter.status);
  }

  if (filter.billed_month) {
    clauses.push(`billed_month = $${index++}`);
    values.push(filter.billed_month);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  const result = await pool.query(
    `SELECT p.*, mp.name AS membership_plan_name
     FROM payments p
     LEFT JOIN membership_plans mp ON p.membership_plan_id = mp.id
     ${where}
     ORDER BY p.paid_at DESC`,
    values
  );

  return result.rows;
}

async function listPendingPaymentsByMonth(month) {
  const result = await pool.query(
    `SELECT s.id AS student_id, s.name, s.status, s.monthly_fee, s.membership_plan_id,
            mp.name AS membership_plan_name
     FROM students s
     LEFT JOIN payments p
       ON p.student_id = s.id AND p.billed_month = $1 AND p.status = 'paid'
     LEFT JOIN membership_plans mp ON s.membership_plan_id = mp.id
     WHERE p.id IS NULL AND s.status <> 'inactive'
     ORDER BY s.name`,
    [month]
  );

  return result.rows;
}

export { createPayment, listPaymentsByStudent, listPayments, listPendingPaymentsByMonth };
