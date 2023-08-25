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
import UpdateProfileData from './components/ProfileBody/UpdateProfileData';
import ProfileBody from './components/ProfileBody/ProfileBody';
import Settings from './components/ProfileBody/Settings';
import CustomerForm from './components/CustomerForm/CustomerForm';
import CreateAPost from './components/ProfileBody/CreateAPost';
import Viewprofile from './ViewProfile/Viewprofile';
import EditPost from './components/ProfileBody/EditPost';
import Inventory from './components/ProfileBody/Inventory';
import EditInventory from './components/ProfileBody/EditInventory';

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
        path:'customerform',
        element:<CustomerForm></CustomerForm>
      }
      
    ]
  },
  {
    path:'/profile',
    element:<PrivateRoute><Profile></Profile></PrivateRoute>,
    children:[
      {
        path:'/profile',
        element:<ProfileBody></ProfileBody>
      },
      {
        path:'profile/updateprofiledata',
        element:<UpdateProfileData></UpdateProfileData>
      },
      {
        path:'profile/settings',
        element:<Settings></Settings>
      },
      {
        path:'profile/createAPost',
        element:<CreateAPost></CreateAPost>
      },
      {
        path:'/profile/editPost/:id',
        element:<EditPost></EditPost>,
        loader:({params})=>fetch(`http://localhost:5000/post/getEditPost/${params.id}`)
      },
      {
        path:'/profile/inventory',
        element:<Inventory></Inventory>
      },
      {
        path:'/profile/editInventory/:id',
        element:<EditInventory></EditInventory>,
        loader:({params})=>fetch(`http://localhost:5000/inventory/getEditInventory/${params.id}`)
      },
    ]
    
  },
  {
    path:'/viewProfile/:userFbUid',
    element:<Viewprofile></Viewprofile>,
    loader:({params})=>fetch(`http://localhost:5000/viewProfile/getProfileData/${params.userFbUid}`)
  }
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
