import { Router } from "express";
import {
  createTechniqueLink,
  createTechniqueResource,
  listTechniqueLinks,
  listTechniqueResources,
} from "../controllers/techniqueKnowledgeController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_COACH, ROLE_STUDENT, requireRole } from "../middleware/roles.js";

const router = Router({ mergeParams: true });

router.get("/links", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH, ROLE_STUDENT]), listTechniqueLinks);
router.post("/links", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), createTechniqueLink);

router.get("/resources", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH, ROLE_STUDENT]), listTechniqueResources);
router.post("/resources", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), createTechniqueResource);

export default router;
