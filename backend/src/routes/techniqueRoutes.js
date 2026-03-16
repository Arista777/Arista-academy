import { Router } from "express";
import { createTechnique, listTechniques } from "../controllers/techniqueController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_COACH, ROLE_STUDENT, requireRole } from "../middleware/roles.js";
import techniqueKnowledgeRoutes from "./techniqueKnowledgeRoutes.js";

const router = Router();

router.get("/", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH, ROLE_STUDENT]), listTechniques);
router.post("/", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), createTechnique);
router.use("/:id", techniqueKnowledgeRoutes);

export default router;
