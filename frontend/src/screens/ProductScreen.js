import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
//import products from '../products';  || Don't need this anymore since we are getting our data from api


const ProductScreen = () => {
    const {id} = useParams();//returns the number of the product id
    /*const product = products.find((p) => p._id === id)   || no need since we are fetching data from backend*/
    
    const [product, setProduct] = useState({}); //default value is an empty object because product is an object.
    
    useEffect(() => 
    {
        const fetchProduct = async() =>
        {
          const {data} = await axios.get(`/api/products/${id}`);
    
          setProduct(data); 
        }
    
        fetchProduct();
    
    }, [id]);

  return (
    <>
       <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
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
                        <ListGroupItem>
                            <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                                Add To Cart
                            </Button>
                        </ListGroupItem>
                   </ListGroup>
               </Card>
           </Col>
       </Row>
    </>
  )
}

export default ProductScreen
