const Activity = require("../model/activity.model");

const logActivity = async ({ userId, action, targetType, targetId, details }) => {
  try {
    await Activity.create({ userId, action, targetType, targetId, details });
  } catch (err) {
    console.error("Failed to log activity:", err.message);
  }
};

module.exports = logActivity;
