import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createPaymentSchedule,
  getPaymentsByLead,
  recordEmiPayment,
  getRiskyPayments
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", protect, createPaymentSchedule);
router.get("/lead/:leadId", protect, getPaymentsByLead);
router.patch("/:id/pay", protect, recordEmiPayment);
router.get("/risky", protect, getRiskyPayments);

export default router;