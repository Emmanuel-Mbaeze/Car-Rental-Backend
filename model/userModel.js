const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = new Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
    },
    isVerify: {
      type: Boolean,
    },
    OTP: {
      type: String,
    },
    mainOTP: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    verifiedToken: {
      type: String,
    },
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contents",
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("users", userModel);
