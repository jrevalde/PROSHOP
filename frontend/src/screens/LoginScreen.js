import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form, Row, Button, Col, FormGroup, FormLabel, FormControl} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/formContainer';
import {login} from "../actions/userActions";


const LoginScreen = ({location}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/' ;

    const submitHandler = (e) => {
        e.preventDefault();
        //this is where we want to dispactch login



    }

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <FormGroup controlId='email'>
            <FormLabel>Email Address</FormLabel>
            <FormControl type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}></FormControl>
        </FormGroup>

        <FormGroup controlId='password'>
            <FormLabel>Password</FormLabel>
            <FormControl type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)}></FormControl>
        </FormGroup>

        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>

      <Row className='py-3'>
        <Col>
            New User? <Link to={redirect ? `/register?redirect${redirect}` : '/register'} >Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen;

