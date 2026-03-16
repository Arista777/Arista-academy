import { Router } from "express";
import { listMembershipPlans } from "../controllers/membershipController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_COACH, requireRole } from "../middleware/roles.js";

const router = Router();

router.get("/", authRequired, requireRole([ROLE_ADMIN, ROLE_COACH]), listMembershipPlans);

export default router;
