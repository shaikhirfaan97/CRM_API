const Activity = require("../model/activity.model");

const logActivity = async ({ userId, role, action, targetType, targetId, details }) => {
  try {
    if (role === "admin") return;

    await Activity.create({ userId, action, targetType, targetId, details });
  } catch (err) {
    console.error("Failed to log activity:", err.message);
  }
};

module.exports = logActivity;
