import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div >
            <Navbar></Navbar>

            <div>

            <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Home;