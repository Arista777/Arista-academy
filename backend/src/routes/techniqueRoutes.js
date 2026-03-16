import { Router } from "express";
import { createTechnique, listTechniques } from "../controllers/techniqueController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_COACH, requireRole } from "../middleware/roles.js";

const router = Router();

router.get("/", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), listTechniques);
router.post("/", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), createTechnique);

export default router;
