import mongoose, { Schema } from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    requirement: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    leadType: {
      type: String,
      enum: ['buy', 'rent', 'sell', 'club'],
      default: 'buy',
    },
    budgetMin: Number,
    budgetMax: Number,
    preferredLocations: [String],
    status: {
      type: String,
      enum: ['active', 'negotiating', 'closed', 'dropped'],
      default: 'active',
    },
    readinessScore: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);
