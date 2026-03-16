import { Router } from "express";
import {
  closeMonthController,
  generateStats,
  getDashboard,
} from "../controllers/dashboardController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.get("/dashboard/:month", authRequired, getDashboard);
router.post("/close-month/:month", authRequired, closeMonthController);
router.post("/stats/generate", authRequired, generateStats);

export default router;
