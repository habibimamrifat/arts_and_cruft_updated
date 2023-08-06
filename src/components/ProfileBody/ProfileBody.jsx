import React from "react";
import ProfileLeftSide from "./ProfileLeftSide";
import ProfileRightSide from "./ProfileRightSide";
import ProfileMiddleBody from './ProfileMiddleBody';

const ProfileBody = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="h-96 border-2 border-blue-500 col-span-3 sticky top-[30%] md:sticky md:top-[35%] ">
        <ProfileLeftSide></ProfileLeftSide>
      </div>
      <div className="min-h-screen border-2 border-blue-500 col-span-6">
        <ProfileMiddleBody></ProfileMiddleBody>
      </div>
      <div className="h-96 border-2 border-blue-500 col-span-3 sticky top-[30%] md:top-[35%]">
        <ProfileRightSide></ProfileRightSide>
      </div>
    </div>
  );
};

export default ProfileBody;
