import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const Settings = () => {
    const {changePasswordFromSettings}=useContext(AuthContext);

    function ChangePassword(event)
    {
        event.preventDefault();
        const form =event.target;
        let password = form.password.value;
        let confirmPassword = form.confirmPasword.value;
        if(password === confirmPassword)
        {
            changePasswordFromSettings(password);
        }
    }
    return (
        <div className='pt-20'>
            <form onSubmit={ChangePassword}>
                <h1>Change password</h1>
                <input  name='password' type="text" placeholder='Create new passeord' />
                <input   name='confirmPasword' type="text" placeholder='Confirm new passeord' />
                <button type='submit'> Confirm </button>
            </form>
        </div>
    );
};

export default Settings;