import { runAttendanceTracking } from "./attendanceTracking.js";
import { runInactivityAlerts } from "./inactivityAlerts.js";
import { runPaymentReminders } from "./paymentReminders.js";

async function runAllJobs() {
  await runPaymentReminders();
  await runInactivityAlerts();
  await runAttendanceTracking();
}

export { runAllJobs };
