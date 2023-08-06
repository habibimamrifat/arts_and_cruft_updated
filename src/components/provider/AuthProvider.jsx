import React, { createContext, useEffect, useState } from 'react';
import app from './../../Firebase/firebase.init';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext(null);
const auth = getAuth(app)



const AuthProvider = ({children}) => {

    

    const [user, setUser] = useState(null);
    const [loading,setLoading] = useState(true)

    const signUpUsers =(email,password)=>{
        setLoading(true)

       return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInUsers =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleResetPassword = (email)=>
    {
        return sendPasswordResetEmail(auth, email);
    }

    function popupGoogleSignIn()
    {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);

    }

    const logOutUser =()=>
    {
        
        return signOut(auth)
        
    }

    //set observer on the user
    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
            setLoading(false)
        });
        //stop observing
        return () => {
            return unsubscribe();
        }
    },[])

    const authInfo={
        user,
        loading,
        signUpUsers,
        logInUsers,
        logOutUser,
        popupGoogleSignIn,
        handleResetPassword
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;