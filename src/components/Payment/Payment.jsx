import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const {customer,finalCart,finalGrandTotal} = useContext(AuthContext)
    
  
    console.log(customer,finalCart,finalGrandTotal);

    return (
        <div className='mt-10'>
            <h1>payment</h1>
           <div className='flex justify-around'>
                <div className=''>
                    <div>
                    <h1>Customer Detail</h1>
                    <p>Name:{customer.customerName}</p>
                    <p>Mobile No:{customer.customerMobileNumber}</p>
                    <p>Address:{customer.customerAddress}</p>
                    <p>GrandTotal:{customer.GrandTotal}</p>

                    </div>
                    <div>
                        <h1>Product Detail</h1>
                        <ul>
                {customer.customerCart.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price.toFixed(2)}
                    </li>
                ))}
            </ul>

                    </div>
                </div>
                <div className='mt-10'>
                    <h1>Payment Method</h1>
                    <div className='list-none'>
                    <li>BKash</li>
                    <li>Nagad</li>
                    <li>Rocket</li>
                    </div>
                    <h1>Cash on Delivery</h1>
                </div>
           </div>
        </div>
    );
};

export default Payment;