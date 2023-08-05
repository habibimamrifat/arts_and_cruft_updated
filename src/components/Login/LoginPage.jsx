import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const LoginPage = () => {
  const[signInType, setSignInType]=useState('');

  const {logInUsers}= useContext(AuthContext);
  const nevigate = useNavigate();
  

  const location = useLocation();
  console.log(location);

  const from = location.state?.from?.pathname || '/profile'


  const handleLOgIn =(event) =>{
    event.preventDefault();

    const form = event.target;
    const email = form.Email.value;
    const password = form.Password.value;


    
    logInUsers(email,password)
    .then(result=>{
      const loggedUser =result.user;
      console.log(result);
      form.reset()
      // will be changed with profileLink
      nevigate(from)



    })
    .catch(error=>{
      console.log(error);
    })




    if (signInType === "student") {
      // console.log('student');
      //save into student database and call student profile
    } else if (signInType === "vendor") {
      // console.log('vendor');
      //save into student database and call vendor profile
    }
  }




  return (
    <div>
      <form onSubmit={handleLOgIn} className="mt-16">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl mb-5">Log In</h1>

          <h3>E-mail</h3>
          <input
          name="Email"
            type="text"
            placeholder="E-mail"
            className="input input-bordered input-primary w-full max-w-xs"
          />

          <h3>Password</h3>
          <input
            name="Password"
            type="password"
            placeholder="Password"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={() => setSignInType("student")}
            className="btn mx-5 px-5 rounded-lg"
          >
            <input type="submit" value="StudentSignIn" />
          </button>
          <button
            onClick={() => setSignInType("vendor")}
            className="btn mx-5 px-5 rounded-lg"
          >
            <input type="submit" value="VendorSignIn" />
          </button>
        </div>

      </form>
      

        <div className="flex flex-col justify-center items-center mt-5">
          <h3>
            New to this site? Please <Link to="/studentsignup">Sign Up</Link>
          </h3>
          <h2>
            Forgot Password ? <button>Reset Password </button>
          </h2>
        </div>
    </div>
  );
};

export default LoginPage;
