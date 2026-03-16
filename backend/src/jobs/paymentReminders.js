import { pool } from "../models/db.js";
import { sendNotification } from "./notifier.js";

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

async function runPaymentReminders() {
  const month = currentMonth();

  const result = await pool.query(
    `SELECT s.id AS student_id, s.name, s.monthly_fee
     FROM students s
     LEFT JOIN payments p
       ON p.student_id = s.id AND p.billed_month = $1 AND p.status = 'paid'
     WHERE p.id IS NULL AND s.status <> 'inactive'
     ORDER BY s.name`,
    [month]
  );

  for (const row of result.rows) {
    await sendNotification({
      channel: "reminder",
      recipient: { student_id: row.student_id, name: row.name },
      subject: "Pago pendiente",
      message: `Tu mensualidad del mes ${month} esta pendiente. Monto: CRC ${row.monthly_fee || 0}.`,
      metadata: { month },
    });
  }
}

export { runPaymentReminders };
