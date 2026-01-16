import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createFollowUp,
  getFollowUpsByLead,
  getTodaysFollowUps,
  completeFollowUp
} from "../controllers/followUpController.js";

const router = express.Router();

router.post("/", protect, createFollowUp);
router.get("/lead/:leadId", protect, getFollowUpsByLead);
router.get("/today", protect, getTodaysFollowUps);
router.patch("/:id/complete", protect, completeFollowUp);

export default router;
