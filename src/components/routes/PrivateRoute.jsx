import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { user, loading, } = useContext(AuthContext)
    const location = useLocation()
   

   
    let storedCustomerLsIdStringify = localStorage.getItem("ArtsAndCraftCustomerId");


    let customer = JSON.parse(storedCustomerLsIdStringify);
    console.log(customer);
    console.log(user);
            
           
            

    if (loading) {
        return <div>loading...</div>;
    }

    if (user || customer) {
        return children;
    }

    return <Navigate to='/' state={{ from: location }} replace></Navigate>

};

export default PrivateRoute;