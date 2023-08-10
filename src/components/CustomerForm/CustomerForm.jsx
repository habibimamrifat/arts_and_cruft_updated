import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const CustomerForm = () => {
    const {customer, setCustomer,setCustomerPermission}=useContext(AuthContext);
    const navigate =useNavigate();

    const collectCustomerData = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        
        let Customer ={...customer,[name]:value}
        setCustomer(Customer);
       
    }
   
    const displayCustomerData =(event)=>
    {
        event.preventDefault();
        console.log(customer);
        if(customer.customerName && customer.customerMobileNumber
            && customer.customerAddress )
        {
            setCustomerPermission(true)
        }
        
        navigate('/Payment')
    }

    // if((customer.customerName=''|| customer.customerMobileNumber=''||customer.customerAddress=''||customer.GrandTotal:''||customer.customerCart=[{}]))


    return (
        <div className='mt-32 flex justify-center items-center'>
            <form onSubmit={displayCustomerData} className='flex flex-col gap-2'>
                <h1 className='text-2xl'>Please provide requared information</h1>

                <input onChange={collectCustomerData} name='customerName' type="text" placeholder="Name" className="input input-bordered input-primary w-full max-w-xs" />

                <input onChange={collectCustomerData} name='customerMobileNumber' type="text" placeholder="MobileNo" className="input input-bordered input-primary w-full max-w-xs" />
                
                <input onChange={collectCustomerData} name='customerAddress' type="text" placeholder="Address" className="input input-bordered input-primary w-full max-w-xs" />

                <button type='submit' className="btn btn-outline btn-primary w-20">Submit</button>
            </form>
            
            {/* <Link to="/Payment">continue</Link> */}
        </div>
    );
};

export default CustomerForm;