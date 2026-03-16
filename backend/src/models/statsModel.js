import { pool } from "./db.js";

async function getActiveStudentsCount() {
  const result = await pool.query(
    "SELECT COUNT(*) FROM students WHERE status <> 'inactive'"
  );

  return result.rows[0];
}

async function getTotalIncome() {
  const result = await pool.query(
    "SELECT COALESCE(SUM(monthly_fee), 0) AS total FROM students WHERE status <> 'inactive'"
  );

  return result.rows[0];
}

async function getTotalExpenses(month) {
  const result = await pool.query(
    "SELECT COALESCE(SUM(amount), 0) AS total FROM expenses WHERE month = $1",
    [month]
  );

  return result.rows[0];
}

async function upsertMonthlyStats({ month, active_students, total_income, total_expenses, net_profit }) {
  const result = await pool.query(
    `INSERT INTO monthly_stats
     (month, active_students, total_income, total_expenses, net_profit)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (month) DO UPDATE
     SET active_students = EXCLUDED.active_students,
         total_income = EXCLUDED.total_income,
         total_expenses = EXCLUDED.total_expenses,
         net_profit = EXCLUDED.net_profit
     RETURNING *`,
    [month, active_students, total_income, total_expenses, net_profit]
  );

  return result.rows[0];
}

async function insertMonthlyStatsIfMissing({ month, active_students, total_income, total_expenses, net_profit }) {
  await pool.query(
    `INSERT INTO monthly_stats (month, active_students, total_income, total_expenses, net_profit)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (month) DO NOTHING`,
    [month, active_students, total_income, total_expenses, net_profit]
  );
}

export {
  getActiveStudentsCount,
  getTotalIncome,
  getTotalExpenses,
  upsertMonthlyStats,
  insertMonthlyStatsIfMissing,
};
