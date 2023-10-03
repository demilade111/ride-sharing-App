const express = require("express");
const { authorizeRoles } = require("../Middlewear/authMiddlewear");
const {
  FindRideHistory,
  createRide,
  cancelRide,
  acceptRide,
} = require("../controller/ridecontroller");

const router = express.Router();

router.post("/request", authorizeRoles("rider"), createRide);
router.get("/history", authorizeRoles("rider"), FindRideHistory);
router.patch("/:rideId/cancel", authorizeRoles("rider"), cancelRide);
router.patch("/:rideId/accept", authorizeRoles("driver"), acceptRide);

module.exports = router;
