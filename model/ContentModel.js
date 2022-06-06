const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const COntent = new Schema(
  {
    name: {
      type: String,
    },
    model: {
      type: String,
    },
    power: {
      type: String,
    },
    mph: {
      type: String,
    },
    speed: {
      type: String,
    },
    passengers: {
      type: String,
    },
    doors: {
      type: String,
    },
    air: {
      type: String,
    },
    gear: {
      type: String,
    },
    mileage: {
      type: String,
    },
    currency: {
      type: String,
    },
    fuel: {
      type: String,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    like: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "likes",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("contents", COntent);
