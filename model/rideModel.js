const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema(
  {
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sourceLocation: {
      type: { type: String, enum: ["Point"] },
      coordinates: [Number],
    },
    destinationLocation: {
      type: { type: String, enum: ["Point"] },
      coordinates: [Number],
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "completed", "cancelled"],
      default: "requested",
    },
    fare: {
      type: Number,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", RideSchema);
