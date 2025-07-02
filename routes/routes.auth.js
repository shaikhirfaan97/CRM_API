const express = require("express");
const router = express.Router();
const rateLimitMiddleware = require("../middleware/rateLimit.middleware");
const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const checkRole = require("../middleware/checkRole.middleware");

router.post("/signup", rateLimitMiddleware, authController.signUp);
router.post("/login", rateLimitMiddleware, authController.login);
router.post("/refresh-token", rateLimitMiddleware,authMiddleware, authController.refreshToken);

module.exports = router;
