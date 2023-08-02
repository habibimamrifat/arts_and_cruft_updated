import { json } from "react-router-dom";

function store_in_db( id )

{


    let shoppingCart;
    let itemQuantity = 1;

    let storedShoppingCart;
    
    
    storedShoppingCart = localStorage.getItem('storedShoppingCart')
    if(storedShoppingCart)
    {
        shoppingCart = JSON.parse(storedShoppingCart);
        itemQuantity = shoppingCart[id];
        if(itemQuantity)
        {
            const newItemQuantity = itemQuantity+1;
        shoppingCart[id]=newItemQuantity;
        }
        else
        {
           shoppingCart[id]=1; 
        }
        
         
    }
    else
    {
     shoppingCart ={};
     shoppingCart[id]=itemQuantity;
    }

    shoppingCart = JSON.stringify(shoppingCart);
    storedShoppingCart = localStorage.setItem('storedShoppingCart',shoppingCart);
}

function reduce_from_db( id )

{


    let shoppingCart;
    let itemQuantity;

    let storedShoppingCart;
    
    
    storedShoppingCart = localStorage.getItem('storedShoppingCart')
    if(storedShoppingCart)
    {
        shoppingCart = JSON.parse(storedShoppingCart);
        itemQuantity = shoppingCart[id];
        if(itemQuantity)
        {
            const newItemQuantity = itemQuantity-1;
        shoppingCart[id]=newItemQuantity;
        }
        else
        {
           shoppingCart[id]=0; 
        }
        
         
    }

    shoppingCart = JSON.stringify(shoppingCart);
    storedShoppingCart = localStorage.setItem('storedShoppingCart',shoppingCart);
}


function delete_from_db_cart( id )

{


    let shoppingCart;
    let itemQuantity;

    let storedShoppingCart;
    
    
    storedShoppingCart = localStorage.getItem('storedShoppingCart')
    if(storedShoppingCart)
    {
        shoppingCart = JSON.parse(storedShoppingCart);
        itemQuantity = shoppingCart[id];
        if(itemQuantity)
        {
           delete shoppingCart[id];
        }    
    }

    shoppingCart = JSON.stringify(shoppingCart);
    storedShoppingCart = localStorage.setItem('storedShoppingCart',shoppingCart);
}

function getStored_Cart()
{
    let storedShoppingCart ={};
    const storedCard = localStorage.getItem('storedShoppingCart');
    if(storedCard)
    {
        storedShoppingCart =JSON.parse(storedCard);
    }
  return storedShoppingCart;
}

function clearCartFromDb()
{
    localStorage.removeItem('storedShoppingCart');
}

export {
    store_in_db,
    getStored_Cart,
    reduce_from_db,
    delete_from_db_cart,
    clearCartFromDb
};