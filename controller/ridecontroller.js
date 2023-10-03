const Ride = require("../model/rideModel");

const createRide = async (req, res) => {
  try {
    const rideData = {
      riderId: req.user.userId,
      ...req.body, // Spread the request body to capture all ride data
    };

    const newRide = new Ride(rideData);
    await newRide.save();

    res.status(201).json(newRide);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the ride." });
  }
};

module.exports = { createRide };

const FindRideHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    const rideHistory = await Ride.find({ riderId: userId })
      .populate({
        path: "riderId userId",
        select: "email fullname role", // Removed 'email' duplication
      })
      .exec();

    res.status(200).json({
      message: "Ride history fetched successfully",
      data: rideHistory,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

const cancelRide = async (req, res) => {
  const userId = req.user.userId;
  const rideId = req.params.rideId;

  try {
    const ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    if (ride.riderId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You're not authorized to cancel this ride" });
    }

    ride.status = "cancelled";
    await ride.save();

    res
      .status(200)
      .json({ message: "Ride cancelled successfully", data: ride });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while cancelling the ride" });
  }
};

const acceptRide = async (req, res) => {
  try {
    const rideId = req.params.rideId; // Get the Ride ID from the request params
    const { userId, role } = req.user.id; // get the user id(driver) and the role  of the in the JWT or session

    // Check if the user is a driver
    if (role !== "driver") {
      return res.status(403).json({ message: "Only drivers can accept rides" });
    }

    // Find the ride and update it
    const updatedRide = await Ride.findByIdAndUpdate(
      rideId,
      {
        userId: userId,
        status: "accepted",
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedRide) {
      return res.status(404).json({ message: "Ride not found" });
    }

    res.status(200).json({
      message: "Ride accepted successfully",
      data: updatedRide,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while accepting the ride" });
  }
};

module.exports = { createRide, FindRideHistory, cancelRide, acceptRide };
