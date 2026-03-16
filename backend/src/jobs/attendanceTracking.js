import { pool } from "../models/db.js";

async function runAttendanceTracking() {
  const result = await pool.query(
    `SELECT COUNT(*)::int AS total, DATE(attended_at) AS day
     FROM attendance
     WHERE attended_at >= NOW() - INTERVAL '7 days'
     GROUP BY day
     ORDER BY day DESC`
  );

  console.log("[attendance-tracking] last 7 days", result.rows);
}

export { runAttendanceTracking };
