import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { PaintBrushIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {

    const {user, logOutUser}= useContext(AuthContext);
    const handleLogOut =()=>
    {
        logOutUser ()
        .then(result =>{
            console.log('logged out');
        })
        .catch(error=>{
            console.log(error);
        })
    }


    return (
        <div className=''>

            <div className="navbar bg-base-100 fixed top-0 w-[100]">
        
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to='/'>Home</Link></li>
                    <li>
                    <a>Sign Up</a>
                    <ul className="p-2">
                        <li><Link to='/studentsignup'>Student Signup</Link></li>
                        <li><Link to='/vendorsignup'>Vendor Signup</Link></li>
                    </ul>
                    </li>
                    <li><Link to='/aboutus'>About Us</Link></li>
                </ul>
                </div>
                <div className="normal-case text-xl flex">
                <PaintBrushIcon className="h-6 w-6 text-blue-500 mx-2" />
                    <p>Arts & Craft</p>

                    { user &&
                        <p className='text-white px-5'>{user.email} <button onClick={handleLogOut} >Log Out</button></p>
                    }
                    
                </div>
            </div>


            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><Link to='/'>Home</Link></li>
                <li tabIndex={0}>
                    <details>
                    <summary>Sign Up</summary>
                    <ul className="p-2">
                        <li><Link to='/studentsignup'>Student Signup</Link></li>
                        <li><Link to='/vendorsignup'>Vendor Signup</Link></li>
                    </ul>
                    </details>
                </li>
                <li><Link to='/aboutus'>About Us</Link></li>
                </ul>
            </div>
            
            <div className="navbar-end">
            <Link to='/shop' className='flex btn btn-ghost'>
                <p>Shop</p>
                <ShoppingCartIcon className="h-6 w-6 text-blue-500 mx-2" />
                </Link>
            </div>
            </div>

            
        </div>
    );
};

export default Navbar;