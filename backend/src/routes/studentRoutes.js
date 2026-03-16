import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  listStudents,
  updateStudent,
  deactivateStudentController,
  getStudentProfileController,
  getMyStudentProfile,
} from "../controllers/studentController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_STUDENT, requireRole } from "../middleware/roles.js";

const router = Router();

router.get("/", authRequired, requireRole([ROLE_ADMIN]), listStudents);
router.post("/", authRequired, requireRole([ROLE_ADMIN]), createStudent);
router.get("/me", authRequired, requireRole([ROLE_ADMIN, ROLE_STUDENT]), getMyStudentProfile);
router.get("/:id", authRequired, requireRole([ROLE_ADMIN]), getStudentProfileController);
router.patch("/:id", authRequired, requireRole([ROLE_ADMIN]), updateStudent);
router.post("/:id/deactivate", authRequired, requireRole([ROLE_ADMIN]), deactivateStudentController);
router.delete("/:id", authRequired, requireRole([ROLE_ADMIN]), deleteStudent);

export default router;
