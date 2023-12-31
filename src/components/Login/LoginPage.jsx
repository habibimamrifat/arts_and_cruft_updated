import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";



const LoginPage = () => {


  const [error, setError] = useState('');

  const { logInUsers, handleResetPassword, popupGoogleSignIn, setUser } = useContext(AuthContext);
  const nevigate = useNavigate();

  const location = useLocation();


  const from = location.state?.from?.pathname || "/profile";

  let rendaring;
  if (from == "/profile") {
    rendaring = true;
  } else {
    rendaring = false;
  }


  const handleLOgIn = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.Email.value;
    const password = form.Password.value;

    logInUsers(email, password)
      .then((result) => {
        const loggedUser = result.user;
        const loggerUserUid = loggedUser.uid;
        console.log(loggerUserUid);


        

        const loggedinUserUidString = localStorage.getItem('artAndCraftloggedInUserUid');
        if (loggedinUserUidString) {
          const loggedinUserUid = JSON.parse(loggedinUserUidString);
          console.log(loggedinUserUid.Uid); 
        }
        else {
          const loggedinUserUid = { Uid: loggerUserUid };
          const loggedinUserUidString = JSON.stringify(loggedinUserUid);
          localStorage.setItem('artAndCraftloggedInUserUid', loggedinUserUidString);

        }




        setUser(loggedUser);

        form.reset();
        // will be changed with profileLink
        nevigate(from);
      })
      .catch((error) => {
        setError(error);
      });


  };

  function handlePassword(event) {
    const form = event.target;
    const resetpass = form.resetpass.value;


    handleResetPassword(resetpass)
      .then(result => {
        alert('Reset password Email Has been sent')
      })
      .catch(error => {
        setError(error)
      })

  }


  function googleSignIn() {
    popupGoogleSignIn()
      .then(result => {
        alert('account is ready')
        console.log(result.user);
        nevigate(from);
      })
      .catch(error => {
        setError(error);
      })
  }




  return (
    <div>
      <form onSubmit={handleLOgIn} className="mt-16">
        <div className="flex flex-col justify-center items-center">
          {(rendaring && <h1 className="text-4xl mb-5">Log In</h1>) || (

            <h1 className="text-4xl mb-5">
              log in with your Account <br />or<br /> Fillup <span><Link to="customerform"><small className="text-xs underline">Customerform</small></Link></span>
            </h1>
          )}

          <h3>E-mail</h3>
          <input
            name="Email"
            type="text"
            placeholder="E-mail"
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />

          <h3>Password</h3>
          <input
            name="Password"
            type="password"
            placeholder="Password"
            className="input input-bordered input-primary w-full max-w-xs"
            required
          />
        </div>



        <div className="flex justify-center items-center mt-5">
          <button
            className="btn mx-5 px-5 rounded-lg"
          >
            <input type="submit" value="StudentSignIn" />
          </button>
        </div>
      </form>

      <div className="flex flex-col justify-center items-center mt-5">
        <button onClick={googleSignIn}>sign in with <span className="text-xl">GOOGLE</span></button>
        <h3>
          New to this site? Please <Link to="/studentsignup">Sign Up</Link>
        </h3>
        <h2>
          {/* Forgot Password ? <button>Reset Password </button> */}

          {/* Open the modal using ID.showModal() method */}

          <p>Forgot Password?</p>
          <button className="" onClick={() => window.my_modal_1.showModal()}>
            Reset password
          </button>

          <dialog id="my_modal_1" className="modal">
            <form
              onSubmit={handlePassword}
              method="dialog"
              className="modal-box"
            >
              <input type="text" placeholder="Inter Email" name="resetpass" />

              <input className="modal-action" type="submit" />
            </form>
          </dialog>
        </h2>
      </div>
      <p>{error}</p>
    </div>
  );
};

export default LoginPage;
