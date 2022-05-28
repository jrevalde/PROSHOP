import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from '../constants/productconstants';
import axios from 'axios';
//redux think allows us to use a function within a function.
export const listProducts = () => async (dispatch) =>//this will perform the same thing as our useEffect(); in the homescreen component. (make an api call backend server for all products in database.)
{
    try 
    {
            dispatch({type: PRODUCT_LIST_REQUEST});

            const {data} = await axios.get('/api/products');

            dispatch({type: PRODUCT_LIST_SUCCESS, payload: data}); //
    }
    catch (error)
    {
        dispatch({type: PRODUCT_LIST_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message});
    }
}

export const listProductDetails = (id) => async (dispatch) =>//this will perform the same thing as our useEffect(); in the homescreen component. (make an api call backend server for all products in database.)
{
    try 
    {
            dispatch({type: PRODUCT_DETAILS_REQUEST});

            const {data} = await axios.get(`/api/products/${id}`);

            dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data}); //
    }
    catch (error)
    {
        dispatch({type: PRODUCT_DETAILS_FAIL, error: error.response && error.response.data.message ? error.response.data.message : error.message});
    }
}


