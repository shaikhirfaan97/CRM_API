const leadService = require("../services/leadService");

exports.createLead = async (req, res) => {
  try {
    const body = {
      ...req.body,
      createdBy: req.user._id,
      assignedTo: req.body.assignedTo || req.user._id,
    };

    const lead = await leadService.addLead(body);
    res.status(201).json({ message: "Lead created", lead });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create lead", error: error.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      ...req.body,
      updatedBy: req.user._id,
    };

    const updatedLead = await leadService.updateLead(id, updates);

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead updated", lead: updatedLead });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update lead",
      error: error.message,
    });
  }
};

exports.deleteLead = async (req, res) => {
  const { id } = req.params;

  try {
    await leadService.deleteLead(id);
    res.status(200).json({ message: "Lead Deleted" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update lead",
      error: error.message,
    });
  }
};

exports.getAssignedLead = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await leadService.findLeadsByAssignedUser (id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update lead",
      error: error.message,
    });
  }
};
