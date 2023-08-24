import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const CreateAPost = () => {
  "https://i.ibb.co/cYLCtBd/cre.png";
  let category;
  let productDetail = {
    userFbUid: null,
    userImg:null,
    id: null,
    seller: null,
    img: null,
    price: null,
    name: null,
    aboutProduct: null,
    quantity: 0,
    totalPrice:0,
    category: null,
    stock: null,
    option: null,
    paymentMethod:null,
    paymentNumber:null
  };

  const navigate = useNavigate();

  let option;

  const { aboutUser } = useContext(AuthContext);

  productDetail.userFbUid = aboutUser.userFbUid;
  productDetail.seller = aboutUser.Name;
  productDetail.userImg = aboutUser.userImg;
  productDetail.paymentMethod = aboutUser.PaymentMethod;
  productDetail.paymentNumber = aboutUser.PaymentNumber;


  function gatherProductDetail(event) {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;

    productDetail[name] = value;
  }

  function closePopUpForPostX() {
    console.log("going to close popup");
    navigate("/profile");
  }

  function createAPost() {
    console.log("i am posting");
    console.log(productDetail);

    fetch("http://localhost:5000/createAPost", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productDetail),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData); // Handle the data
        if (responseData.insertedId)
        {
          const id = responseData.insertedId;
          const idAsObject ={id};
          fetch(`http://localhost:5000/post/autoUpdate/${id}`,
          {
            method:'put',
            headers:
            {
              'content-type':'application/json'
            },
            body:JSON.stringify(idAsObject)
          })
          .then((result)=>result.json())
          .then(data=>{
            console.log(data);
            if(data.modifiedCount>0)
            {
              alert("your post has been created");
            }
          })
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    navigate("/profile");
  }




  function createSell() {
    console.log("create sell");
    console.log(productDetail);

    fetch("http://localhost:5000/createASell", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productDetail),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData); // Handle the data
        if (responseData.insertedId)
        {
          const id = responseData.insertedId;
          const idAsObject ={id};
          fetch(`http://localhost:5000/sell/autoUpdate/${id}`,
          {
            method:'put',
            headers:
            {
              'content-type':'application/json'
            },
            body:JSON.stringify(idAsObject)
          })
          .then((result)=>result.json())
          .then(data=>{
            console.log(data);
            if(data.modifiedCount>0)
            {
              alert("your post has been created");
            }
          })
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    navigate("/profile");
  }

  

  function viewProductDetail(event) {

    event.preventDefault();
    console.log(productDetail.option);

    if (productDetail.category && productDetail.option) 
    {
      if (productDetail.option == "Post") {
        createAPost();
      } 
      
      else if (productDetail.option == "Sell") {
        createSell();
      }
    } 
    else {
      alert("please provide all the detail");
    }
  }

  

  return (
    <div className="mt-60 pb-10">
      <h1 className="text-center text-2xl text-white"> Create A Post</h1>
      <form onSubmit={viewProductDetail} className="">
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

          <select
            value={option}
            onChange={gatherProductDetail}
            className="select select-primary w-full max-w-xs hover:border-2 hover:border-blue-500"
            name="option"
            required
          >
            <option value="default">Option</option>

            <option>Post</option>
            <option>Sell</option>
          </select>
        </div>

        <div className="flex justify-center gap-1 mt-2 ">
          <button type="submit" className="btn">
            Post
          </button>

          <button type="button" onClick={closePopUpForPostX} className="btn">
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAPost;
