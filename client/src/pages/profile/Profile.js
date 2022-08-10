import React from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="./assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="./assets/person/7.jpeg"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h1 className="profileInfoName">Safak Kocaoglu</h1>
              <h1 className="profileInfoDesc">Hello my friends</h1>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
