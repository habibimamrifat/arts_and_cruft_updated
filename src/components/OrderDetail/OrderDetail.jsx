import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewProductInCart from '../RevievContainerInOrderDetail/ReviewProductInCart';
import {  clearCartFromDb, delete_from_db_cart, reduce_from_db, store_in_db } from '../../utilities/fakedbTry';



const OrderDetail = () => {

    const addedInCart = useLoaderData();
    console.log(addedInCart);
    const [newCart, setNewCart]= useState(addedInCart);

    const addMoreToCart = (id) =>{
        
        const addMore = newCart.find(item => item.id === id)
          
            addMore.quantity=addMore.quantity+1;
            let UnChangedItem = newCart.filter(item =>item.id !== id);
            
            UnChangedItem.push(addMore);
           
            store_in_db(id);
        
        setNewCart(UnChangedItem);
        
    }


    const reduceFromCart = (id) =>
    {
        const addMore = newCart.find(item => item.id === id)
        if(addMore)
        {    
            addMore.quantity=addMore.quantity-1;
            let UnChangedItem = newCart.filter(item =>item.id !== id);
            console.log(UnChangedItem);
            UnChangedItem.push(addMore);
            console.log(UnChangedItem);
            reduce_from_db(id);
            setNewCart(UnChangedItem);
        }
        
    }

    
    const deleteFormCart= (id) =>{

        const UnChangedItem = newCart.filter(item => item.id !== id)
        if(UnChangedItem)
        {    
            setNewCart(UnChangedItem);
        }
        
        delete_from_db_cart(id);
    }

    function deleteCart()
    {
        setNewCart([]);
        clearCartFromDb();
    }
  
    
    return (
       
        <div className='flex'>

            <div className='w-[50%] p-10 mt-10'>
                {
                    newCart.map(productsInCart => <ReviewProductInCart
                    key={productsInCart.id}
                    reduceFromCart={reduceFromCart}
                    addMoreToCart={addMoreToCart}
                    deleteFromCart={deleteFormCart}
                    productsInCart={productsInCart}
                    ></ReviewProductInCart>)
                }

            </div>
            
            <div className='rounded-lg text-white w-[50%] p-10 fixed top-20 left-[50%]'>
                {    
                <Cart
                cart={newCart}
                dltCart ={deleteCart}
                ></Cart>
                }
            </div>
        </div>
    );
};

export default OrderDetail;