const Lead = require("../model/lead.model");

exports.addLead = async (data) => {
  const lead = await Lead.create(data);
  return lead;
};

exports.updateLead = async (id, updates) => {
  const data = await Lead.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return data;
};

exports.deleteLead = async (id) => {
  const deleted = await Lead.findByIdAndDelete(id);
  return deleted;
};

exports.findLeadsByAssignedUser = async (id) => {
  const data = await Lead.find({ assignedTo: id }).populate(
    "createdBy assignedTo"
  );
  return data;
};
