import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartconstants';


export const addToCart = (id, qty) => async (dispatch, getState) => //we want to save our cart contents in local storage. so we use getststate
{
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)); //We can only save strings in local storage.
}

export const removeFromCart = (id) => (dispatch, getState) =>
{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id

    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}