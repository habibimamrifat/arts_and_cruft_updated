import React, { useContext } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import { Outlet } from "react-router-dom";
import ProfileBody from "../ProfileBody/ProfileBody";


const Profile = () => {


  return (
    <div className="">
        <ProfileHeader></ProfileHeader>
        <Outlet></Outlet>
    </div>
  );
};

export default Profile;
