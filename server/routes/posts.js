const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

// @ Route   POST api/posts
// @ desc    create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
});

// @ Route   PUT api/posts/:id
// @ desc    update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({ msg: "the post has been updated" });
    } else {
      return res.status(404).json({ msg: "You can only update your post" });
    }
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
});

// @ Route   DELETE api/posts/:id
// @ desc    delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post does not exists" });
    }
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json({ msg: "the post has been deleted" });
    } else {
      return res.status(404).json({ msg: "You can only delete your post" });
    }
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
});

// @ Route   PUT api/posts/:id/like
// @ desc    like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json({ msg: "Post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json({ msg: "Post has been unliked" });
    }
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
});

// @ Route   GET api/posts/:id
// @ desc    get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
});

// @ Route   GET api/posts/timeline/:userId
// @ desc    get all post and friend's posts
router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    
    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// @ Route   GET api/posts/profile/:username
// @ desc    get user's all post 
router.get("/profile/:username", async (req, res) => {
  try {
    const user= await User.findOne({ username: req.params.username })
    const posts= await Post.find({ userId: user._id })
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

