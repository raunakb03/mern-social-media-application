const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// @Route    PUT api/users/:id
// @desc     update user
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;

  if (userId === id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status(500).json({ msg: "server error" });
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({ msg: "Account has been updated" });
    } catch (error) {
      return res.status(500).json({ msg: "server error" });
    }
  } else {
    return res.status(403).json({ msg: "Account cannot be updated" });
  }
});

// @Route    DELETE api/users/:id
// @desc     delete user
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;

  if (userId === id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete({ _id: id });
      res.status(200).json({ msg: "Account has been deleted successfully" });
    } catch (error) {
      return res.status(500).json({ msg: "server error" });
    }
  } else {
    return res.status(403).json({ msg: "Account cannot be deleted" });
  }
});

// @Route    GET api/users/:id
// @desc     get user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
});

// @Route    PUT api/users/:id/follow
// @desc     follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json({ msg: "User has been followed" });
      } else {
        res.status(403).json({ msg: "You already follow the user" });
      }
    } catch (error) {
      res.status(500).json({ msg: "server error" });
    }
  } else {
    res.status(403).json({ msg: "Can't follow yourself" });
  }
});

// @Route    PUT api/users/:id/unfollow
// @desc     unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json({ msg: "User has been unfollowed" });
      } else {
        res.status(403).json({ msg: "You don't follow this user" });
      }
    } catch (error) {
      res.status(500).json({ msg: "server error" });
    }
  } else {
    res.status(403).json({ msg: "Can't unfollow yourself" });
  }
});

module.exports = router;
