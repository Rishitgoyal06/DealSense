import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createFollowUp,
  getAllFollowUps,
  getFollowUpsByLead,
  getTodaysFollowUps,
  completeFollowUp
} from "../controllers/followUpController.js";

const router = express.Router();

router.post("/", protect, createFollowUp);
router.get("/", protect, getAllFollowUps);
router.get("/lead/:leadId", protect, getFollowUpsByLead);
router.get("/today", protect, getTodaysFollowUps);
router.patch("/:id/complete", protect, completeFollowUp);

export default router;
