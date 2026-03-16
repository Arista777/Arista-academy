import { pool } from "../models/db.js";
import { sendNotification } from "./notifier.js";

async function runInactivityAlerts() {
  const result = await pool.query(
    `SELECT s.id AS student_id, s.name, MAX(a.attended_at) AS last_attended
     FROM students s
     LEFT JOIN attendance a ON a.student_id = s.id
     WHERE s.status <> 'inactive'
     GROUP BY s.id
     HAVING MAX(a.attended_at) IS NULL OR MAX(a.attended_at) < NOW() - INTERVAL '30 days'
     ORDER BY s.name`
  );

  for (const row of result.rows) {
    await sendNotification({
      channel: "alert",
      recipient: { student_id: row.student_id, name: row.name },
      subject: "Inactividad detectada",
      message: "Han pasado mas de 30 dias desde tu ultima asistencia. Te esperamos en el tatami.",
      metadata: { last_attended: row.last_attended },
    });
  }
}

export { runInactivityAlerts };
