import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createQuotation,
  getQuotationsByLead,
  updateQuotationResponse,
  markQuotationShared
} from "../controllers/quotationController.js";

const router = express.Router();

router.post("/", protect, createQuotation);
router.get("/lead/:leadId", protect, getQuotationsByLead);
router.patch("/:id/response", protect, updateQuotationResponse);
router.patch("/:id/shared", protect, markQuotationShared);

export default router;
