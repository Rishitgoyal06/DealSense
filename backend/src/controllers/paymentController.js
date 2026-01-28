import { PaymentSchedule } from "../models/paymentSchedule.model.js";
import { Lead } from "../models/lead.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE payment schedule
export const createPaymentSchedule = asyncHandler(async (req, res) => {
  const { leadId } = req.body;

  // Verify the lead belongs to the current user
  const lead = await Lead.findOne({ _id: leadId, userId: req.user });
  if (!lead) {
    throw new ApiError(404, 'Lead not found or unauthorized');
  }

  const payment = await PaymentSchedule.create(req.body);
  return res.status(201).json(new ApiResponse(201, "Payment schedule created successfully", payment));
});

// GET payments for a lead
export const getPaymentsByLead = asyncHandler(async (req, res) => {
  const { leadId } = req.params;

  // Verify the lead belongs to the current user
  const lead = await Lead.findOne({ _id: leadId, userId: req.user });
  if (!lead) {
    throw new ApiError(404, 'Lead not found or unauthorized');
  }

  const payments = await PaymentSchedule.find({ leadId }).sort({ nextDueDate: 1 });

  return res.json(new ApiResponse(200, "Payments fetched successfully", payments));
});

// UPDATE EMI payment (increment paid count)
export const recordEmiPayment = asyncHandler(async (req, res) => {
  const payment = await PaymentSchedule.findById(req.params.id).populate('leadId');

  if (!payment) {
    throw new ApiError(404, "Payment schedule not found");
  }

  // Verify the lead belongs to the current user
  if (payment.leadId.userId.toString() !== req.user.toString()) {
    throw new ApiError(403, "Unauthorized to update this payment");
  }

  payment.emisPaid += 1;

  // Move next due date forward (+1 month)
  const nextDate = new Date(payment.nextDueDate);
  nextDate.setMonth(nextDate.getMonth() + 1);
  payment.nextDueDate = nextDate;

  // Update status
  payment.status = "on-track";

  await payment.save();
  
  return res.json(new ApiResponse(200, "EMI payment recorded successfully", payment));
});

// GET risky payments (dashboard alert)
export const getRiskyPayments = asyncHandler(async (req, res) => {
  const today = new Date();

  // Get user's leads first
  const userLeads = await Lead.find({ userId: req.user }).select('_id');
  const leadIds = userLeads.map(lead => lead._id);

  const riskyPayments = await PaymentSchedule.find({
    leadId: { $in: leadIds },
    nextDueDate: { $lt: today },
    status: { $ne: "on-track" }
  }).populate("leadId", "name phone");

  return res.json(new ApiResponse(200, "Risky payments fetched successfully", riskyPayments));
});
