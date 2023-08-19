import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faFilePen,
  faGear,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const ProfileLeftSide = () => {

  

  return (
    <div>

      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
        <Link to="profile/updateprofiledata">
          <button>
            <FontAwesomeIcon icon={faUserPen} className="p-1 mr-1" />
            <span className="hidden md:inline">Edit Profile</span>
          </button>
        </Link>
      </li>

      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
        <Link to='profile/createAPost'>
        <button >
          <FontAwesomeIcon icon={faFilePen} className="p-1 mr-1" />
          <span className="hidden md:inline">Create A Post</span>{" "}
        </button>
        </Link>
      </li>

      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
      <Link  to="profile/settings">
        <button>
          
          <FontAwesomeIcon icon={faGear} className="p-1 mr-1" />{" "}
          <span className="hidden md:inline">Settings</span>
          
        </button>
        </Link>
      </li>

      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
        <button>
          {" "}
          <FontAwesomeIcon icon={faMessage} className="p-1 mr-1" />
          <span className="hidden md:inline">Message</span>
        </button>
      </li>
{/* -------------------------------popUpSection----------------------------------  */}
    </div>
  );
};

export default ProfileLeftSide;
