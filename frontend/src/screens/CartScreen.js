import React, {useEffect}from 'react';
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom' 
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Image, FormControl, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCart, removeFromCart } from '../actions/cartActions';


const CartScreen = () => {
    const idObject = useParams();

    const id = idObject.id;
    
    const location = useLocation();
    const qty = location.search ? Number(location.search.split('=')[1])  : 1;

    const dispatch = useDispatch();

    const Navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    useEffect(() => {
        //we only want to dispatch addToCart if there is a product_id
        if(id)
        {
            dispatch(addToCart(id, qty));
        }
        else
        {

        }
    },[dispatch, id, qty]) //so id and qty are some of the changes the useeffect has to lookout for.

    const removeFromCartHandler = () =>
    {
      console.log("remove");

      dispatch(removeFromCart(id));
    };

    const checkoutHandler = () =>
    {
      console.log('proceed to checkout');
      Navigate('/login?redirect=shipping');
    }


    //console.log(qty);
    //console.log(id);

  return (

    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your cart is empty.<Link to='/'>Go Back.</Link></Message> : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>{item.price}</Col>
                   
                  <Col me={2}>
                    <FormControl as='select' value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                          {[...Array(item.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x+1}> {x+1} </option> //just adding 1 so value doesn't start at 0
                          ))}
                    </FormControl>
                  </Col>

                  <Col md={2}>
                      <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))} 
          </ListGroup>
        )}
      </Col>


      <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2>Subtotal ({cartItems.reduce((acc, curr_item) => acc + curr_item.qty, 0)}) items.</h2>
                  ${cartItems.reduce((acc, curr_item) => acc + curr_item.qty * curr_item.price,0).toFixed(2)}
                </ListGroupItem>

                <ListGroupItem>
                  <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</Button>
                </ListGroupItem>
            </ListGroup>
          </Card>
      </Col>

      <Col md ={2}>

      </Col>
    </Row>
    
  );
}

export default CartScreen;
