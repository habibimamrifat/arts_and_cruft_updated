import React, { useContext } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import { Outlet } from "react-router-dom";



const Profile = () => {

  return (
    <div className="">
        <ProfileHeader></ProfileHeader>
        <Outlet></Outlet>
    </div>
  );
};

export default Profile;
