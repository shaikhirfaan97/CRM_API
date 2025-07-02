const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  name: String,
  stage: { type: String, enum: ["Qualification", "Proposal", "Negotiation", "Closed Won", "Closed Lost"], default: "Qualification" },
  amount: Number,
  currency: { type: String, default: "INR" },
  expectedCloseDate: Date,
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Opportunity", opportunitySchema);
