import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Products/Product';
import Cart from '../Cart/Cart';
import {  clearCartFromDb, getStored_Cart, store_in_db } from '../../utilities/fakedbTry';

const Shop = () => {
    // responsible for loading data 
    const [products , setProducts] = useState([])
    let [cart, setCart] = useState([])

    useEffect(()=>{
        fetch('http://localhost:5000/shop/fetchFromShopCollection')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);

    useEffect(()=>{
        let savedCart = [];

        const storedShoppingCard = getStored_Cart();
        for (const id in storedShoppingCard)
       {
        const addedProduct = products.find(product => product.id === id )
            if(addedProduct)
            {
            const quantity = storedShoppingCard[id];
            addedProduct.quantity =quantity;

            savedCart.push(addedProduct);
            }
            // console.log(savedCart);
            setCart(savedCart);
       }

    },[products]);

    // console.log(cart);


    const addToCart = (product) =>
    {
        let newCart =[];
        const exist = cart.find(pd => pd.id === product.id)
        if(!exist)
        {
            product.quantity = 1;
            newCart =[...cart, product];
        }
        else{
            exist.quantity = exist.quantity +1;
            const remaining = cart.filter(pd=> pd.id !==product.id)
            newCart =[...remaining, exist];
        }

        setCart(newCart);
        store_in_db(product.id);
    }

    function deleteCart()
    {
        setCart([]);
        clearCartFromDb();
        
    }



    return (
        <div className='shop fixed top-12 overflow-hidden '>
           
            <div className='grid grid-cols-3 gap-2 w-[100%] h-screen relative top-2 overflow-scroll ml-3 pb-80'>
               {
                products.map( product => 
                <Product
                key={product.id}
                product = { product }
                addToCart = {addToCart}
                ></Product>)
               }
            </div>
            
            <div className='fixed right-0 top-20 rounded-lg text-white'>
                {
                    
                <Cart
                 cart={cart}
                 dltCart ={deleteCart}
                ></Cart>
                    
                }
            </div>
        
        </div>
    );
};

export default Shop;