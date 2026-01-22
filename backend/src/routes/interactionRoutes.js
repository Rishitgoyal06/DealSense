import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createInteraction,
  getAllInteractions,
  getInteractionsByLead
} from "../controllers/interactionController.js";

const router = express.Router();

router.post("/", protect, createInteraction);
router.get("/", protect, getAllInteractions);
router.get("/lead/:leadId", protect, getInteractionsByLead);

export default router;