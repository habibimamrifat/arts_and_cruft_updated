import React, { createContext, useEffect, useState } from 'react';
import app from './../../Firebase/firebase.init';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";



export const AuthContext = createContext(null);
const auth = getAuth(app)



const AuthProvider = ({children}) => {

    
    const [userDetail, setUserDetail]=useState({Name:'', MobileNo:'', Address:'',Institution:'', City:'', PaymentNumber:'', Hobby:'',PaymentMethod:'', Email:''})
    
    const [productDetail, setProductDetail]=useState({productImg:'',productPrice:'',productName:'',aboutProduct:'',quantity:'',category:''})

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

    function changePasswordFromSettings(password)
    {
        console.log(' changePasswordFromSettings');
        console.log(password);
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
        userDetail,
        setUserDetail,
        productDetail,
        setProductDetail,
        signUpUsers,
        logInUsers,
        logOutUser,
        popupGoogleSignIn,
        handleResetPassword,
        changePasswordFromSettings
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;