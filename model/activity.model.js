const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String, // e.g., "created", "updated", "deleted", "assigned"
  targetType: String, // e.g., "Lead", "Task", "Ticket"
  targetId: { type: mongoose.Schema.Types.ObjectId },
  details: String, // Optional message or description
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Activity", activitySchema);
