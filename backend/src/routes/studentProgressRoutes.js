import { Router } from "express";
import { listMyStudentProgress, listStudentProgress, upsertStudentProgress } from "../controllers/studentProgressController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_COACH, ROLE_STUDENT, requireRole } from "../middleware/roles.js";

const router = Router();

router.post("/", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), upsertStudentProgress);
router.get("/students/:studentId", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), listStudentProgress);
router.get("/me", authRequired, requireRole([ROLE_ADMIN, ROLE_STUDENT]), listMyStudentProgress);

export default router;
