import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";


const UpdateProfileData = () => {

  let paymentMethod, userHobby;
  const navigate = useNavigate();
  const { aboutUser, setReload } = useContext(AuthContext);
  let userFbUid = aboutUser.userFbUid;

  if (!aboutUser) {
    const loggedinUserUidString = localStorage.getItem('loggedInUserUid');
    if (loggedinUserUidString) {
      const loggedinUserUid = JSON.parse(loggedinUserUidString);
      console.log(loggedinUserUid.Uid);
      userFbUid = loggedinUserUid.Uid;
    }

  }

  let updatedUserData = { userImg: '', Name: '', MobileNo: '', Address: '', Institution: '', City: '', PaymentNumber: '', Hobby: '', PaymentMethod: '', personalEmail: '', }


  function handleUpdatedUserData(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    console.log(name, value);
    updatedUserData[name] = value;
    console.log(updatedUserData);
  }


  function handleUpdateUser(event) {
    event.preventDefault();
    console.log(updatedUserData);
    fetch(`http://localhost:5000/user/updateUser/${userFbUid}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedUserData)
    })
      .then((res) => res.json())
      .then(data => {
        console.log(data)
        alert('your profile has been updated');
        navigate('/profile');
        setReload(true);
      })
  }


  return (
    <div className="flex flex-col justify-center mt-36 pb-10">

      <form onSubmit={handleUpdateUser} className="mt-16">
        <h1 className="text-4xl mb-5 text-center">Update User</h1>

        <div className="flex justify-around">
          <div>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="userImg"
                placeholder="profile Img Link:"
                onChange={handleUpdatedUserData}
                required
              />
            </div>
            <small>
              provide img url..To convirt your img into url use{" "}
              <Link target="blank" className="underline" to="https://imgbb.com/">
                imegebb
              </Link>
            </small>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="Name"
                placeholder="Name:"
                onChange={handleUpdatedUserData}
                required
              />
            </div>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="MobileNo"
                placeholder="Mobile Number:"
                onChange={handleUpdatedUserData}
                required
              />
            </div>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="Address"
                placeholder="Address:"
                onChange={handleUpdatedUserData}
                required
              />
            </div>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="Institution"
                placeholder="Institution:"
                onChange={handleUpdatedUserData}
                required
              />
            </div>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="email"
                name="personalEmail"
                placeholder="Personal Email:"
                onChange={handleUpdatedUserData}
                required
              />
            </div>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="City"
                placeholder="City:"
                onChange={handleUpdatedUserData}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <select
                value={userHobby}
                onChange={handleUpdatedUserData}
                className="select select-primary w-[90%] max-w-xs hover:border-2 m-2 hover:border-blue-500"
                name="Hobby"
                required
              >
                <option value="default">Chose Hobby</option>
                <option>Art</option>
                <option>Crafting</option>
              </select>
            </div>

            <div>
              <select
                value={paymentMethod}
                onChange={handleUpdatedUserData}
                className="select select-primary w-[90%] max-w-xs hover:border-2 m-2 hover:border-blue-500"
                name="PaymentMethod"
                required
              >
                <option value="default">Chose Payment Method</option>
                <option>Bkash</option>
                <option>Nagad</option>
                <option>Rocket</option>
              </select>
            </div>

            <div>
              <input
                className="input input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500 "
                type="text"
                name="PaymentNumber"
                placeholder="Number:"
                onChange={handleUpdatedUserData}
                required
              />
            </div>
          </div>

        </div>

        <div className="flex justify-center items-center mt-5">
          <button
            // onClick={() => setSignUpType("student")}
            className="btn mx-5 px-5 rounded-lg"
          >
            <input type="submit" value="Update" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfileData;
