import React from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'

const ViewDetail = () => {
    const navigate = useNavigate()

    const loadedProduct= useLoaderData()
    console.log(loadedProduct)

    function goBack()
    {
        navigate('/shop')
    }

  return (
    <div >
                
                    <div className="mt-[5%] mx-[2%]  rounded-md  bg-slate-600 shadow-2xl shadow-slate-950">



                        <div className=" shadow-x bg-slate-800 hover:border-solid hover:border-2 hover:border-slate-400 ">

                           <div className='flex justify-between items-center'>
                           <Link to={`/viewProfile/${loadedProduct.userFbUid}`}>
                                <div className="flex px-5 py-2  items-center hover:bg-slate-600 rounded-full">
                                    <div className="h-10 w-10 rounded-full bg-white mr-5">
                                        <img
                                            src={loadedProduct.userImg}
                                            alt=""
                                            className="h-full w-full object-fill rounded-full"
                                        />
                                    </div>
                                    <div>
                                        <p>{loadedProduct.seller}</p>
                                    </div>
                                </div>
                            </Link>


                            <div className="flex px-5 py-2  items-center hover:bg-slate-600 rounded-full">
                                <button onClick={goBack}>goback</button>
                            </div>
                           </div>

                            <div className=''>
                                <img className=' h-[100%] w-[100%] object-cover rounded-2xl' src={loadedProduct.img} alt="img not found" />
                            </div>


                            <div className=" p-2">
                                <h2 className="p-1">
                                    Name:{loadedProduct.name}
                                </h2>
                                <p>
                                    Price:{loadedProduct.price}
                                </p>
                                <p>
                                    Seller Name:{loadedProduct.seller}
                                </p>
                                <p>
                                    Shipping:{loadedProduct.shipping}
                                </p>
                                <p>
                                    In Stock:{loadedProduct.stock}
                                </p>
                                <p>
                                    About Product:{loadedProduct.aboutProduct}
                                </p>
                            </div>

                            {/* <div className='flex  justify-around pb-4 mt-2'>
                                <button onClick={() => addToCart(props.product)} className='p-1 rounded-lg border-solid border-2 border-slate-700  text-slate-300 hover:scale-x-[1.1] duration-500'>
                                    Add to Cart
                                </button>


                                <button
                                    onClick={() => closeDropdown(id)}
                                    className="px-5 m-1 hover:bg-slate-100 rounded-xl text-red-400"
                                >
                                    Close
                                </button>


                            </div> */}
                        </div>





                    </div>
            
            </div>
  )
}

export default ViewDetail
