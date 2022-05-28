import React, {useEffect} from 'react'; //we use the useEffect hook to make a request to our backend
//import products from '../products'; //We want axios to request this data from our backend
import {useDispatch, useSelector} from 'react-redux'; //useDispatch to dispatch//call an action, useSelector let's us select part of the state instead of all the state.
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product'; 
import Message from '../components/Message';
import Loader from '../components/Loader';
//import axios from 'axios'; //don't need this anymore. we are handling api call in productActions.js

import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  //const [products, setProducts] = useState([]); || no need to set products as our local state anymore :)

  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList); //you wanna name this the same as what is in your store.

  const {products, loading, error} = productList;

  useEffect(() => {
    /*const fetchProducts = async() =>
    {
      const {data} = await axios.get('/api/products');

      setProducts(data); 
    }

    fetchProducts();*/
    dispatch(listProducts())
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
      <Row>
          {
              products.map(
                  product => 
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                  </Col>
              )
          }
      </Row> }
      
    </>
  )
}

export default HomeScreen
