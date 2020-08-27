const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const requestSchema = new mongoose.Schema({
  requestedBy: {
    type: ObjectId,
    ref: "User",
  },
  requestedTo: {
    type: ObjectId,
    ref: "User",
  },
  patientName: {
    type: String,
    required: true,
  },
  requestedBlood: {
    type: String,
    required: true,
  },
  urgent: {
    type: Boolean,
    default: false,
  },
});
const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
