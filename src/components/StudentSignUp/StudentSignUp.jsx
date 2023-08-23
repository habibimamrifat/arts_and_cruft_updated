import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { sendEmailVerification } from "firebase/auth";

const StudentSignUp = () => {

  let paymentMethod, userHobby;
  const [error, setError] = useState("");
  const navigate = useNavigate();

  let userDetail = {userFbUid:'',userImg:'',Name:'', MobileNo:'', Address:'',Institution:'', City:'', PaymentNumber:'', Hobby:'',PaymentMethod:'', personalEmail:'', businessEmail:'',Password:'',ConfirmPassword:''}

  const { signUpUsers } = useContext(AuthContext);

  function signUpUserData(event) {
    event.preventDefault();

    let value = event.target.value;
    let name = event.target.name;
    console.log(name, value);
    userDetail[name]=value;
    console.log(userDetail);
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    const form = event.target;

    console.log(userDetail);

    // console.log(userDetail.businessEmail);
    // console.log(userDetail.Password);
    // console.log(userDetail.ConfirmPassword);

    if (userDetail.Password !== userDetail.ConfirmPassword) {
      setError("Password is not matched");
      return;
    } else if (
      !userDetail.Password.length > 6 ||
      !userDetail.ConfirmPassword > 6
    ) {
      setError("Password must be of six characters");
      return;
    }
    let email = userDetail.businessEmail;
    let password = userDetail.Password;
    console.log(email,password);

    // create user with email and password

    try {
      // create user with email and password
      const result = await signUpUsers(email, password);
      const signedUpUser = result.user;
      const uid = signedUpUser.uid;
  
      // Update userDetail state with the new user information, including uid
      userDetail.userFbUid= uid;
      console.log(userDetail);

     fetch('http://localhost:5000/signUp',{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(userDetail)
      })

      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);// Handle the data
        if (responseData.insertedId)
        {
          alert('your account has been created please LOG IN');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  
      // send email verification
      const verificationResult = await sendEmailVerification(signedUpUser);
  
      console.log(verificationResult);

      
  
      form.reset();
      navigate("/");
    } catch (error) {
      setError(error);
    }

  };
  // useEffect(() => {
  //   console.log(userDetail);
  // }, [userDetail]);

  return (
    <div>
      <form onSubmit={handleSignUp} className="mt-16">
        <h1 className="text-4xl mb-5 text-center">Sign UP</h1>

        <div className="flex justify-around">
          <div>
          <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="userImg"
                placeholder="profile Img Link:"
                onChange={signUpUserData}
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
                onChange={signUpUserData}
                required
              />
            </div>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="MobileNo"
                placeholder="Mobile Number:"
                onChange={signUpUserData}
                required
              />
            </div>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="Address"
                placeholder="Address:"
                onChange={signUpUserData}
                required
              />
            </div>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="Institution"
                placeholder="Institution:"
                onChange={signUpUserData}
                required
              />
            </div>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="email"
                name="personalEmail"
                placeholder="Personal Email:"
                onChange={signUpUserData}
                required
              />
            </div>
            <div>
              <input
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                type="text"
                name="City"
                placeholder="City:"
                onChange={signUpUserData}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <select
                value={userHobby}
                onChange={signUpUserData}
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
                onChange={signUpUserData}
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
                onChange={signUpUserData}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <input
                type="text"
                placeholder="Business E-mail"
                name="businessEmail"
                onChange={signUpUserData}
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="Password"
                onChange={signUpUserData}
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                name="ConfirmPassword"
                onChange={signUpUserData}
                className="input p-5 input-bordered input-primary w-[90%] max-w-xs m-2 hover:border-2 hover:border-blue-500"
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
            <input type="submit" value="StudentSignUp" />
          </button>
        </div>
      </form>

      <div className="flex flex-col justify-center items-center mt-5">
        <h3>
          Already Signed Up? Please <Link to="/">Log In</Link>
        </h3>
      </div>
      <p className="text-center text-red-600">
        <small>{error}</small>{" "}
      </p>
    </div>
  );
};

export default StudentSignUp;
