import { Router } from "express";
import {
  classAttendance,
  classSummary,
  createClass,
  getClassController,
  listClasses,
  updateClass,
} from "../controllers/classController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_COACH, requireRole } from "../middleware/roles.js";

const router = Router();

router.get("/summary", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), classSummary);
router.get("/", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), listClasses);
router.post("/", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), createClass);
router.get("/:id", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), getClassController);
router.patch("/:id", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), updateClass);
router.get("/:id/attendance", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), classAttendance);

export default router;
