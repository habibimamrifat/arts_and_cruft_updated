import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './components/Home/Home.jsx';
import Aboutus from './components/AboutUs/Aboutus';
import StudentSignUp from './components/StudentSignUp/StudentSignUp';
import VendorSignUp from './components/VendorSignUp/VendorSignUp';
import Shop from './components/Shop/Shop';
import OrderDetail from './components/OrderDetail/OrderDetail';
import { LoadDataFromDb } from './components/CustomeLoader/LoadDataFromDb';
import ConfirmPerchese from './components/ConfirmPerchese/confirmperchese';
import History from './components/History/History';
import Payment from './components/Payment/Payment';
import LoginPage from './components/Login/LoginPage';
import AuthProvider from './components/provider/AuthProvider';
import PrivateRoute from './components/routes/PrivateRoute';
import Profile from './components/Profile/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children:[
      {
        path:'/',
        element:<LoginPage></LoginPage>
      },
      {
        path:'/aboutus',
        element:<Aboutus></Aboutus>
      },
      {
        path:'/studentsignup',
        element:<StudentSignUp></StudentSignUp>
      },
      {
        path:'/vendorsignup',
        element:<VendorSignUp></VendorSignUp>
      },
      {
        path:'/shop',
        element:<Shop></Shop>
      },
      {
        path:'/history',
        element:<History></History>
      },
      {
        path:'/confirmPerches',
        element:<ConfirmPerchese></ConfirmPerchese>
      },
      {
        path:'/oederdetail',
        element:<OrderDetail></OrderDetail>,
        loader:LoadDataFromDb
      },
      {
        path:'/Payment',
        element:<PrivateRoute><Payment></Payment></PrivateRoute>
        
      },
      {
        path:'/profile',
        element:<Profile></Profile>
      }
      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
