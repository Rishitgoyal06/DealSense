import { Lead } from "../models/lead.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE lead
export const createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create({
    ...req.body,
    userId: req.user,
  });

  res.status(201).json(new ApiResponse(201, "Lead created", lead));
});

// GET all leads
export const getLeads = asyncHandler(async (req, res) => {
  console.log("USER FROM TOKEN:", req.user);
  const leads = await Lead.find({ userId: req.user }).sort({ createdAt: -1 });

  res.json(new ApiResponse(200, "Leads fetched", leads));
});


// GET single lead
export const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findOne({
    _id: req.params.id,
    userId: req.user,
  });

  if (!lead) throw new ApiError(404, "Lead not found");

  res.json(new ApiResponse(200, "Lead fetched", lead));
});


// UPDATE lead
export const updateLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findOneAndUpdate(
    { _id: req.params.id, userId: req.user },
    req.body,
    { new: true }
  );

  if (!lead) throw new ApiError(404, "Unauthorized or lead not found");

  res.json(new ApiResponse(200, "Lead updated", lead));
});


// UPDATE lead status
export const updateLeadStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const lead = await Lead.findOne({
    _id: req.params.id,
    userId: req.user
  });

  if (!lead) {
    throw new ApiError(404, "Lead not found or unauthorized");
  }

  lead.status = status;
  await lead.save();

  return res.json(new ApiResponse(200, "Lead status updated successfully", lead));
});

// DELETE lead
export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findOneAndDelete({
    _id: req.params.id,
    userId: req.user
  });

  if (!lead) {
    throw new ApiError(404, "Lead not found or unauthorized");
  }

  return res.json(new ApiResponse(200, "Lead deleted successfully", { id: req.params.id }));
});
