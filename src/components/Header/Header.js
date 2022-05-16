import React, { useState } from 'react'
import { ChevronDownIcon, SearchIcon, StarIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as api from '../../utils/axios'
import { getProductBySearch } from '../../store/actions/products';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');

    const openNewProduct = () => navigate('/add-product');

    const searchPost = async () => {
        if (search.trim()) {
            const response = await api.getProductBySearch(search);
            navigate(`/products/search?searchQuery=${search}`);

            if (response?.status === 200) {
                const searchData = response.data;
                dispatch(getProductBySearch(searchData));
            }
        }
    }

    return (
        <div className='max-w-[80%] mx-auto mt-5 items-center justify-center'>

            <div className=' items-center flex text-center'>
                <div className='flex flex-1' />
                <p className='text-xs'>
                    ADMIN
                </p>

                <ChevronDownIcon className=" ml-3 h-4 mr-5 cursor-pointer" />

                <div className='relative cursor-pointer'>
                    <div className='h-[48px] w-[48px] rounded-full bg-[#001EB9]' />
                    <span className="absolute bottom-0 left-9 h-3 w-3 bg-[#3DF265] text-center rounded-full text-black font-bold"></span>
                </div>
            </div>

            <div className=''>
                <p onClick={() => navigate('/')} className='text-xl tracking-wider font-bold cursor-pointer'>PRODUTS</p>
            </div>

            <div className='flex justify-between mb-7 '>
                <div className=" flex w-full mt-8 hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full  bg-[#f7f7f7] border-gray-200 px-4 py-2 sm:max-w-xl lg:max-w-2xl">
                    <div className='flex w-full items-center ' >
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search for products'
                            type="text"
                            className='flex-grow py-1 ml-4 bg-transparent focus:outline-none'
                        />
                        <div onClick={searchPost} className='flex items-center px-6 py-2 bg-[#001EB9] rounded-full cursor-pointer'>
                            <SearchIcon className="h-5 mr-3 text-white  cursor-pointer" />
                            <p className='text-white '> Search </p>
                        </div>

                    </div>
                </div>

                <div className='flex items-center'>
                    <div onClick={() => openNewProduct()} className='bg-[#001EB9] py-2 px-10 mt-10 rounded-lg cursor-pointer'>
                        <p className='text-white'> New Product </p>
                    </div>
                    <div className='mt-10 cursor-pointer rounded-lg ml-3 border-2 py-1 px-3 border-[#001EB9]'>
                        <StarIcon className='h-7 text-[#001EB9] ' />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Header