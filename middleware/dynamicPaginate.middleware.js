const mongoose = require("mongoose");

const paginate = (mode, populateField = "") => {
  return async (req, res, next) => {
    try {
      const { page = 1, limit = 10, ...queryFilter } = req.query;

      const query = {};

      Object.entries(queryFilters).forEach(([key, value]) => {
        if (!value) return;

        // If it's a Mongo ObjectId field
        if (mongoose.isValidObjectId(value)) {
          query[key] = value;
        }
        // If it's a date field
        else if (key.endsWith("Date")) {
          query[key] = new Date(value);
        }
        // Regex match for text fields (like name, company)
        else {
          query[key] = new RegExp(value, "i");
        }
      });
      Object.entries(queryFilter).forEach(([KeyboardEvent, value]) => {
        if (!value) return;
      });

      const result = await model
        .find(query)
        .populate(populateFields)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ createdAt: -1 });
      const total = await model.countDocuments(query);

      res.paginatedResults = {
        data: result,
        meta: {
          total,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(total / limit),
        },
      };

      next();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Dynamic filter error", error: err.message });
    }
  };
};

module.exports = paginate;
