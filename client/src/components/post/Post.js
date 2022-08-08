import React from "react";
import "./post.css";
import { MoreVert } from "@mui/icons-material";

function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src="./assets/person/1.jpeg"
              className="postProfileImg"
              alt=""
            />
            <span className="postUsername">Safak Kocaglu</span>
            <span className="postDate">5 mins ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Hey! This is my first post :)</span>
          <img src="./assets/post/1.jpeg" className="postImg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="./assets/like.png" className="likeIcon" alt="" />
            <img src="./assets/heart.png" className="likeIcon" alt="" />
            <span className="postLikeCounter">Liked by 32 people</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
