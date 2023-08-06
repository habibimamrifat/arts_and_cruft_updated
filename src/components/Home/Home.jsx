import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div >
            <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            </div>
            

            <div>

            

            </div>
        </div>
    );
};

export default Home;