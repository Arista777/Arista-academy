import { Router } from "express";
import { createExpense, listExpenses } from "../controllers/expenseController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, requireRole } from "../middleware/roles.js";

const router = Router();

router.post("/", authRequired, requireRole([ROLE_ADMIN]), createExpense);
router.get("/:month", authRequired, requireRole([ROLE_ADMIN]), listExpenses);

export default router;
