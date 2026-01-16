import { FollowUp } from "../models/followUp.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE follow-up
export const createFollowUp = asyncHandler(async (req, res) => {
  const followUp = await FollowUp.create(req.body);
  return res.status(201).json(new ApiResponse(201, "Follow-up created successfully", followUp));
});

// GET follow-ups for a lead
export const getFollowUpsByLead = asyncHandler(async (req, res) => {
  const { leadId } = req.params;

  const followUps = await FollowUp.find({ leadId }).sort({ scheduledFor: 1 });

  return res.json(new ApiResponse(200, "Follow-ups fetched successfully", followUps));
});

// GET today's follow-ups
export const getTodaysFollowUps = asyncHandler(async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const followUps = await FollowUp.find({
    scheduledFor: { $gte: start, $lte: end },
    status: "pending"
  }).populate("leadId", "name phone");

  return res.json(new ApiResponse(200, "Today's follow-ups fetched successfully", followUps));
});

// MARK follow-up as completed
export const completeFollowUp = asyncHandler(async (req, res) => {
  const followUp = await FollowUp.findById(req.params.id);

  if (!followUp) {
    throw new ApiError("Follow-up not found", 404);
  }

  followUp.status = "completed";
  await followUp.save();

  return res.json(new ApiResponse(200, "Follow-up marked as completed", followUp));
});
