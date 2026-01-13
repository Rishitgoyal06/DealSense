import mongoose, { Schema } from 'mongoose';

const interactionSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
    },
    type: {
      type: String,
      enum: ['call', 'visit', 'note'],
      required: true,
    },
    summary: String,
  },
  { timestamps: true }
);

export const Interaction = mongoose.model('Interaction', interactionSchema);
