const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

// @route   GET api/auth/register
// @desc    register user
router.post(
  "/register",
  [
    check("username", "Please include a valid username").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;

      const user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "server error" });
    }
  }
);

// @route   GET api/auth/login
// @desc    login user
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.status(404).json({ msg: "User Not Found" });

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword)
        return res.status(404).json({ msg: "Invalid Credentials" });

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "server error" });
    }
  }
);

module.exports = router;
