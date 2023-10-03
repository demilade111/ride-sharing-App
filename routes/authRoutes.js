const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");
const upload = require("../config/uploadconfig");

const router = express.Router();

router.post("/register", upload.single("photo"), registerUser);
router.post("/login", loginUser);

module.exports = router;
