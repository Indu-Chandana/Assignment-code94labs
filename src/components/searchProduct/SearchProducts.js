import React from 'react'
import { useSelector } from 'react-redux';
import Header from '../Header/Header'
import SearchProduct from './SearchProduct';

const SearchProducts = () => {
  const products = useSelector((state) => state.products.data);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchValue = urlParams.get('searchQuery');
  console.log(searchValue);
  return (
    <>
      <Header />

      <div className='max-w-[80%] bg mx-auto'>
        
        <p className='text-2xl font-semibold text-[#969191] tracking-widest'>{products.length} results found for '{searchValue}'</p>
        {products.map((product) => (
          <div key={product._id} className='max-w-[80%] mx-auto border-b-[0.4px] border-gray-500 mt-10'>
            <SearchProduct product={product} />
          </div>
        ))}

      </div>
    </>
  )
}

export default SearchProducts