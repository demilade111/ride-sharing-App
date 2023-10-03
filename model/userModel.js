const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    number: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 15,
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: ["driver", "rider"],
      required: true,
    },
    drivingLicense: {
      type: String,
      required: function () {
        return this.role === "driver";
      },
      minlength: 8,
      maxlength: 15,
    },
    carModel: {
      type: String,
      required: function () {
        return this.role === "driver";
      },
      minlength: 2,
      maxlength: 50,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("User", UserSchema);
