import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faFilePen,
  faGear,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const ProfileLeftSide = () => {

    const [paymentMathord,setPaymentMathord]= useState('');
    console.log(paymentMathord);

    const userAdditionalData=(event =>{
       
        console.log('i eat rice');

    })





  return (
    <div>
      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
        <button onClick={() => window.my_modal_4.showModal()}>
          {" "}
          <FontAwesomeIcon icon={faUserPen} className="p-1 mr-1" />
          <span className="hidden md:inline">Edit Profile</span>
        </button>
      </li>

      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
        <button>
          {" "}
          <FontAwesomeIcon icon={faFilePen} className="p-1 mr-1" />
          <span className="hidden md:inline">Create A Post</span>{" "}
        </button>
      </li>
      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
        <button>
          {" "}
          <FontAwesomeIcon icon={faGear} className="p-1 mr-1" />{" "}
          <span className="hidden md:inline">Settings</span>
        </button>
      </li>

      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
        <button>
          {" "}
          <FontAwesomeIcon icon={faMessage} className="p-1 mr-1" />
          <span className="hidden md:inline">Message</span>
        </button>
      </li>

      {/* --------------------MODAL-1------------------------  */}

      <dialog id="my_modal_4" className="modal">
        
        <form onSubmit={userAdditionalData} className="modal-box w-11/12 min-w-5xl flex flex-col justify-center items-center mt-5"
        >
            
            
          <div className="mt-5">
            <input
              className="input input-bordered input-primary w-full max-w-xs m-2 mt-10"
              type="text"
              name="name"
              placeholder="Name:"
            />
          </div>
          <div>
            <input
              className="input input-bordered input-primary w-full max-w-xs m-2"
              type="tel"
              name="mobileNo"
              placeholder="Mobile Number:"
            />
          </div>
          <div>
            <input
              className="input input-bordered input-primary w-full max-w-xs m-2"
              type="text"
              name="address"
              placeholder="Address:"
            />
          </div>
          <div>
            <input
              className="input input-bordered input-primary w-full max-w-xs m-2"
              type="text"
              name="institution"
              placeholder="Institution:"
            />
          </div>
          <div>
            <input
              className="input input-bordered input-primary w-full max-w-xs m-2"
              type="text"
              name="city"
              placeholder="City:"
            />
          </div>
          <div>
            <input
              className="input input-bordered input-primary w-full max-w-xs m-2"
              type="text"
              name="hobby"
              placeholder="Hobby:"
            />
          </div>

          <div className="flex justify-center items-center">

          <select value={paymentMathord} onChange={e=>setPaymentMathord(e.target.value)} className="select select-primary w-full max-w-xs">
            <option disabled selected>
              What is the best TV show?
            </option>
            <option>Bkash</option>
            <option>Nagad</option>
            <option>Rocket</option>
            
          </select>

          <input
              className="input input-bordered input-primary w-full max-w-xs m-2"
              type="text"
              name="paymentNumber"
              placeholder="Number:"
            />

          </div>

          <div className="modal-action">
          <button type="submit" className="btn">Submit</button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
      {/* ...........................MODAL-1 ENDS---------------------------  */}
    </div>
  );
};

export default ProfileLeftSide;
