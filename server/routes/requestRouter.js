const Request = require("../models/request");
const express = require("express");
const authenticate = require("../authenticate");
const requestRouter = express.Router();

requestRouter
  .route("/")
  .post(authenticate, (req, res, next) => {
    const { patientName, urgent, requestedTo, requestedBlood } = req.body;
    var request = new Request({
      patientName,
      urgent,
      requestedBy: req.user._id,
      requestedTo,
      requestedBlood,
    });
    request
      .save()
      .then((req) => {
        res.status(200).json({ message: "request sent sucesfully" });
      })
      .catch((err) => res.json(err));
  })
  .get(authenticate, (req, res, next) => {
    Request.find({})
      .populate("requestedBy")
      .populate("requestedTo")
      .then((req) => {
        res.status(200).json(req);
      })
      .catch((err) => res.json(err));
  });
module.exports = requestRouter;
