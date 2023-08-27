import React, { useState } from 'react';

import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom';

const Product = (props) => {

    const { img, name, price, seller, userImg, userFbUid, id , aboutProduct, shipping, stock} = props.product;

    const addToCart = props.addToCart;



    return (
        <div >


            <div className="card  shadow-x bg-slate-800 hover:border-solid hover:border-2 hover:border-slate-400 ">

                <Link to={`/viewProfile/${userFbUid}`}>
                    <div className="flex px-5 py-2  items-center hover:bg-slate-600 rounded-full">
                        <div className="h-10 w-10 rounded-full bg-white mr-5">
                            <img
                                src={userImg}
                                alt=""
                                className="h-full w-full object-fill rounded-full"
                            />
                        </div>
                        <div>
                            <p>{seller}</p>
                        </div>
                    </div>
                </Link>

                <div className='h-56'>
                    <img className=' h-[100%] w-[100%] object-cover rounded-2xl' src={img} alt="img not found" />
                </div>


                <div className="h-28 p-2">
                    <h2 className="p-1">
                        Name:{name}
                    </h2>
                    <p>
                        Price:{price}
                    </p>
                    <p>
                        Seller Name:{seller}
                    </p>
                </div>

                <div className='flex  justify-around pb-4 mt-2'>
                    <button onClick={() => addToCart(props.product)} className='p-1 rounded-lg border-solid border-2 border-slate-700  text-slate-300 hover:scale-x-[1.1] duration-500'>
                        Add to Cart
                    </button>

                    <Link to={`/viewDetail/${id}`}>
                    <button className='p-1 border-solid border-2 border-slate-700  rounded-lg text-slate-300 hover:scale-x-[1.1] duration-500'>
                        View Details
                    </button>
                    </Link>
                </div>
            </div>


            {/* ........try modal...........  */}
            

        </div>
    );
};

export default Product;