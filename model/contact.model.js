const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  position: String,
  company: String,
  address: String,
  sourceLeadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" }
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);
