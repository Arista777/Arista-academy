import { createExpense, listExpensesByMonth } from "../models/expenseModel.js";
import { toNumber } from "../utils/numbers.js";

async function addExpense({ description, amount, month }) {
  return createExpense({ description, amount: toNumber(amount), month });
}

async function getExpensesByMonth(month) {
  return listExpensesByMonth(month);
}

export { addExpense, getExpensesByMonth };
