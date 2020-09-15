const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    location: {
      latitude: {
        type: Number,
        default: null,
      },
      longitude: {
        type: Number,
        default: null,
      },
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    contact: {
      type: String,
      required: true,
    },
    token: String,
    expiresIn: Date,
  },
  { timestamps: true }
);
const Users = mongoose.model("User", userSchema);
module.exports = Users;
