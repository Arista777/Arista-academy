import {
  attendanceByDiscipline,
  countActiveMemberships,
  countActiveStudents,
  countAttendanceLastDays,
  countInactiveStudents,
  countPendingPayments,
  getTodaySchedule,
  revenueByMonth,
} from "../models/dashboardModel.js";

function formatMonth(date) {
  return new Intl.DateTimeFormat("es-ES", { month: "short" }).format(date).replace(".", "");
}

function formatTime(timeValue) {
  if (!timeValue) return "";
  const [hours, minutes] = String(timeValue).split(":");
  const hourNumber = Number(hours);
  const suffix = hourNumber >= 12 ? "PM" : "AM";
  const hour12 = ((hourNumber + 11) % 12) + 1;
  return `${hour12}:${minutes} ${suffix}`;
}

function getDayOfWeek(date = new Date()) {
  return date.getDay();
}

function getMonthBuckets(months = 6) {
  const buckets = [];
  const now = new Date();
  for (let i = months - 1; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ key: date.toISOString().slice(0, 7), label: formatMonth(date) });
  }
  return buckets;
}

async function getDashboardSummary() {
  const [
    activeStudents,
    activeMemberships,
    pendingPayments,
    attendanceWeek,
    inactiveStudents,
    revenueRows,
    attendanceRows,
    scheduleRows,
  ] = await Promise.all([
    countActiveStudents(),
    countActiveMemberships(),
    countPendingPayments(),
    countAttendanceLastDays(7),
    countInactiveStudents(),
    revenueByMonth(6),
    attendanceByDiscipline(7),
    getTodaySchedule(getDayOfWeek()),
  ]);

  const buckets = getMonthBuckets(6);
  const revenueMap = new Map(
    revenueRows.map((row) => [row.month.toISOString().slice(0, 7), Number(row.total)])
  );

  const revenue = buckets.map((bucket) => ({
    month: bucket.label,
    value: revenueMap.get(bucket.key) || 0,
  }));

  const attendance = attendanceRows.map((row) => ({
    label: row.discipline,
    value: Number(row.count),
  }));

  const schedule = scheduleRows.map((row) => ({
    time: formatTime(row.starts_at),
    name: row.name,
    coach: row.coach_name || "Sin coach",
  }));

  const alerts = [];
  if (pendingPayments > 0) {
    alerts.push(`${pendingPayments} pagos pendientes`);
  }
  if (inactiveStudents > 0) {
    alerts.push(`${inactiveStudents} estudiantes inactivos`);
  }
  if (schedule.length === 0) {
    alerts.push("No hay clases programadas hoy");
  }

  return {
    stats: [
      { label: "Estudiantes activos", value: activeStudents },
      { label: "Membresias activas", value: activeMemberships },
      { label: "Pagos pendientes", value: pendingPayments },
      { label: "Asistencias semana", value: attendanceWeek },
    ],
    revenue,
    alerts,
    schedule,
    attendance: attendance.length ? attendance : [
      { label: "BJJ", value: 0 },
      { label: "Muay Thai", value: 0 },
    ],
  };
}

export { getDashboardSummary };
