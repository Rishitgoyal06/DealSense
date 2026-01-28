import { FollowUp } from "../models/followUp.model.js";
import { Lead } from "../models/lead.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET all follow-ups
export const getAllFollowUps = asyncHandler(async (req, res) => {
  // Get user's leads first
  const userLeads = await Lead.find({ userId: req.user }).select('_id');
  const leadIds = userLeads.map(lead => lead._id);

  const followUps = await FollowUp.find({ leadId: { $in: leadIds } })
    .populate("leadId", "name phone")
    .sort({ scheduledFor: -1 });

  return res.json(new ApiResponse(200, "Follow-ups fetched successfully", followUps));
});

// CREATE follow-up
export const createFollowUp = asyncHandler(async (req, res) => {
  const { leadId } = req.body;

  // Verify the lead belongs to the current user
  const lead = await Lead.findOne({ _id: leadId, userId: req.user });
  if (!lead) {
    throw new ApiError(404, 'Lead not found or unauthorized');
  }

  const followUp = await FollowUp.create(req.body);
  return res.status(201).json(new ApiResponse(201, "Follow-up created successfully", followUp));
});

// GET follow-ups for a lead
export const getFollowUpsByLead = asyncHandler(async (req, res) => {
  const { leadId } = req.params;

  // Verify the lead belongs to the current user
  const lead = await Lead.findOne({ _id: leadId, userId: req.user });
  if (!lead) {
    throw new ApiError(404, 'Lead not found or unauthorized');
  }

  const followUps = await FollowUp.find({ leadId }).sort({ scheduledFor: 1 });

  return res.json(new ApiResponse(200, "Follow-ups fetched successfully", followUps));
});

// GET today's follow-ups
export const getTodaysFollowUps = asyncHandler(async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  // Get user's leads first
  const userLeads = await Lead.find({ userId: req.user }).select('_id');
  const leadIds = userLeads.map(lead => lead._id);

  const followUps = await FollowUp.find({
    leadId: { $in: leadIds },
    scheduledFor: { $gte: start, $lte: end },
    status: "pending"
  }).populate("leadId", "name phone");

  return res.json(new ApiResponse(200, "Today's follow-ups fetched successfully", followUps));
});

// MARK follow-up as completed
export const completeFollowUp = asyncHandler(async (req, res) => {
  const followUp = await FollowUp.findById(req.params.id).populate('leadId');

  if (!followUp) {
    throw new ApiError(404, "Follow-up not found");
  }

  // Verify the lead belongs to the current user
  if (followUp.leadId.userId.toString() !== req.user.toString()) {
    throw new ApiError(403, "Unauthorized to update this follow-up");
  }

  followUp.status = "completed";
  await followUp.save();

  return res.json(new ApiResponse(200, "Follow-up marked as completed", followUp));
});
