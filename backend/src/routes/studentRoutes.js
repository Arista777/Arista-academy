import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  listStudents,
  updateStudent,
  deactivateStudentController,
  getStudentProfileController,
} from "../controllers/studentController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.get("/", authRequired, listStudents);
router.post("/", authRequired, createStudent);
router.get("/:id", authRequired, getStudentProfileController);
router.patch("/:id", authRequired, updateStudent);
router.post("/:id/deactivate", authRequired, deactivateStudentController);
router.delete("/:id", authRequired, deleteStudent);

export default router;
