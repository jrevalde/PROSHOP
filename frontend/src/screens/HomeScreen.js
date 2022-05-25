import React, {useState, useEffect} from 'react'; //we use the useEffect hook to make a request to our backend
//import products from '../products'; //We want axios to request this data from our backend
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product'; 
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async() =>
    {
      const {data} = await axios.get('/api/products');

      setProducts(data); 
    }

    fetchProducts();

  }, []);

  return (
    <>
      <h1>Latest Prodcts</h1>
      <Row>
          {
              products.map(
                  product => 
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                  </Col>
              )
          }
      </Row>
    </>
  )
}

export default HomeScreen
