import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";


const UpdateProfileData = () => {

  
  let {user, userDetail, setUserDetail} = useContext(AuthContext);
  const userEmail =user.email
  let paymentMethod,userHobby;
  

  function additionalData(event)
  {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    setUserDetail({...userDetail,[name]:value})

    
  }
  

 function setFinalData (event)
 {
  event.preventDefault();
  console.log(userDetail);
 }
  

  return (
    <div className="flex flex-col justify-center p-5">
    
      <form onSubmit={setFinalData} className="text-center bg-slate-800 rounded-3xl" >
        <h1 className="font-extrabold text-6xl mb-3">Provide Additional Info</h1>

        <div className="md:flex justify-around ">
          <div>
            <div>
              <input
                className="input input-bordered input-primary w-full max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="Name"
                placeholder="Name:"
                onChange={additionalData}
                required
              />
            </div>
            <div>
              <input
                className="input input-bordered input-primary w-full max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="MobileNo"
                placeholder="Mobile Number:"
                onChange={additionalData}
                required
              />
            </div>
            <div>
              <input
                className="input input-bordered input-primary w-full max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="Address"
                placeholder="Address:"
                onChange={additionalData}
                required
              />
            </div>
            <div>
              <input
                className="input input-bordered input-primary w-full max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="Institution"
                placeholder="Institution:"
                onChange={additionalData}
                required
              />
            </div>
            <div>
              <input
                className="input input-bordered input-primary w-full max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="email"
                name="Email"
                placeholder="Email:"
                onChange={additionalData}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <input
                className="input input-bordered input-primary w-full max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="City"
                placeholder="City:"
                onChange={additionalData}
                required
              />
            </div>

            <div>
            <p>Select Hobby</p>
            <select
              value={userHobby}
         
              onChange={additionalData}
              className="select select-primary w-full max-w-xs hover:border-2 hover:border-blue-500"
              name="Hobby"
              required

            >
              <option value="default" >Chose Hobby</option>
              <option>Art</option>
              <option>Crafting</option>
            </select>
            </div>

            <div>
            <p>Select the payment method</p>
            <select
              value={paymentMethod}
           
              onChange={additionalData}
              className="select select-primary w-full max-w-xs hover:border-2 hover:border-blue-500"
              name="PaymentMethod"
              required
            >
               <option value="default" >Chose Payment Method</option>
              <option>Bkash</option>
              <option>Nagad</option>
              <option>Rocket</option>
            </select>
            </div>
          
            <div>
              <input
              className="input input-bordered input-primary w-full max-w-xs m-2 hover:border-2 hover:border-blue-500"
              type="text"
              name="PaymentNumber"
              placeholder="Number:"
              onChange={additionalData}
              required
            />

            </div> 
            
          </div>

        </div>

        <div className="">
          <button type="submit" className="btn px-10 font-bold hover:border-2 hover:border-blue-500 mb-5 ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileData;
