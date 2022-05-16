import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/outline';
const SearchProduct = ({product}) => {
    return (
        <div className='flex items-center'>
            <div className='flex-grow'>
                <p className='text-[#001EB9] text-sm font-medium'>{product.sku}</p>
                <p className='font-bold text-lg'>{product.name}</p>
                <p className='text-[#969191] text-sm mb-5'>{product.desc}</p>
            </div>
            <ChevronRightIcon className='h-8 text-[#001EB9] mb-5'/>
        </div>
    )
}

export default SearchProduct