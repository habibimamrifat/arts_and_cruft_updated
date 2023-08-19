import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
    const navigate = useNavigate();

  const { user, logOutUser, setAboutUser } =useContext(AuthContext);
  const [userData, setUserData]=useState({});
 
  let userUid = user.uid
 
 useEffect(()=>{
  
  fetch(`http://localhost:5000/profileHeader/${userUid}`)
  .then((res) => res.json())
  .then(data =>{
    
    setUserData(data);
    setAboutUser(data);
  })
 },[userUid])



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
            <h1 className="text-2xl font-bold">{userData.Name && userData.Name.toUpperCase()}</h1>
            <h1 className="text-2xl font-bold">{userData.Hobby && userData.Hobby.toUpperCase()}</h1>
            <h1 className="text-2xl font-bold">{userData.City && userData.City.toUpperCase()}</h1>
           

            <p className="text-white">
              {userData.businessEmail} <button onClick={handleLogOut}>Log Out</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;