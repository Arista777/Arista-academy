import { Router } from "express";
import {
  createPayment,
  listPayments,
  listPaymentHistory,
  listMyPaymentHistory,
  listPendingPayments,
} from "../controllers/paymentController.js";
import { authRequired } from "../middleware/auth.js";
import { ROLE_ADMIN, ROLE_STUDENT, requireRole } from "../middleware/roles.js";

const router = Router();

router.post("/", authRequired, requireRole([ROLE_ADMIN]), createPayment);
router.get("/", authRequired, requireRole([ROLE_ADMIN]), listPayments);
router.get("/history/me", authRequired, requireRole([ROLE_ADMIN, ROLE_STUDENT]), listMyPaymentHistory);
router.get("/history/:studentId", authRequired, requireRole([ROLE_ADMIN]), listPaymentHistory);
router.get("/pending", authRequired, requireRole([ROLE_ADMIN]), listPendingPayments);

export default router;
