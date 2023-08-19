import React, { createContext, useEffect, useState } from 'react';
import app from './../../Firebase/firebase.init';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword } from "firebase/auth";



export const AuthContext = createContext(null);
const auth = getAuth(app)



const AuthProvider = ({children}) => {

    const [customer, setCustomer]=useState({customerName:'', customerMobileNumber:'',customerAddress:'',GrandTotal:'',customerCart:[]})
    const [aboutUser, setAboutUser]=useState({});

    const [customerPermission , setCustomerPermission] =useState(false);
    const [finalCart,setFinalCart]= useState([])
    const [finalGrandTotal,setFinalGrandTotal]= useState(0);

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

    function changePasswordFromSettings(newPassword)
    {
       console.log(auth.currentUser);
       console.log(user);
       return updatePassword(user,newPassword)
   
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
        setUser,
        aboutUser,
        setAboutUser,
        loading,
        customer,
        customerPermission,
        finalCart,
        setFinalCart,
        finalGrandTotal,
        setFinalGrandTotal,
        setCustomerPermission,
        setCustomer,
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