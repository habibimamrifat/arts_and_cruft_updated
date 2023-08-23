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
    <div className=" border-2 border-bl fixed w-full top-0">
      <div className="  bg-base-200">
        <div className=" flex justify-start items-center py-2 mx-2">
          <div className="w-40 h-40 px-2 rounded-full bg-white overflow-hidden">
            <img
              src={userData.userImg && userData.userImg}
              className="  shadow-2xl w-full h-full object-cover "
            />
          </div>

          <div className='px-2 text-left'>
            <h1 className="text-xl font-bold">{userData.Name && userData.Name.toUpperCase()}</h1>
            <h1 className="text-2xl font-bold">{userData.Hobby && userData.Hobby.toUpperCase()}</h1>
            <h1 className="text-xl font-bold">{userData.City && userData.City.toUpperCase()}</h1>
           

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