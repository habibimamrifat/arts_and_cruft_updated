import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Payment = () => {

    const loaderData = useLoaderData()
    // console.log(loaderData);
    
    const [customer, setCustomer] = useState(null);
    const [grandTotal, setGrandTotal] = useState(0);





    function getcustomer() {
        const storedCustomerLsIdStringify = localStorage.getItem("ArtsAndCraftCustomerId");
        if (storedCustomerLsIdStringify) {
            const customerFromLocalStorage = JSON.parse(storedCustomerLsIdStringify);
            let id = customerFromLocalStorage.id;
            console.log(id);
            fetch(`http://localhost:5000/payment/customerSearch/${id}`)
                .then(res => res.json())
                .then(data => {
                    setCustomer(data); // Set the customer data from localStorage
                })
                .catch(error => {
                    console.error(error);
                });
        }
        else {
            const loggedinUserUidString = localStorage.getItem('artAndCraftloggedInUserUid');
            if (loggedinUserUidString) {
                const loggedinUserUid = JSON.parse(loggedinUserUidString);
                const id = loggedinUserUid.Uid;
                // console.log(id);
                fetch(`http://localhost:5000/payment/userSearch/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        setCustomer(data); // Set the customer data from loggedInUserUid
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }

    }



    useEffect(() => {
        getcustomer();

    }, [])


    useEffect(() => {
        let grandTotal = 0;
        loaderData.map(item => {
            grandTotal = grandTotal + (item.quantity * item.price)

        })
        setGrandTotal(grandTotal)
    })

    // console.log(customer);

    // fetch(`http://localhost:5000/confirmPurcase/getPurchaseItem/${id}`)
    // .then(res=>res.json())
    // .then(data=>{
    //     const inStore = parseInt(data.stock) ;
    //     let remainingInStore = inStore - soldQuantity;
    //     console.log(remainingInStore);
    // })

    function confirmPerches() {
        // console.log('going to be mesagar')
        // console.log(loaderData);
        // console.log(customer)

        // let productgotSold ={customerName:null, customerMobile:null, customerEmail:null,customerAddress:null}

        loaderData.map((item) => {
            let soldQuantity = item.quantity;
            let inStock = item.stock;
            let id = item.id;
            let remainingInStock = inStock - soldQuantity;


            if (remainingInStock < 0) {
                const confirmationMessage = `The item is out of stock. Maximum ${inStock} available. Do you want to take it all?`;
                const userConfirmed = window.confirm(confirmationMessage);
                if (userConfirmed) {
                    soldQuantity = inStock;
                    console.log("User clicked Yes");
                    let neededToChange = loaderData.find((item) => item.id === id)
                    neededToChange.quantity = soldQuantity;
                    remainingInStock=0;

                } else {
                    soldQuantity = 0;
                    console.log("User clicked No");
                    let neededToChange = loaderData.find((item) => item.id === id)
                    neededToChange.quantity = soldQuantity;
                    remainingInStock=inStock;
                }
            }

            console.log(loaderData);
            console.log(remainingInStock, soldQuantity);
            let updateInventoryStock ={remainingInStock}
            console.log(updateInventoryStock);


             fetch(`http://localhost:5000/confirmPurcase/updateInventoryItem/${id}`,{
                method:'put',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(updateInventoryStock)
             })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);

                // console.log('customer',customer);
                console.log('item',item);


                let customerName = customer.Name;
                console.log(customerName);
            })

            // fetch(`http://localhost:5000/confirmPurcase/getPurchaseItem/${id}`)
            // .then(res=>res.json())
            // .then(data=>{
            //     const inStore = data.stock;
            //     console.log(inStore);
            //     console.log(data);
            // })
           


        })
    }


    return (
        <div className='mt-10'>
            <h1>payment</h1>
            <div className='flex justify-around'>
                <div className='mt-10'>
                    {customer && (
                        <div>
                            <h1 className='text-4xl'>Customer Detail</h1>
                            <p>Name: {customer.Name}</p>
                            <p>Mobile No: {customer.MobileNo}</p>
                            <p>Address: {customer.Address}</p>
                        </div>
                    )}

                    <div className=''>
                        <h1 className='text-lg mt-10'>Product Detail</h1>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loaderData.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity * product.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h1 className='mt-10'>Grandtotal:{grandTotal}</h1>

                    </div>
                    <div className='mt-10'>
                        <button onClick={()=>confirmPerches()} className='btn bg-orange-500 '>Confirm</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payment;