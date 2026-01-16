import { PaymentSchedule } from "../models/paymentSchedule.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE payment schedule
export const createPaymentSchedule = asyncHandler(async (req, res) => {
  const payment = await PaymentSchedule.create(req.body);
  return res.status(201).json(new ApiResponse(201, "Payment schedule created successfully", payment));
});

// GET payments for a lead
export const getPaymentsByLead = asyncHandler(async (req, res) => {
  const { leadId } = req.params;

  const payments = await PaymentSchedule.find({ leadId }).sort({ nextDueDate: 1 });

  return res.json(new ApiResponse(200, "Payments fetched successfully", payments));
});

// UPDATE EMI payment (increment paid count)
export const recordEmiPayment = asyncHandler(async (req, res) => {
  const payment = await PaymentSchedule.findById(req.params.id);

  if (!payment) {
    throw new ApiError("Payment schedule not found", 404);
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

  const riskyPayments = await PaymentSchedule.find({
    nextDueDate: { $lt: today },
    status: { $ne: "on-track" }
  }).populate("leadId", "name phone");

  return res.json(new ApiResponse(200, "Risky payments fetched successfully", riskyPayments));
});
