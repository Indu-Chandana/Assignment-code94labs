import React from 'react'
import { useSelector } from 'react-redux';

import Product from './Product';

const Products = () => {
    const products = useSelector((state) => state.products);

    if (!products.length) return 'No Products. Please add a new product.';

    return (
        <div>
            {products.map((product) => (
                <div key={product._id} className='grid gap-4 grid-cols-5 h-13 items-center mb-5 border-b-[0.4px] border-gray-500' >
                    <Product product={product}/>    
                </div> 
            ))}
        </div>
    )
}

export default Products