import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const InventoryDetail = () => {

    let [allPost, setAllPost] = useState([]);
    const navigate = useNavigate();

    const { aboutUser } = useContext(AuthContext);
    console.log(aboutUser);

    const [totalStock, setTotalStock] = useState(0);
    
    const [grandTotal, setGrandTotal] = useState(0);

    const currentTime = new Date().toLocaleTimeString();
    const currentDate = new Date().toLocaleDateString();

    function fetchData() {
        if (aboutUser && aboutUser.userFbUid) {
            const userFbUid = aboutUser.userFbUid;
            console.log(userFbUid);

            fetch(`http://localhost:5000/inventoryDetail/${userFbUid}`)
                .then((res) => res.json())
                .then((data) => {
                    //   console.log(data);
                    setAllPost(data);
                    //   console.log(allPost);
                    let stockTotal = 0;
                    let priceTotal = 0;
                    let grandTotal =0;

                    data.forEach((item) => {
                        stockTotal =stockTotal + parseInt(item.stock);
                        priceTotal = parseInt(item.stock) * parseInt(item.price);
                        grandTotal = grandTotal + priceTotal;
                    });

                    setTotalStock(stockTotal);
                    
                    setGrandTotal(grandTotal);
                });
        }
    }

    useEffect(() => {
        fetchData();

    }, [aboutUser]);

    const handlePrint = () => {
        window.print();
    };
    function goBack()
    {
        navigate('/profile/inventory');
    }
    
  
    function reFetchData() 
    {
        fetchData();
    }
    


    return (
        <div className='flex flex-col justify-center items-center mt-10 mx-[1%]'>
            <div className='mb-10 text-center'>
                <h1 className='text-3xl font-bold'>{aboutUser.Name && aboutUser.Name.toUpperCase()}</h1>
                <h1 className='text-lg'>(Inventory)</h1>
                <h1 className='text-lg underline'>A & C</h1>
            </div>
            
            <div>
            <table className='mb-10'>
                <thead className='mb-2 '>
                    <tr>
                        <th className='px-5'>Item Name</th>
                        <th className='px-5'>Stock</th>
                        <th className='px-5'>Price Each</th>
                        <th className='px-5'>Total Price</th>
                    </tr>
                </thead>
                <tbody >
                    {allPost.map((item) => (
                        <tr key={item.id} className='mb-5'>
                            <td className='px-5'>{item.name}</td>
                            <td className='px-5'>{item.stock}</td>
                            <td className='px-5'>{item.price}</td>
                            <td className='px-5'>{item.stock * item.price} TK</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            <div className='flex gap-5 mb-5'>
                <p>Total Stock: {totalStock}</p>
                <p>Grand Total Price: {grandTotal} TK</p>
                <p>Current Time: {currentDate}</p>
                <p>Current Time: {currentTime}</p>
                
                
            </div>
            <div className='flex gap-3'>
                <button className='btn' onClick={goBack}>Go Back</button>
                <button className='btn' onClick={reFetchData}>Refresh</button>
                <button className='btn' onClick={handlePrint}>Print</button>
            </div>

        </div>
    )
}

export default InventoryDetail
