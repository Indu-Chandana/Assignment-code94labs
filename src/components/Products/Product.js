import React from 'react'
import { TrashIcon, PencilIcon, StarIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as api from '../../utils/axios';
import { deleteProduct } from '../../store/actions/products';

const Product = ({product}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const editProduct = (_id) => {
        navigate(`/editProduct/${_id}`);
    }

    const dProduct = async(_id) => {
        
        const response = await api.deleteProduct(_id);
        
        if(response?.status === 200) {
            dispatch(deleteProduct(_id));
        }
    }

    return (
        <>
            <div className=' mx-auto items-center text-gray-500 font-semibold'>{product.sku}</div>
            <div className='mx-auto'>
                <img src={`http://localhost:5000/public/${product.productImage}`} alt="" className='h-14 object-contain mb-2' />
            </div>
            <div className='mx-auto w-full text-center'>{product.name}</div>

            <div className='mx-auto'>$24.00</div>
            <div className='mx-auto flex space-x-3'>
                <TrashIcon onClick={() => dProduct(product._id)} className='h-5 text-[#001EB9] cursor-pointer' />
                <PencilIcon onClick={() => editProduct(product._id)} className='h-5 text-[#001EB9] cursor-pointer' />
                <StarIcon className='h-5 text-[#001EB9] cursor-pointer' />
            </div>
            
        </>
    )
}

export default Product