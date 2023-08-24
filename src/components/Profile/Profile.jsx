import { useContext } from "react";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import { Outlet} from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";



const Profile = () => {

  const {reload,setReload}=useContext(AuthContext)
  if(reload===true)
  {
    window.location.reload()
    setReload(false);
  }

  return (
    <div className="">
        <ProfileHeader></ProfileHeader>
        <Outlet></Outlet>
    </div>
  );
};

export default Profile;
