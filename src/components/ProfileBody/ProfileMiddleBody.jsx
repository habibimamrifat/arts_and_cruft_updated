import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { key } from "localforage";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

const ProfileMiddleBody = () => {
  let [allPost, setAllPost] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);
  const navigate = useNavigate();

  const { aboutUser } = useContext(AuthContext);

  // console.log(aboutUser.userFbUid);
  // console.log(aboutUser);

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
  // console.log(allPost);

  useEffect(() => {
    fetchData();
  }, [aboutUser]);

  function toggleMenu(itemId) {
    // Toggle the clicked item's ID
    if (clickedItemId === itemId) {
      setClickedItemId(null);
    } else {
      setClickedItemId(itemId);
    }
  }

  function putOnSell(itemId) {
    console.log("calling from sell");
    console.log(itemId);

    fetch(`http://localhost:5000/post/checkBeforePutOnSell/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.permission);
        if (data.permission) {
          console.log(itemId);
          fetch(`http://localhost:5000/post/putOnSell/${itemId}`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              fetch(`http://localhost:5000/post/putOnSell/storeInDatabase`, {
                method: "post",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.insertedId) {
                    alert("your item is on sell now");
                  }
                });
            });
        } else {
          alert("this product is already on sell");
        }
      });

    setClickedItemId(null);
  }

  function editPost(itemId) {
    console.log(itemId);
  }

  function deleteFromPosts(itemId) {
    console.log("calling from delete");
    console.log(itemId);
    fetch(`http://localhost:5000/post/deleteFromPost/${itemId}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deleteCount > 0) {
          alert("the post has been deleted");
          navigate("/profile");
        }
      });
    setClickedItemId(null);
  }
  
  return (
    <div className="absolute mt-0 w-[50%] h-screen overflow-hidden ">
      <div className="relative mt-0 w-[100%] h-screen flex items-center justify-center">
        <div className="h-screen relative top-2 overflow-y-scroll  w-full pb-[40%] ">
          {allPost.map((post) => (
            <div
              key={post.id}
              className="card  shadow-x bg-slate-800 mt-2 mx-[5%] hover:border-solid hover:border-2 hover:border-slate-400 "
            >
              <div className="flex items-center justify-between">
                <Link to={`/viewProfile/:${post.userFbUid}`}>
                  <div className="flex px-5 py-2  items-center hover:bg-slate-600 rounded-full">
                    <div className="h-10 w-10 rounded-full bg-white mr-5">
                      <img
                        src={aboutUser.userImg}
                        alt=""
                        className="h-full w-full object-fill rounded-full"
                      />
                    </div>
                    <div>
                      <p>{aboutUser.Name}</p>
                    </div>
                  </div>
                </Link>

                <button onClick={() => toggleMenu(post.id)}>
                  <div className="px-5 py-2 hover:bg-slate-600 rounded-full">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </div>
                </button>
              </div>
              <div>
                {clickedItemId === post.id && (
                  <div className="flex flex-col relative  rounded-md bg-slate-600">
                    <button
                      onClick={() => putOnSell(post.id)}
                      className="px-5 m-1 hover:bg-slate-100 rounded-xl"
                    >
                      Sell
                    </button>
                    <button
                      onClick={() => editPost(post.id)}
                      className="px-5 m-1 hover:bg-slate-100 rounded-xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFromPosts(post.id)}
                      className="px-5 m-1 hover:bg-slate-100 rounded-xl text-red-400"
                    >
                      Delete
                    </button>

                  </div>
                )}
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
          ))}

          <div className=" text-center font-bold mt-5">Add more post</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMiddleBody;
