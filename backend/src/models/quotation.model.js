import mongoose, { Schema } from 'mongoose';

const quotationSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
    },
    brokerName: {
      type: String,
      required: true,
    },
    propertySummary: String,
    quotedPrice: {
      type: Number,
      required: true,
    },
    sharedWithCustomer: {
      type: Boolean,
      default: false,
    },
    customerResponse: {
      type: String,
      enum: ['interested', 'no_response', 'rejected'],
      default: 'no_response',
    },
  },
  { timestamps: true }
);

export const Quotation = mongoose.model('Quotation', quotationSchema);
