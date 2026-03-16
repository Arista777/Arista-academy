import { Router } from "express";
import { createBeltProgress, listBeltProgress } from "../controllers/beltProgressController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_COACH, requireRole } from "../middleware/roles.js";

const router = Router();

router.post("/", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), createBeltProgress);
router.get("/students/:studentId", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), listBeltProgress);

export default router;
