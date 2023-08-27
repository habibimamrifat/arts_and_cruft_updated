import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft,faHandshake} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Viewprofile = () => {

    let [allPost, setAllPost] = useState([]);
    const loaderData= useLoaderData();
    // console.log(loaderData);
    const userFbUid=loaderData.userFbUid;
    // console.log(userFbUid);


    function fetchData() {
        if (userFbUid) {
    
          fetch(`http://localhost:5000/profile/middleBody/${userFbUid}`)
            .then((res) => res.json())
            .then((data) => {
              //   console.log(data);
              setAllPost(data);
              //   console.log(allPost);
            });
        }
      }
      // console.log(allPost);
    
      useEffect(() => {
        fetchData();
      }, [userFbUid]);




  return (
    <div>
      <div>
        <div className=" fixed w-[100%] top-0 mx-auto">
            
          <div className=" flex justify-around items-center bg-base-200 mx-auto w-[75%]">
            <div>
                <Link to='/profile'>
                <button className="h-24 w-5 border border-slate-600 rounded-xl hover:bg-slate-500 ">
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                </Link>
            </div>

            <div className=" flex justify-center items-center py-2 mx-2 gap-10">
              <div className="w-40 h-40 px-2 rounded-full bg-white overflow-hidden">
                <img
                  src={loaderData.userImg && loaderData.userImg}
                  className="  shadow-2xl w-full h-full object-cover "
                />
              </div>

              <div className="px-2 text-left">
                <h1 className="text-sm font-bold">
                 Name: {loaderData.Name && loaderData.Name.toUpperCase()}
                </h1>
                <h1 className="text-2xl font-bold">
                 Hobby: {loaderData.Hobby && loaderData.Hobby.toUpperCase()}
                </h1>
                <h1 className="text-sm font-bold">
                 City: {loaderData.City && loaderData.City.toUpperCase()}
                </h1>
                <h1 className="text-sm font-bold">
                 Institution: {loaderData.Institution && loaderData.Institution.toUpperCase()}
                </h1>

                <p className="text-white">
                Email:  {loaderData.businessEmail}
                  
                </p>
              </div>
            </div>
         
            <div>
                <button className="h-24 w-24  border border-slate-600 rounded-2xl hover:bg-slate-500 "><FontAwesomeIcon icon={faHandshake} /><br />HIRE</button>
            </div>
          </div>
        </div>
      </div>

     

      <div>
      <div className="fixed mt-44 w-[50%] h-screen overflow-hidden mx-[25%] ">
      <div className="relative mt-0 w-[100%] h-screen flex items-center justify-center">
        <div className="h-screen relative top-2 overflow-y-scroll  w-full pb-[40%] ">
          {allPost.map((post) => (
                <div
                key={post.id}
                className="card  shadow-x bg-slate-800 mt-2 mx-[5%] hover:border-solid hover:border-2 hover:border-slate-400 "
                >
                <div className="flex flex-col items-start justify-between">
                
                <div className="flex px-5 py-2  items-center hover:bg-slate-600 rounded-full">

                        <div className="h-10 w-10 rounded-full bg-white mr-5">
                        <img
                            src={loaderData.userImg}
                            alt=""
                            className="h-full w-full object-fill rounded-full"
                        />
                        </div>

                        <div>
                        <p>{loaderData.Name}</p>
                        </div>

                    </div>
                

                <div className="h-60 px-4 py-2">
                    <img
                    className=" h-[100%] w-[100%] object-fill rounded-2xl"
                    src={post.img}
                    alt="img not found"
                    />
                </div>

                <div className="h-28 p-2 px-4">
                    <p>{post.seller && post.seller.toUpperCase()}</p>
                    <h2 className="p-1">{post.name && post.name.toUpperCase()}</h2>
                    <p>{post.aboutProduct}</p>
                </div>

                </div>
                </div>
          ))}
        </div>
      </div>
    </div>
      </div>

    </div>
  );
};

export default Viewprofile;
