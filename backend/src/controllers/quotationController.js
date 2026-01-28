import { Quotation } from "../models/quotation.model.js";
import { Lead } from "../models/lead.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET all quotations
export const getAllQuotations = asyncHandler(async (req, res) => {
  // Get user's leads first
  const userLeads = await Lead.find({ userId: req.user }).select('_id');
  const leadIds = userLeads.map(lead => lead._id);

  const quotations = await Quotation.find({ leadId: { $in: leadIds } })
    .populate("leadId", "name phone")
    .sort({ createdAt: -1 });

  return res.json(new ApiResponse(200, "Quotations fetched successfully", quotations));
});

// CREATE quotation
export const createQuotation = asyncHandler(async (req, res) => {
  const { leadId } = req.body;

  // Verify the lead belongs to the current user
  const lead = await Lead.findOne({ _id: leadId, userId: req.user });
  if (!lead) {
    throw new ApiError(404, 'Lead not found or unauthorized');
  }

  const quotation = await Quotation.create(req.body);
  return res.status(201).json(new ApiResponse(201, "Quotation created successfully", quotation));
});

// GET quotations for a lead
export const getQuotationsByLead = asyncHandler(async (req, res) => {
  const { leadId } = req.params;

  // Verify the lead belongs to the current user
  const lead = await Lead.findOne({ _id: leadId, userId: req.user });
  if (!lead) {
    throw new ApiError(404, 'Lead not found or unauthorized');
  }

  const quotations = await Quotation.find({ leadId }).sort({ createdAt: -1 });

  return res.json(new ApiResponse(200, "Quotations fetched successfully", quotations));
});

// UPDATE customer response
export const updateQuotationResponse = asyncHandler(async (req, res) => {
  const { customerResponse } = req.body;

  const quotation = await Quotation.findById(req.params.id).populate('leadId');

  if (!quotation) {
    throw new ApiError(404, "Quotation not found");
  }

  // Verify the lead belongs to the current user
  if (quotation.leadId.userId.toString() !== req.user.toString()) {
    throw new ApiError(403, "Unauthorized to update this quotation");
  }

  quotation.customerResponse = customerResponse;
  await quotation.save();

  return res.json(new ApiResponse(200, "Customer response updated successfully", quotation));
});

// MARK quotation as shared with customer
export const markQuotationShared = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id).populate('leadId');

  if (!quotation) {
    throw new ApiError(404, "Quotation not found");
  }

  // Verify the lead belongs to the current user
  if (quotation.leadId.userId.toString() !== req.user.toString()) {
    throw new ApiError(403, "Unauthorized to update this quotation");
  }

  quotation.sharedWithCustomer = true;
  await quotation.save();

  return res.json(new ApiResponse(200, "Quotation marked as shared", quotation));
});