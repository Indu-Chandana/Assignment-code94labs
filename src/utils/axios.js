import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})

export const createProduct = (newProduct) => API.post('/products', newProduct);
export const getproducts = () => API.get(`/products`);
export const updateProduct = (id, formData) => API.patch(`/products/${id}`, formData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const getProductBySearch = (searchQuery) => API.get(`/products/search?searchQuery=${searchQuery}`);