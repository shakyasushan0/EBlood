const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const authenticate = require("../authenticate");
const { query } = require("express");
const userRouter = express.Router();

userRouter.post("/signup", (req, res, next) => {
  const {
    fullName,
    age,
    email,
    password,
    location,
    bloodGroup,
    contact,
  } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      res.status(403).send(`User with email ${email} already exists!`);
    } else {
      bcrypt.hash(password, 12).then((hashedPassword) => {
        var user = new User({
          fullName,
          email,
          password: hashedPassword,
          age,
          location,
          bloodGroup,
          contact,
        });
        user
          .save()
          .then((user) => {
            res.status(200).send("Signup succesfull!");
          })
          .catch((err) =>
            res.json({ error: "Something went wrong please try again!!!" })
          );
      });
    }
  });
});

userRouter.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((matchedUser) => {
        const {
          _id,
          email,
          fullName,
          bloodGroup,
          location,
          age,
          contact,
        } = user;
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        if (matchedUser) {
          res.setHeader("Content-Type", "application/josn");
          res.statusCode = 200;
          res.json({
            messgae: "You are suceesfully logged in!!!",

            user: {
              _id,
              email,
              fullName,
              bloodGroup,
              location,
              age,
              contact,
              token,
            },
          });
        } else {
          res.status(403).json({ error: "Invalid email or password!!!" });
        }
      });
    } else {
      res.status(404).send(`User with email ${email} doesnot exists!!!`);
    }
  });
});
userRouter.get("/users", authenticate, (req, res, next) => {
  User.find({})
    .select("-password")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => res.json(err));
});
module.exports = userRouter;
