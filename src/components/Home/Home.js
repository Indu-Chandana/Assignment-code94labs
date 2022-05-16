import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

import * as api from '../../utils/axios';
import { getProducts } from '../../store/actions/products';
import Header from '../Header/Header'
import Products from '../Products/Products';

const Home = () => {
    const dispatch = useDispatch();
   
    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async() => {
        const response = await api.getproducts();

        if(response?.status === 200) {
            const productDatas = response.data
            dispatch(getProducts(productDatas));
        }
    }


    return (
        <>
            <Header />
            
            <div className='max-w-[85%] bg mx-auto'>
                <div className='grid gap-4 grid-cols-5 mb-5 ' >
                    <div className=' mx-auto text-[#001EB9] font-bold'>SKU</div>
                    <div className='mx-auto text-[#001EB9] font-bold'>IMAGE</div>
                    <div className='mx-auto text-[#001EB9] font-bold'>PRODUCT NAME</div>

                    <div className='mx-auto text-[#001EB9] font-bold'>PRICE</div>
                    <div className='mx-auto text-[#001EB9] font-bold'></div>
                </div>
                <Products/>
            </div>
        </>
    )
}

export default Home