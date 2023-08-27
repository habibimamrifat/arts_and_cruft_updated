import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const CustomerForm = () => {
   
    const customer={Name:null, MobileNo:null, Address:null, personalEmail:null}

    const navigate =useNavigate();

    const collectCustomerData = (event)=>{
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        
        customer[name]=value;
        // console.log(customer);
       
    }
   
    const displayCustomerData =(event)=>
    {
        event.preventDefault();
        const form = event.target;
        
        if(customer.Name !==null && customer.MobileNo !==null
            && customer.Address !==null )
        {
            console.log(customer);
            fetch("http://localhost:5000/customer/signUp",{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(customer)

            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                if(data.insertedId)
                {
                    let customerLsId = { id : data.insertedId }
                    let customerLsIdStringify = JSON.stringify(customerLsId);
                    localStorage.setItem("ArtsAndCraftCustomerId", customerLsIdStringify);
                    // console.log(customer.id);
                   // console.log(customerLsIdStringify);
                   navigate('/Payment')
                }
            })
        }
        else{
            alert("please provide your information again Form might missing value")
            form.reset();
        }
        
        
        console.log(customer.id);
    }




    return (
        <div className='mt-32 flex justify-center items-center'>
            <form onSubmit={displayCustomerData} className='flex flex-col gap-2'>
                <h1 className='text-3xl'>Customer Sign Up</h1>
                <h1 className='text-2xl'>Please provide requared information</h1>

                <input onChange={collectCustomerData} name='Name' type="text" placeholder="Name" className="input input-bordered input-primary w-full max-w-xs" required/>

                <input onChange={collectCustomerData} name='MobileNo' type="text" placeholder="MobileNo" className="input input-bordered input-primary w-full max-w-xs" required/>
                <input onChange={collectCustomerData} name='personalEmail' type="Email" placeholder="Email" className="input input-bordered input-primary w-full max-w-xs" required/>
                
                <textarea onChange={collectCustomerData} name='Address' type="text-box" placeholder="Full Address" className="input input-bordered input-primary w-full max-w-xs" required />

                <button type='submit' className="btn btn-outline btn-primary w-20">Submit</button>
            </form>
            
            {/* <Link to="/Payment">continue</Link> */}
        </div>
    );
};

export default CustomerForm;