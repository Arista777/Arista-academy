import { Router } from "express";
import {
  closeMonthController,
  generateStats,
  getDashboard,
} from "../controllers/dashboardController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, requireRole } from "../middleware/roles.js";

const router = Router();

router.get("/dashboard/:month", authRequired, requireRole([ROLE_ADMIN]), getDashboard);
router.post("/close-month/:month", authRequired, requireRole([ROLE_ADMIN]), closeMonthController);
router.post("/stats/generate", authRequired, requireRole([ROLE_ADMIN]), generateStats);

export default router;
