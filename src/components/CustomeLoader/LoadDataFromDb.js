import { getStored_Cart } from "../../utilities/fakedbTry";

const LoadDataFromDb = async ()=>{

    const dataFromAll = await fetch('http://localhost:5000/shop/fetchFromShopCollection');
    const productsFromAll = await dataFromAll.json();
   
    let addedInCart = [];

    const storedShoppingCart = getStored_Cart()
    for (const id in storedShoppingCart)
    {
      const addedProduct =  productsFromAll.find( pd => pd.id === id)
      if(addedProduct)
      {
        const quantity = storedShoppingCart[id];
        addedProduct.quantity= quantity;

        addedInCart.push(addedProduct);
      }

      
    }
    
    return addedInCart;

}
export { LoadDataFromDb };