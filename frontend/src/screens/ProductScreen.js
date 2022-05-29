import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux';
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
//import axios from 'axios'; || now making api calls in productActions.js
//import products from '../products';  || Don't need this anymore since we are getting our data from api


const ProductScreen = (history) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const {id} = useParams();//returns the number of the product id
    const navigate = useNavigate();
    /*const product = products.find((p) => p._id === id)   || no need since we are fetching data from backend*/
    
    //const [product, setProduct] = useState({}); //default value is an empty object because product is an object.
    
    const productDetails = useSelector(state => state.productDetails);

    const {error, loading, product} = productDetails;

    useEffect(() => 
    {
        /*const fetchProduct = async() =>
        {
          const {data} = await axios.get(`/api/products/${id}`);
    
          setProduct(data); 
        }
    
        fetchProduct();*/

        dispatch(listProductDetails(id));
    
    }, [dispatch, id]);

    //usually put the handlers before the useEffect
    const addToCartHandler = () =>
    {
        navigate(`/cart/${id}?qty=${qty}`); //the push method adds new items to the end of an array.
    }

  return (
    <>
       <Link className='btn btn-dark my-3' to='/'>Go Back</Link>

       {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : 
             <Row>
             <Col md={6}>
                 <Image src={product.image} alt={product.name} fluid/>
             </Col>
             <Col md={3}>
                 <ListGroup variant='flush'>
                     <ListGroup.Item>
                         <h3>{product.name}</h3>
                     </ListGroup.Item>
                     <ListGroupItem>
                         <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                     </ListGroupItem>
                     <ListGroupItem>
                         Price: ${product.price}
                     </ListGroupItem>
                     <ListGroupItem>
                         Desccription: {product.description}
                     </ListGroupItem>
                 </ListGroup>
             </Col>
  
             <Col md={3}>
                 <Card>
                     <ListGroup variant='flush'>
                          <ListGroupItem>
                              <Row>
                                  <Col>
                                      Price:
                                  </Col>
                                  <Col>
                                      <strong>${product.price}</strong>
                                  </Col>
                              </Row>
                          </ListGroupItem>
                          <ListGroupItem>
                              <Row>
                                  <Col>
                                      Status:
                                  </Col>
                                  <Col>
                                      {product.countInStock > 0 ? 'IN STOCK' : 'OUT OF STOCK'}
                                  </Col>
                              </Row>
                          </ListGroupItem>

                          {product.countInStock > 0 && (
                              <ListGroupItem>
                                  <Row>
                                      <Col>
                                        Qty
                                      </Col>
                                      <Col>
                                        <FormControl as='select' onChange={e => {setQty(e.target.value)}}>
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x+1}> {x+1} </option> //just adding 1 so value doesn't start at 0
                                            ))}
                                        </FormControl>
                                      </Col>
                                  </Row>
                              </ListGroupItem>
                          )}

                          <ListGroupItem>
                              <Button className='btn-block' type='button' disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                  Add To Cart
                              </Button>
                          </ListGroupItem>
                     </ListGroup>
                 </Card>
             </Col>
         </Row>}
 
    </>
  )
}

export default ProductScreen
