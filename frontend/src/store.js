import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
 
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});

const preloadedState = {}
 
const store = configureStore({
    reducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production', //only show devTools when in production
})
 
export default store