import { Router } from "express";
import { listStudentProgress, upsertStudentProgress } from "../controllers/studentProgressController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_COACH, requireRole } from "../middleware/roles.js";

const router = Router();

router.post("/", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), upsertStudentProgress);
router.get("/students/:studentId", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), listStudentProgress);

export default router;
