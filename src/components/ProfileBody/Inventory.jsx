import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { key } from "localforage";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";


const Inventory = () => {
  let totalProduct = 0;
  let totalItemPrice = 0;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let [allPost, setAllPost] = useState([]);
  const [summary, setSummary] = useState({})
  const [clickedItemId, setClickedItemId] = useState(null);

  const { aboutUser } = useContext(AuthContext);



  // http://localhost:5000/profile/inventory/${params.userFbUid

  function fetchData() {
    if (aboutUser && aboutUser.userFbUid) {
      const userFbUid = aboutUser.userFbUid;

      fetch(`http://localhost:5000/profile/inventory/${userFbUid}`)
        .then((res) => res.json())
        .then((data) => {
          //   console.log(data);
          setAllPost(data);
          //   console.log(allPost);
          
        });
    }
  }
  console.log(allPost);

  function summaryCalculator() {
    allPost.map((post) => {
      totalProduct = totalProduct + parseInt(post.stock);
      totalItemPrice = totalItemPrice + (parseInt(post.stock) * parseInt(post.price))
    })
    let summaryProvider = { totalProduct, totalItemPrice }
    console.log(summaryProvider);
    setSummary(summaryProvider);

  }
  useEffect(() => {
   summaryCalculator();

  }, [allPost]);

  useEffect(() => {
    fetchData();

  }, [aboutUser]);


  function toggleMenu(itemId) {
    if (clickedItemId === itemId) {
      setIsMenuOpen(!isMenuOpen); // Toggle the menu state
    } else {
      setIsMenuOpen(true);
      setClickedItemId(itemId);
    }
  }


  function deleteFromPosts(itemId) {
    console.log("calling from delete");
    console.log(itemId);
    fetch(`http://localhost:5000/inventory/deleteFromInventory/${itemId}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("the post has been deleted");
          const updatedPosts = allPost.filter(post => post.id !== itemId)
          setAllPost(updatedPosts);

        }

      });
    setIsMenuOpen(false);
  }

  function closeDropdown() {

    setIsMenuOpen(false);
  }






  return (
    <div className="grid grid-cols-12 fixed top-44 overflow-hidden w-full">

      <div className="col-span-9">
        <div className="relative mt-0  h-screen flex items-center justify-center">
          <div className="h-screen relative top-2 overflow-y-scroll grid grid-cols-3 pb-80">
            {allPost.map((post) => (
              <div
                key={post.id}
                className="card  shadow-x bg-slate-800 mt-2 mx-[2%]  hover:border-solid hover:border-2 hover:border-slate-400 "
              >
                <div className="flex items-center justify-between">
                  <Link to={`/viewProfile/${post.userFbUid}`}>
                    <div className="flex px-5 py-2  items-center  hover:bg-slate-600 rounded-full">
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
                  {isMenuOpen && clickedItemId === post.id && (
                    <div className="flex flex-col relative  rounded-md bg-slate-600">


                      <button className="px-5 m-1 hover:bg-slate-100 rounded-xl">
                        <Link to={`/profile/editInventory/${post.id}`}>
                          EditPost
                        </Link>
                      </button>


                      <button
                        onClick={() => deleteFromPosts(post.id)}
                        className="px-5 m-1 hover:bg-slate-100 rounded-xl text-red-400"
                      >
                        Delete
                      </button>


                      <button
                        onClick={() => closeDropdown(post.id)}
                        className="px-5 m-1 hover:bg-slate-100 rounded-xl text-red-400"
                      >
                        Close
                      </button>

                    </div>
                  )}
                </div>

                <div className="h-52 px-4 py-2">
                  <img
                    className=" h-[100%] w-[100%] object-fill rounded-2xl"
                    src={post.img}
                    alt="img not found"
                  />
                </div>

                <div className=" p-2 px-4 ">
                  <p>Price:{post.price && post.price} TK</p>
                  <p>In Stock:{post.stock}</p>
                  <h2 className="p-1">Name:{post.name && post.name.toUpperCase()}</h2>
                  <p >Seller:{post.seller && post.seller.toUpperCase()}</p>

                  <p className="h-16 pt-1 overflow-auto">About Product:{post.aboutProduct}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      <div className="col-span-3 bg-slate-800 rounded-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Inventory Summary</h1>
          <small>On Sell</small>
          <h1>Total Item: {summary.totalProduct}</h1>
          <h1>Total Price: {summary.totalItemPrice}</h1>

          {/* <Link to="/inventoryDetail">
          <button className="btn mt-5 hover:bg-slate-600">
            View Detail
            </button>
          </Link> */}

          <Link to={`/inventoryDetail/${aboutUser.userFbUid}`}>

          <button className="btn mt-5 hover:bg-slate-600">
            View Detail
            </button>
          </Link>
          

        </div>
      </div>
    </div>

  );
};

export default Inventory;