import React, { useContext, useEffect } from "react";
import Product from "./../Products/Product";
import { Link } from "react-router-dom";
import { Bars4Icon } from "@heroicons/react/24/solid";
import { AuthContext } from "../provider/AuthProvider";

const Cart = ({ cart, dltCart }) => {

  // console.log(cart);
  // const {customer, setCustomer}=useContext(AuthContext);
  // useEffect(()=>{
  //   let customerProduct={...customer,customerCart:cart}
  //   setCustomer(customerProduct);
  // },[cart])

  // console.log(customer);

  let price = 0;
  let tax = 0;
  let grandTotal = 0;
  let quantity = 0;
  let shipping = 0;
  // console.log(cart);

  for (const product of cart) {
    quantity = quantity + parseInt(product.quantity);
    price = price + parseInt(product.price) * parseInt(product.quantity);
    shipping = shipping + parseInt(product.quantity) * product.shipping;
    tax = (price * 10) / 100;
    grandTotal = price + shipping;
  }

  // useEffect(()=>{
  //   let customerProduct={...customer,GrandTotal:grandTotal}
  //   setCustomer(customerProduct);
  // },[grandTotal])

  return (
    <div className="max-h-screen bg-slate-800 ml-5 items-center px-5 py-5 rounded-lg hover:border-solid hover:border-2 hover:border-slate-400">
      <div className="mt-16 mb-16">
        <h1 className="font-extrabold">Order Summary</h1>
        <h1>
          <span className="font-bold"> Total Selected:</span> {quantity}
        </h1>
        <p>
          <span className="font-semibold"> total price:</span> ${price}
        </p>
        <p>
          <span className="font-semibold"> Total shipping cost:</span> $
          {shipping}
        </p>
        <p>
          <span className="font-semibold"> Total tax:</span> ${tax.toFixed(2)}
        </p>
        <p>
          <span className="font-semibold"> Grand Total:</span> $
          {grandTotal.toFixed(2)}
        </p>
      </div>

      <div className=" flex flex-col gap-1">
        {/* <button className=" bg-gray-900 p-1 rounded-3xl hover:border-solid hover:border-2 hover:border-slate-400">
        <Link to="/history">History</Link>
        </button> */}

        <button
          onClick={dltCart}
          className=" bg-gray-900 p-1 rounded-3xl hover:border-solid hover:border-2 hover:border-slate-400 text-red-700"
        >
          Delete Cart
        </button>

        <button className=" bg-gray-900 p-1 rounded-3xl hover:border-solid hover:border-2 hover:border-slate-400">
          <Link to="/oederdetail">Order Detail</Link>
        </button>

        <button className=" bg-gray-900 p-1 rounded-3xl hover:border-solid hover:border-2 hover:border-slate-400">
          <Link to="/Payment">Continue</Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
