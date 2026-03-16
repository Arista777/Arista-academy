import { addExpense, getExpensesByMonth } from "../services/expenseService.js";

async function createExpense(req, res) {
  const { description, amount, month } = req.body;

  try {
    const expense = await addExpense({ description, amount, month });
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create expense" });
  }
}

async function listExpenses(req, res) {
  const { month } = req.params;

  try {
    const expenses = await getExpensesByMonth(month);
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
}

export { createExpense, listExpenses };
