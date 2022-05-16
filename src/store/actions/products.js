import { CREATE, DELETE, FETCH_ALL } from '../constans/actionTypes';

export const createProduct = (productData) => {
    return {
        type: CREATE,
        productData
    };
};

export const getProducts = (allData) => {
    return {
        type: FETCH_ALL,
        allData
    }
}

export const deleteProduct = (id) => {
    return {
        type: DELETE,
        id
    }
}