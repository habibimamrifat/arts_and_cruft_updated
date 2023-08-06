import React, { useContext } from 'react';
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
    const navigate = useNavigate();

  const { user, logOutUser } =useContext(AuthContext);
  const handleLogOut = () => {
    logOutUser()
      .then((result) => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
      navigate('/');
  };

  return (
    <div className=" border-2 border-bl sticky top-0">
      <div className="  bg-base-200">
        <div className=" flex justify-start items-center py-2">
          <div className="w-52 px-2">
            <img
              src="../../../public/best-ai-generate-images.png"
              className="object-cover rounded-full shadow-2xl w-[100] h-[100]"
            />
          </div>

          <div className='px-2 text-left'>
            <h1 className="text-2xl font-bold">{user.email}</h1>
            <p className="py-2">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            </p>

            <p className="text-white">
              {user.email} <button onClick={handleLogOut}>Log Out</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;