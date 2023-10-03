const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const {
      email,
      role,
      password,
      fullname,
      drivingLicense,
      carModel,
      vehicleInfo,
      number,
    } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const salt = await bcrypt.genSalt(10); // 10 is the number of rounds
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      role,
      fullname,
      drivingLicense,
      carModel,
      vehicleInfo,
      number,
      password: hashedPassword,
      photo: req.file ? req.file.path : null,
    });

    await user.save();

    const responseObject = {
      message: "User created successfully",
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      number: user.number,
      photo: user.photo,
    };

    if (role === "driver") {
      responseObject.drivingLicense = user.drivingLicense;
      responseObject.carModel = user.carModel;
    }

    res.status(201).json(responseObject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user doesn't exist, send a 400 status
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare the hashed password with the one in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If the password doesn't match, send a 400 status
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token (Access token)
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_ACCESS_SERCET,
      {
        expiresIn: "7d", // Token expires in 1 hour
      }
    );

    // Store this refresh token in your database if needed

    // Send both tokens in the response
    res.status(200).json({ accessToken, email: user.email, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser };
