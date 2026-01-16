import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  updateLeadStatus,
  deleteLead
} from "../controllers/leadController.js";

const router = express.Router();

router.post("/", protect, createLead);
router.get("/", protect, getLeads);
router.get("/:id", protect, getLeadById);
router.put("/:id", protect, updateLead);
router.patch("/:id/status", protect, updateLeadStatus);
router.delete("/:id", protect, deleteLead);

export default router;
