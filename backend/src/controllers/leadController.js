import { Lead } from "../models/lead.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE lead
export const createLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create(req.body);
  return res.status(201).json(new ApiResponse(201, "Lead created successfully", lead));
});

// GET all leads
export const getLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  return res.json(new ApiResponse(200, "Leads fetched successfully", leads));
});

// GET single lead
export const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  
  if (!lead) {
    throw new ApiError("Lead not found", 404);
  }
  
  return res.json(new ApiResponse(200, "Lead fetched successfully", lead));
});

// UPDATE lead
export const updateLead = asyncHandler(async (req, res) => {
  const updatedLead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedLead) {
    throw new ApiError("Lead not found", 404);
  }

  return res.json(new ApiResponse(200, "Lead updated successfully", updatedLead));
});

// UPDATE lead status
export const updateLeadStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    throw new ApiError("Lead not found", 404);
  }

  lead.status = status;
  await lead.save();

  return res.json(new ApiResponse(200, "Lead status updated successfully", lead));
});

// DELETE lead
export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);

  if (!lead) {
    throw new ApiError("Lead not found", 404);
  }

  return res.json(new ApiResponse(200, "Lead deleted successfully", { id: req.params.id }));
});
