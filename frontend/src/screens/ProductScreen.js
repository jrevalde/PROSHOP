import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = ({match}) => {
    const {id} = useParams();
    const product = products.find((p) => p._id === id)
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
