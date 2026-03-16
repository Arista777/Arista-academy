import { Router } from "express";
import {
  attendanceStats,
  checkInController,
  classAttendanceHistory,
  myAttendanceHistory,
  studentAttendanceHistory,
} from "../controllers/attendanceController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_COACH, ROLE_STUDENT, requireRole } from "../middleware/roles.js";

const router = Router();

router.post("/check-in", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), checkInController);
router.get("/classes/:classId", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), classAttendanceHistory);
router.get("/students/:studentId", authRequired, requireRole([ROLE_ADMIN]), studentAttendanceHistory);
router.get("/me", authRequired, requireRole([ROLE_ADMIN, ROLE_STUDENT]), myAttendanceHistory);
router.get("/stats", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), attendanceStats);

export default router;
