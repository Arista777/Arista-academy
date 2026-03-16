import { pool } from "./db.js";

async function createExpense({ description, amount, month }) {
  const result = await pool.query(
    `INSERT INTO expenses (description, amount, month)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [description, amount, month]
  );

  return result.rows[0];
}

async function listExpensesByMonth(month) {
  const result = await pool.query(
    "SELECT * FROM expenses WHERE month = $1 ORDER BY created_at DESC",
    [month]
  );

  return result.rows;
}

export { createExpense, listExpensesByMonth };
