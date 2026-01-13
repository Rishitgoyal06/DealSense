import mongoose, { Schema } from 'mongoose';

const paymentScheduleSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    totalAmount: Number,
    emiAmount: Number,
    totalEmis: Number,
    emisPaid: {
      type: Number,
      default: 0,
    },
    nextDueDate: Date,
    status: {
      type: String,
      enum: ['on-track', 'delayed', 'critical'],
      default: 'on-track',
    },
  },
  { timestamps: true }
);

export const PaymentSchedule = mongoose.model(
  'PaymentSchedule',
  paymentScheduleSchema
);
