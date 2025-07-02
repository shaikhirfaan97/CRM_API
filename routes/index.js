const express = require("express");
const router = express.Router();

const leadRoutes = require("./routes.lead");
const authRoutes = require("./routes.auth");

router.use("/leads", leadRoutes);
router.use("/auth", authRoutes);

module.exports = router;
