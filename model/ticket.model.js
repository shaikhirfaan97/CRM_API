const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  subject: String,
  description: String,
  status: { type: String, enum: ["Open", "In Progress", "Resolved", "Closed"], default: "Open" },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);
