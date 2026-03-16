import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  listStudents,
  updateStudent,
} from "../controllers/studentController.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.get("/", authRequired, listStudents);
router.post("/", authRequired, createStudent);
router.patch("/:id", authRequired, updateStudent);
router.delete("/:id", authRequired, deleteStudent);

export default router;
