import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const StudentSignUp = () => {
  const [signUpType, setSignUpType] = useState("");
  const [error, setError] = useState("");

  const { signUpUsers } = useContext(AuthContext);

  const handleSignUp = (event) => {
    event.preventDefault();

    setError('');

    const form = event.target;
    const email = form.Email.value;
    const password = form.Password.value;
    const confirmpassword = form.ConfirmPassword.value;

    if (password !== confirmpassword) {
      setError("Password is not matched");
      return;
    } 
    else if (!password.length > 6) {
      setError("Password must be of six characters");
      return;
    }

    signUpUsers(email, password)
    .then(result =>{
      console.log(result.user);
    })
    .catch(error=>{
      console.log(error);
    })


    if (signUpType === "student") {
      // console.log('student');
      //save into student database and call student profile
    } else if (signUpType === "vendor") {
      // console.log('vendor');
      //save into student database and call vendor profile
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp} className="mt-16">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl mb-5">Sign UP</h1>

          <h3>E-mail</h3>
          <input
            type="text"
            placeholder="E-mail"
            name="Email"
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />

          <h3>Password</h3>
          <input
            type="password"
            placeholder="Password"
            name="Password"
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />
          <h3>Confirm Password</h3>
          <input
            type="password"
            placeholder="Confirm Password"
            name="ConfirmPassword"
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />
        </div>

        <div className="flex justify-center items-center mt-5">
          <button
            onClick={() => setSignUpType("student")}
            className="btn mx-5 px-5 rounded-lg"
          >
            <input type="submit" value="StudentSignUp" />
          </button>
          <button
            onClick={() => setSignUpType("vendor")}
            className="btn mx-5 px-5 rounded-lg"
          >
            <input type="submit" value="VendorSignUp" />
          </button>
        </div>
      </form>

      <div className="flex flex-col justify-center items-center mt-5">
        <h3>
          Already Signed Up? Please <Link to="/">Log In</Link>
        </h3>
        <h2>
          Sign up with <button>Google</button>
        </h2>
      </div>
      <p className="text-center text-red-600">
        <small>{error}</small>{" "}
      </p>
    </div>
  );
};

export default StudentSignUp;
