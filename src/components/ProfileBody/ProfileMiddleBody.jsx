import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { key } from "localforage";

const ProfileMiddleBody = () => {
    let [allPost, setAllPost]= useState([]);
 const {aboutUser}= useContext(AuthContext);

 console.log(aboutUser.userFbUid);

 function fetchData() {
    if (aboutUser && aboutUser.userFbUid) {
      const userFbUid = aboutUser.userFbUid;
  
      fetch(`http://localhost:5000/profile/middleBody/${userFbUid}`)
        .then((res) => res.json())
        .then((data) => {
        //   console.log(data);
          setAllPost(data);
        //   console.log(allPost);
        });
    }
  }
  console.log(allPost);

  useEffect(() => {
    fetchData();
  }, [aboutUser]);


  return (
   <div className="absolute mt-0 w-[50%] h-screen overflow-hidden ">
     <div className="relative mt-0 w-[100%] h-screen flex items-center justify-center">
        <div className="h-screen relative top-2 overflow-y-scroll  w-full pb-[40%] ">

        {
            allPost.map(post=>(<div key={post.id} className="card  shadow-x bg-slate-800 mt-2 mx-[5%] hover:border-solid hover:border-2 hover:border-slate-400 ">
            <div className="h-56">
              <img
                className=" h-[100%] w-[100%] object-cover rounded-2xl"
                src={post.img}
                alt="img not found"
              />
            </div>
    
            <div className="h-28 p-2">
              <h2 className="p-1">Name:{name}</h2>
              {/* <p>Price:{price}</p> */}
              {/* <p>Seller Name:{seller}</p> */}
            </div>
    
            <div className="flex  justify-around pb-4 mt-2">
              <button
                // onClick={() => addToCart(props.product)}
                className="p-1 rounded-lg border-solid border-2 border-slate-700  text-slate-300 hover:scale-x-[1.1] duration-500"
              >
                Add to Cart
              </button>
              <button className="p-1 border-solid border-2 border-slate-700  rounded-lg text-slate-300 hover:scale-x-[1.1] duration-500">
                View Details
              </button>
            </div>
          </div>))
        }

        <div className=" text-center font-bold mt-5">
            Add more post
        </div>

        </div>
    </div>
   </div>
  );
};

export default ProfileMiddleBody;
