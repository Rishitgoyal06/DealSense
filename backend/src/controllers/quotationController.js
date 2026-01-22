import { Quotation } from "../models/quotation.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET all quotations
export const getAllQuotations = asyncHandler(async (req, res) => {
  const quotations = await Quotation.find().populate("leadId", "name phone").sort({ createdAt: -1 });
  return res.json(new ApiResponse(200, "Quotations fetched successfully", quotations));
});

// CREATE quotation
export const createQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.create(req.body);
  return res.status(201).json(new ApiResponse(201, "Quotation created successfully", quotation));
});

// GET quotations for a lead
export const getQuotationsByLead = asyncHandler(async (req, res) => {
  const { leadId } = req.params;

  const quotations = await Quotation.find({ leadId }).sort({ createdAt: -1 });

  return res.json(new ApiResponse(200, "Quotations fetched successfully", quotations));
});

// UPDATE customer response
export const updateQuotationResponse = asyncHandler(async (req, res) => {
  const { customerResponse } = req.body;

  const quotation = await Quotation.findById(req.params.id);

  if (!quotation) {
    throw new ApiError("Quotation not found", 404);
  }

  quotation.customerResponse = customerResponse;
  await quotation.save();

  return res.json(new ApiResponse(200, "Customer response updated successfully", quotation));
});

// MARK quotation as shared with customer
export const markQuotationShared = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);

  if (!quotation) {
    throw new ApiError("Quotation not found", 404);
  }

  quotation.sharedWithCustomer = true;
  await quotation.save();

  return res.json(new ApiResponse(200, "Quotation marked as shared", quotation));
});