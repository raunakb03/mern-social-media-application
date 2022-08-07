const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// @Route    PUT api/users/:id
// @desc     update user
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;

  if (userId === id || req.user.isAdmin) {
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

//delete a user
// get a user
// follow a user
// unfollow a user

module.exports = router;
