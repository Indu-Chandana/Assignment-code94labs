import { combineReducers } from 'redux';
import productReducer from './reducers/products';

export default combineReducers({
    products: productReducer
});