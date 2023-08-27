import React, { useContext, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate()
    const {changePasswordFromSettings}=useContext(AuthContext);
    const [error, setError]=useState('');

    function ChangePassword(event)
    {
        event.preventDefault();
        const form =event.target;
        let password = form.password.value;
        let confirmPassword = form.confirmPasword.value;
        let newPassword = password;
        console.log(newPassword);

        if(password === confirmPassword)
        {
           
            // changePasswordFromSettings(newPassword)
            // .then(()=>{
            //     alert('password changed');
            // })
            // .catch(error=>{
            //     setError(error);
            // })

            changePasswordFromSettings(newPassword)
                .then(() => {
                    alert('Password changed');
                    navigate('/profile');
                })
                .catch(error => {
                    setError(error.message); // Set the error message
                });

        }
    }
    return (
        <div className='mt-52 pb-10'>
            <form onSubmit={ChangePassword} className='flex flex-col justify-center items-center gap-3'>
                <h1 className='text-4xl'>Change password</h1>

                <input  name='password' type="text" placeholder='Create new passeord' className="input input-bordered input-primary w-full max-w-xs" />
                <input   name='confirmPasword' type="text" placeholder='Confirm new passeord' className="input input-bordered input-primary w-full max-w-xs"/>

                <button type='submit' className="btn btn-outline btn-primary"> Confirm </button>
            </form>
            <p>{error}</p>
        </div>
    );
};

export default Settings;