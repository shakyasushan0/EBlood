const mongoose = require("mongoose");
const User = require("./models/users");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "you must be logged in!!!" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.json(err);
    } else {
      const { _id } = payload;
      User.findById(_id)
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => next(err));
    }
  });
};
