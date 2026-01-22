import { Interaction } from "../models/interaction.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE interaction
export const createInteraction = asyncHandler(async (req, res) => {
  const interaction = await Interaction.create(req.body);
  return res.status(201).json(new ApiResponse(201, "Interaction created successfully", interaction));
});

// GET all interactions
export const getAllInteractions = asyncHandler(async (req, res) => {
  const interactions = await Interaction.find().populate("leadId", "name phone").sort({ createdAt: -1 });
  return res.json(new ApiResponse(200, "Interactions fetched successfully", interactions));
});

// GET interactions for a lead
export const getInteractionsByLead = asyncHandler(async (req, res) => {
  const { leadId } = req.params;
  const interactions = await Interaction.find({ leadId }).sort({ createdAt: -1 });
  return res.json(new ApiResponse(200, "Interactions fetched successfully", interactions));
});