const express = require("express");

const router = express.Router();

const gravatar = require("gravatar");

const bcrypt = require("bcryptjs");

const keys = require("../../config/keys");

const jwt = require("jsonwebtoken");

const passport = require("passport");

// Load User model
const User = require("../../models/User");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "Profile works" });
});

// @route GET api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm", // Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
          if (error) throw error;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((error) => console.log(error));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc Login User / Returning JWT Token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User Matched

        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (error, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );

        // res.json({ msg: "Success" });
      } else {
        errors.password = "Password incorrect";
        res.status(400).json(errors);
      }
    });
  });
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
    console.log(req.user);
  }
);

module.exports = router;
