import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const CreateAPost = () => {
  "https://i.ibb.co/cYLCtBd/cre.png";
  let category;
  let productDetail = {
    userFbUid: "",
    id: "",
    seller: "",
    img: "",
    price: "",
    name: "",
    aboutProduct: "",
    quantity: 0,
    category: "",
    stock: "",
  };

  const navigate = useNavigate();
  let status ='';

  const { aboutUser } = useContext(AuthContext);


  productDetail.userFbUid = aboutUser.userFbUid;
  productDetail.seller = aboutUser.Name;

  function gatherProductDetail(event) {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;

    productDetail[name] = value;

  }

  function closePopUpForPost() {
    console.log("going to close popup");
    navigate("/profile");
  }

  function createAPost() {
    console.log("i am posting");
     console.log(productDetail)
    closePopUpForPost();
  }

  function createAPostAndSell() {
    console.log("create a post and sell");
     console.log(productDetail)
    closePopUpForPost();
  }

  function viewProductdetail (event)
  {
    event.preventDefault()
    console.log(productDetail);
    if(status ==='post')
    {
        createAPost();
    }
    else if (status === 'postAndSell')
    {
        createAPostAndSell();
    }
  }

  function setstatus(status)
  {
    console.log(status);
  }

  return (
    <div className="mt-5">
      <h1 className="text-center text-2xl text-white"> Create A Post</h1>
      <form onSubmit={viewProductdetail} className="">

            <div className="mt-2 flex flex-col gap-2 justify-center items-center">
            <input
                onChange={gatherProductDetail}
                name="img"
                type="text"
                placeholder="Provide img url"
                className="input input-bordered input-primary w-full max-w-xs hover:border-blue-500"
                required
            />
            <small>
                provide img url..To convirt your img into url use{" "}
                <Link target="blank" className="underline" to="https://imgbb.com/">
                imegebb
                </Link>
            </small>
            <input
                onChange={gatherProductDetail}
                name="price"
                type="text"
                placeholder="Product Price"
                className="input input-bordered input-primary w-full max-w-xs hover:border-blue-500 "
                required
            />

            <input
                onChange={gatherProductDetail}
                name="name"
                type="text"
                placeholder="Product Name"
                className="input input-bordered input-primary w-full max-w-xs hover:border-blue-500"
                required
            />

            <input
                onChange={gatherProductDetail}
                name="aboutProduct"
                type="text"
                placeholder="About Product"
                className="input input-bordered input-primary w-full max-w-xs hover:border-blue-500"
                required
            />

            <input
                onChange={gatherProductDetail}
                name="stock"
                type="text"
                placeholder="Aveable Quantity"
                className="input input-bordered input-primary w-full max-w-xs hover:border-blue-500"
                required
            />

            <select
                value={category}
                onChange={gatherProductDetail}
                className="select select-primary w-full max-w-xs hover:border-2 hover:border-blue-500"
                name="category"
                required
            >
                <option value="default">Category</option>
                <option>Art</option>
                <option>craft</option>
            </select>
            </div>

            <div className="flex justify-center gap-1 mt-2 ">
                
                <button onClick={()=>setstatus('post')} className="btn" type="submit">
                    Post
                </button>
                <button onClick={()=>setstatus('postAndSell')} className="btn" type="submit" >
                 Post and Sell
                </button>
                <button onClick={closePopUpForPost} className="btn">
                    Close
                </button>

            </div>

      </form>
    </div>
  );
};

export default CreateAPost;
