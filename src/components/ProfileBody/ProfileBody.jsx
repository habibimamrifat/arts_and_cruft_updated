import React from "react";
import ProfileLeftSide from "./ProfileLeftSide";
import ProfileRightSide from "./ProfileRightSide";
import ProfileMiddleBody from './ProfileMiddleBody';

const ProfileBody = () => {
  return (
    <div className="grid grid-cols-12 fixed top-44 overflow-hidden w-full mx-auto">
      <div className="h-96 border-2 border-blue-500 col-span-3  ">
        <ProfileLeftSide></ProfileLeftSide>
      </div>
      <div className="min-h-screen border-2 border-blue-500 col-span-6 overflow-hidden">
        <ProfileMiddleBody></ProfileMiddleBody>
      </div>
      <div className="h-96 border-2 border-blue-500 col-span-3">
        <ProfileRightSide></ProfileRightSide>
      </div>
     
    </div>
  );
};

export default ProfileBody;
