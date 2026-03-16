import { toNumber } from "../utils/numbers.js";
import {
  getActiveStudentsCount,
  getTotalExpenses,
  getTotalIncome,
  insertMonthlyStatsIfMissing,
  upsertMonthlyStats,
} from "../models/statsModel.js";

async function getMonthSummary(month) {
  const activeStudents = await getActiveStudentsCount();
  const income = await getTotalIncome();
  const expenses = await getTotalExpenses(month);

  const totalIncome = toNumber(income.total);
  const totalExpenses = toNumber(expenses.total);
  const active = toNumber(activeStudents.count);

  return {
    active_students: active,
    total_income: totalIncome,
    total_expenses: totalExpenses,
    net_profit: totalIncome - totalExpenses,
  };
}

async function closeMonth(month) {
  const data = await getMonthSummary(month);
  const record = await upsertMonthlyStats({ month, ...data });
  return { data, record };
}

async function generateMonthlyStats(month) {
  const data = await getMonthSummary(month);
  await insertMonthlyStatsIfMissing({ month, ...data });
  return { month, ...data };
}

export { getMonthSummary, closeMonth, generateMonthlyStats };
