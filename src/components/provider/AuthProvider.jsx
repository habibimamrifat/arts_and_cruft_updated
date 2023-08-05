import React, { createContext, useEffect, useState } from 'react';
import app from './../../Firebase/firebase.init';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


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
        logOutUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;