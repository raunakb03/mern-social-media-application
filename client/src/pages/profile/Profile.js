import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from 'react-router'

function Profile() {

  const [user, setUser] = useState({});
  const params= useParams();
  const username= params.id;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

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
                src={
                  user.coverPicture ||
                  "https://tandsgo.com/wp-content/uploads/2020/02/Coffee-cup-with-beans-on-table-680x170.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h1 className="profileInfoName">{user.username}</h1>
              <h1 className="profileInfoDesc">{user.desc}</h1>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
