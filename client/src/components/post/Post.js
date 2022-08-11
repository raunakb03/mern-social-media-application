import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                className="postProfileImg"
                alt=""
              />
            </Link>
              <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={post.img} className="postImg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src="./assets/like.png"
              className="likeIcon"
              alt=""
              onClick={likeHandler}
            />
            <img
              src="./assets/heart.png"
              className="likeIcon"
              alt=""
              onClick={likeHandler}
            />
            <span className="postLikeCounter">Liked by {like} people</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
