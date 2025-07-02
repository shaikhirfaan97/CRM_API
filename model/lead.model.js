const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  source: String,
  status: { type: String, enum: ["New", "Contacted", "Qualified", "Lost"], default: "New" },
  company: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model("Lead", leadSchema);
