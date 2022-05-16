import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid'

import { createProduct } from '../../store/actions/products';
import * as api from '../../utils/axios'


const AddProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filepickerRef = useRef(null);

    let { id } = useParams();

    const [productDetails, setProductDetails] = useState({
        sku: '', name: '', qty: '', desc: '', pic: ''
    });
    const [imageToPost, setImageToPost] = useState(null)

    const editProductDeatails = useSelector((state) => (id ? state.products.find((message) => message._id === id) : null));

    useEffect(() => {
        if (editProductDeatails) setProductDetails(editProductDeatails)
    }, [id, editProductDeatails]);


    const handleClick = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('sku', productDetails.sku);
        formData.append('name', productDetails.name);
        formData.append('qty', productDetails.qty);
        formData.append('desc', productDetails.desc);
        formData.append('photo', productDetails.pic);

        if (id && editProductDeatails) {

            // edit product
            await api.updateProduct(id, formData)
            navigate('/products');

        } else {

            // new product
            // console.log(productDetails)
            const response = await api.createProduct(formData);
            navigate('/products');

            if (response?.status === 201) {
                const productData = response.data
                dispatch(createProduct(productData));
            }
        }
    }

    const onInputChange = (e) => {
        setProductDetails({ ...productDetails, pic: e.target.files[0] })

        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result)
        };
    }

    const removeImage = () => {
        setImageToPost(null);
        setProductDetails({ ...productDetails, pic: '' });
    }

    return (
        <div className='max-w-[80%]  mx-auto mt-5'>
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

            <div className='flex items-center mt-8'>
                <h1 className='text-4xl tracking-widest font-bold' >PRODUCTS</h1>
                <ChevronRightIcon className=' h-10 mx-5 text-[#001EB9]' />
                <h1 className='text-xl tracking-widest font-bold text-[#001EB9]' >{id ? 'Editing' : 'Add new'} Product</h1>
            </div>

            <form onSubmit={handleClick} encType="multipart/form-data">
                <div className='grid gap-2 grid-cols-2 mt-10'>
                    <div className=' col-start-1 col-end-2 flex items-center mb-8'>
                        <p className='mr-11 text-lg font-medium'>SKU</p>
                        <input
                            value={productDetails.sku}
                            onChange={(e) => setProductDetails({ ...productDetails, sku: e.target.value })}
                            type="text"
                            className='px-4 bg-[#f7f7f7] grow py-3 focus:outline-none rounded-lg '
                        />
                    </div>

                    <div className=' col-start-1 col-end-2'>
                        <div className=' col-start-1 col-end-2 flex items-center'>
                            <p className='mr-7 text-lg font-medium'>Name</p>
                            <input
                                value={productDetails.name}
                                onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
                                type="text"
                                className='px-4 bg-[#f7f7f7] grow py-3 focus:outline-none rounded-lg '
                            />
                        </div>
                    </div>
                    <div className='ml-8'>
                        <div className=' col-start-1 col-end-2 flex items-center'>
                            <p className='mr-7 text-lg font-medium'>QTY</p>
                            <input
                                value={productDetails.qty}
                                onChange={(e) => setProductDetails({ ...productDetails, qty: e.target.value })}
                                type="text"
                                className='px-4 bg-[#f7f7f7] grow py-3 focus:outline-none rounded-lg '
                            />
                        </div>
                    </div>
                </div>

                <div className='mt-10'>
                    <p className='mr-7 text-lg font-medium'>Product Description</p>
                    <p className='text-slate-700'>A small description about the product</p>
                    <textarea
                        value={productDetails.desc}
                        onChange={(e) => setProductDetails({ ...productDetails, desc: e.target.value })}
                        className='w-full px-4 py-2 h-40 bg-[#f7f7f7] focus:outline-none'></textarea>
                </div>

                <div className='flex space-x-20 mt-10'>
                    <div>
                        <p className='mr-7 text-lg font-medium'> Product Images</p>
                        <p className='text-slate-700'>JPEG, PNG or GIF <br /> (Maximum file size 50MB)</p>
                    </div>

                    <div onClick={() => filepickerRef.current.click()} className='cursor-pointer'>
                        <span className='border-b-2 text-[#001EB9] border-[#001EB9]'>Add Images</span>
                        <input ref={filepickerRef} onChange={onInputChange} type="file" hidden />
                    </div>
                    {imageToPost && (
                        <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                            <img className="h-10 object-contain" src={imageToPost} alt="" />
                            <p className="text-xs text-red-500 text-center">Remove</p>
                        </div>
                    )}
                </div>

                <div className='items-center flex text-center '>
                    <div className='flex flex-1' />
                    <button
                        type='submit'
                        className='bg-[#001EB9] px-9 py-3 text-white font-semibold rounded-lg cursor-pointer'>
                        {id ? 'Edit' : 'Add'} product
                    </button>
                </div>
            </form>

        </div>
    )
}



export default AddProduct