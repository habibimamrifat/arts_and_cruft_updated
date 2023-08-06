import React from "react";

const ProfileBody = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="h-96 border-2 border-blue-500 col-span-3 sticky top-[30%] md:sticky md:top-[35%] ">
        left side
      </div>
      <div className="min-h-screen border-2 border-blue-500 col-span-6">
        middle
      </div>
      <div className="h-96 border-2 border-blue-500 col-span-3 sticky top-[30%] md:top-[35%]">
        right side
      </div>
    </div>
  );
};

export default ProfileBody;
