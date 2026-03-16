import { Router } from "express";
import { createExpense, listExpenses } from "../controllers/expenseController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.post("/", authRequired, createExpense);
router.get("/:month", authRequired, listExpenses);

export default router;
