import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShop, faWarehouse, faChartSimple, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

const ProfileRightSide = () => {
    return (
        <div>
        <li className='list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center'><button> <FontAwesomeIcon icon={faShop} className='p-1 mr-1' /><span className='hidden md:inline'>Shop</span></button></li>

        <li className='list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center'><button> <FontAwesomeIcon icon={faWarehouse} className='p-1 mr-1' /><span className='hidden md:inline'>Inventory</span> </button></li>

        <li className='list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center'><button> <FontAwesomeIcon icon={faChartSimple} className='p-1 mr-1'/> <span className='hidden md:inline'>Sells</span></button></li>

        <li className='list-none p-5 m-2 bg-slate-800 rounded-2xl hover:border-2 to-blue-700 text-center'><button> <FontAwesomeIcon icon={faCirclePlus} className='p-1 mr-1' /><span className='hidden md:inline'>Add Item</span></button></li>
     </div>
    );
};

export default ProfileRightSide;