import { pool } from "./db.js";

async function countActiveStudents() {
  const result = await pool.query(
    "SELECT COUNT(*) FROM students WHERE status <> 'inactive'"
  );
  return Number(result.rows[0].count || 0);
}

async function countActiveMemberships() {
  const result = await pool.query(
    "SELECT COUNT(*) FROM students WHERE status <> 'inactive' AND membership_plan_id IS NOT NULL"
  );
  return Number(result.rows[0].count || 0);
}

async function countPendingPayments() {
  const result = await pool.query(
    `SELECT COUNT(*)
     FROM payments
     WHERE LOWER(status) IN ('pending', 'overdue', 'pendiente', 'atrasado')`
  );
  return Number(result.rows[0].count || 0);
}

async function countAttendanceLastDays(days = 7) {
  const result = await pool.query(
    `SELECT COUNT(*)
     FROM attendance
     WHERE attended_at >= NOW() - ($1 || ' days')::interval`,
    [days]
  );
  return Number(result.rows[0].count || 0);
}

async function revenueByMonth(months = 6) {
  const result = await pool.query(
    `SELECT DATE_TRUNC('month', paid_at) AS month, COALESCE(SUM(amount), 0) AS total
     FROM payments
     WHERE paid_at >= NOW() - ($1 || ' months')::interval
     GROUP BY 1
     ORDER BY 1`,
    [months]
  );
  return result.rows;
}

async function attendanceByDiscipline(days = 7) {
  const result = await pool.query(
    `SELECT c.discipline, COUNT(*)
     FROM attendance a
     JOIN classes c ON a.class_id = c.id
     WHERE a.attended_at >= NOW() - ($1 || ' days')::interval
     GROUP BY c.discipline`,
    [days]
  );
  return result.rows;
}

async function getTodaySchedule(dayOfWeek) {
  const result = await pool.query(
    `SELECT c.name, c.starts_at, co.name AS coach_name
     FROM classes c
     LEFT JOIN coaches co ON c.coach_id = co.id
     WHERE c.day_of_week = $1
     ORDER BY c.starts_at`,
    [dayOfWeek]
  );
  return result.rows;
}

async function countInactiveStudents() {
  const result = await pool.query(
    "SELECT COUNT(*) FROM students WHERE status = 'inactive'"
  );
  return Number(result.rows[0].count || 0);
}

export {
  countActiveStudents,
  countActiveMemberships,
  countPendingPayments,
  countAttendanceLastDays,
  revenueByMonth,
  attendanceByDiscipline,
  getTodaySchedule,
  countInactiveStudents,
};
