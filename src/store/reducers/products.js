import * as productsActions from '../constans/actionTypes';

const reducer = (products = [], action) => {
    switch (action.type) {
        case productsActions.CREATE:
            return [...products, action.productData];
        case productsActions.FETCH_ALL:
            return action.allData;
        case productsActions.DELETE:
            return products.filter((product) => product._id !== action.id);
        case productsActions.FETCH_BY_SEARCH:
            return action.searchData;
        default:
            return products;
    }
}

export default reducer;