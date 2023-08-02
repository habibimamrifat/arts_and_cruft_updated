import React from 'react';
import { PlusCircleIcon,MinusCircleIcon,TrashIcon } from '@heroicons/react/24/solid';

const ReviewProductInCart = ({productsInCart, reduceFromCart, addMoreToCart,deleteFromCart}) => {


    const {id, name, img, price, quantity} = productsInCart;
    
    return (
        <div>

            <div className='w-[100] bg-slate-800 m-3 rounded-2xl flex justify-between hover:border-solid hover:border-2 hover:border-white'>

              <div className='flex'>
                    <div>
                        <img className='h-28 p-3 rounded-3xl' src={img} alt="" />
                    </div>

                    <div className='text-white p-2'>
                        <p>Name:{name}</p>
                        <p>Price:{price}</p>
                        <p>Quantity:{quantity}</p>
                    </div>
              </div>

                <div className='flex text-white p-2 gap-3'>
                    <button onClick={()=>addMoreToCart(id)} ><PlusCircleIcon className="h-8 w-8 text-white hover:border-solid hover:border-2 hover:border rounded-full " /></button>
                    <button onClick={()=>reduceFromCart(id)}><MinusCircleIcon className="h-8 w-8 text-white hover:border-solid hover:border-2 hover:border rounded-full " /></button>
                    <button onClick={()=>deleteFromCart(id)}><TrashIcon className="h-8 w-8 text-white hover:border-solid hover:border-2 hover:border rounded-full " /></button>
                </div>

            </div>
            
        </div>
    );
};

export default ReviewProductInCart;