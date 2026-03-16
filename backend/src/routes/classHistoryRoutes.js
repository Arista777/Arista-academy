import { Router } from "express";
import { createClassHistory, listClassHistory } from "../controllers/classHistoryController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_COACH, requireRole } from "../middleware/roles.js";

const router = Router();

router.post("/", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), createClassHistory);
router.get("/classes/:classId", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), listClassHistory);

export default router;
