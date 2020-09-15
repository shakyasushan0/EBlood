const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const crypto = require("crypto");
const authenticate = require("../authenticate");
const { query } = require("express");
const nodemailer = require("nodemailer");
const sendgrid = require("nodemailer-sendgrid-transport");
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
          avatar,
        } = user;
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
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
              avatar,
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
userRouter.put("/edit", authenticate, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.json(err.message);
    });
});
userRouter.put("/changePassword", authenticate, (req, res, next) => {
  const { password, newPassword } = req.body;
  User.findById(req.user._id)
    .then((user) => {
      bcrypt
        .compare(password, user.password)
        .then((matchedUser) => {
          if (matchedUser) {
            bcrypt.hash(newPassword, 12).then((hashedPassword) => {
              User.findByIdAndUpdate(
                req.user._id,
                { $set: { password: hashedPassword } },
                { new: true }
              )
                .then((user) =>
                  res
                    .status(200)
                    .json({ message: "Password Succesfully Changed!!!" })
                )
                .catch((err) => res.send(err.message));
            });
          } else {
            res.status(403).json({ message: "Password did not matched" });
          }
        })
        .catch((err) => res.json(err.message));
    })
    .catch((err) => console.log(err));
});

userRouter.delete("/delete", authenticate, (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((matchedUser) => {
          if (matchedUser) {
            User.findByIdAndRemove(req.user._id)
              .then((usr) => {
                res.status(200).json({
                  message: "Your accout has been sucessfully deleted!",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(403).json(err.message);
              });
          } else {
            res.status(403).json({ message: "Password did not matched!" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(403).json(err.message);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json(err.message);
    });
});

userRouter.post("/reset-password", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        const token = crypto.randomBytes(32).toString("hex");
        const expiresIn = Date.now() + 3600000;
        user.token = token;
        user.expiresIn = expiresIn;
        user
          .save()
          .then((usr) => console.log(usr))
          .catch((err) => console.log(err));
        var options = {
          auth: {
            api_key: process.env.SENDGRID_API,
          },
        };
        var mailer = nodemailer.createTransport(sendgrid(options));
        var email = {
          to: req.body.email,
          from: "no-reply@getnada.com",
          subject: "Reset Password",
          html: `
          <h4>You requested to reset the password</h4>
          <p>Please click on this <a href="http://localhost:3000/reset-password/${token}/${expiresIn}">link</a> to reset your password</p>
          `,
        };
        mailer.sendMail(email);
        res
          .status(200)
          .json({
            message: "Reset Password link has been sent to " + user.email,
          });
      } else {
        res.status(422).json({ message: "Email is not registered" });
      }
    })
    .catch((err) => console.log(err));
});
module.exports = userRouter;
