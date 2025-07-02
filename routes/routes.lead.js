const express = require("express");
const router = express.Router();
const rateLimitMiddleware = require("../middleware/rateLimit.middleware");
const leadController = require("../controller/lead.controller");
const authMiddleware = require("../middleware/auth.middleware");
const checkRole = require("../middleware/checkRole.middleware");

router.post(
  "/",
  authMiddleware,
  rateLimitMiddleware,
   checkRole(["admin","sales"]),
  leadController.createLead
);
router.put(
  "/:id",
  authMiddleware,
  rateLimitMiddleware,
   checkRole(["admin","sales"]),
  leadController.updateLead
);
router.delete(
  "/:id",
  authMiddleware,
  rateLimitMiddleware,
   checkRole(["admin"]),
  leadController.deleteLead
);
router.get(
  "/:id",
  authMiddleware,
  rateLimitMiddleware,
   checkRole(["admin"]),
  leadController.getAssignedLead
);

module.exports = router;
