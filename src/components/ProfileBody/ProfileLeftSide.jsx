import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faFilePen,
  faGear,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const ProfileLeftSide = () => {

  const {productDetail,setProductDetail,} =useContext(AuthContext);
  
  const [openPopup, setOpenPopup] = useState(false);
  let category;

  function gatherProductDetail (event)
  {
    let name = event.target.name;
    let value = event.target.value;
    setProductDetail({...productDetail , [name] : value})
  }

  function openPopUpForPost() {
    console.log("going to open popup");
    setOpenPopup(true);
  }
  function closePopUpForPost() {
    console.log("going to close popup");
    setOpenPopup(false);
  }
  function createAPostAndSell()
  {
    console.log('create a post and sell')
    closePopUpForPost();
    console.log(productDetail);
  }

  function createAPost() {
    console.log("i am posting");
    closePopUpForPost();
    console.log(productDetail);
  }

  return (
    <div>

      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
        <Link to="profile/updateprofiledata">
          <button>
            <FontAwesomeIcon icon={faUserPen} className="p-1 mr-1" />
            <span className="hidden md:inline">Edit Profile</span>
          </button>
        </Link>
      </li>

      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
        <button onClick={openPopUpForPost}>
          <FontAwesomeIcon icon={faFilePen} className="p-1 mr-1" />
          <span className="hidden md:inline">Create A Post</span>{" "}
        </button>
      </li>

      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
        <button>
          <Link  to="profile/settings">
          <FontAwesomeIcon icon={faGear} className="p-1 mr-1" />{" "}
          <span className="hidden md:inline">Settings</span>
          </Link>
        </button>
      </li>

      <li className="list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center">
        <button>
          {" "}
          <FontAwesomeIcon icon={faMessage} className="p-1 mr-1" />
          <span className="hidden md:inline">Message</span>
        </button>
      </li>
{/* -------------------------------popUpSection----------------------------------  */}
      <div>
        {openPopup && (
          <div className="fixed flex top-[15%] h-3/4 items-center justify-center sm:w-2/5 md:w-1/4 bg-slate-100 rounded-3xl text-center mx-[24%] sm:mx[10%] md:mx-[37%]">
            <div className=" flex flex-col justify-center items-center m-3">
              
                <input name="productImg" className="w-[100%] border-2 h-40 border-slate-800 rounded-lg" type="file" />

              <div className="mt-2 flex flex-col gap-1">

                <input onChange={gatherProductDetail} name="productPrice" type="text" placeholder="Product Price" className="input input-bordered " />

                <input onChange={gatherProductDetail} name="productName" type="text" placeholder="Product Name" className="input input-bordered input-primary w-full max-w-xs" />

                <input onChange={gatherProductDetail} name="aboutProduct" type="text" placeholder="About Product" className="input input-bordered input-primary w-full max-w-xs" />

                <input onChange={gatherProductDetail} name="quantity" type="text" placeholder="Aveable Quantity" className="input input-bordered input-primary w-full max-w-xs" />


                <select
                  value={category}
              
                  onChange={gatherProductDetail}
                  className="select select-primary w-full max-w-xs hover:border-2 hover:border-blue-500"
                  name="category"
                  required
                >
                  <option value="default" >Category</option>
                  <option>Art</option>
                  <option>craft</option>
                </select>
              </div>

              <div className="flex justify-center gap-1 mt-2 ">
                <button onClick={createAPost} className="btn">
                  Post
                </button>
                <button onClick={createAPostAndSell} className="btn">
                  Post & Sell
                </button>
                <button onClick={closePopUpForPost} className="btn">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileLeftSide;
