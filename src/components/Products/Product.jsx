import React from 'react';

import ReactDOM from 'react-dom'

const Product = (props) => {
    
    const {img, name, price, seller } = props.product;

  const addToCart =props.addToCart;

    return (
        <div >


            <div className="card  shadow-x bg-slate-800 hover:border-solid hover:border-2 hover:border-slate-400 ">

                <div className='h-56'>
                <img className=' h-[100%] w-[100%] object-cover rounded-2xl' src={img}  alt="img not found" />
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
                    <button onClick={() => addToCart(props.product)}  className='p-1 rounded-lg border-solid border-2 border-slate-700  text-slate-300 hover:scale-x-[1.1] duration-500'>
                        Add to Cart
                    </button>
                    <button className='p-1 border-solid border-2 border-slate-700  rounded-lg text-slate-300 hover:scale-x-[1.1] duration-500'>
                        View Details
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default Product;