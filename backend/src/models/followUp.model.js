import mongoose, {Schema} from "mongoose";

const followUpSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lead",
    required: true
  },
  scheduledFor: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  },
  note: String
}, { timestamps: true });

export const FollowUp = mongoose.model("FollowUp", followUpSchema);