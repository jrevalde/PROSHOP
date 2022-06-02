import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({children}) => {//the argument is called children because we put the child component (our form) inside this parent component.
  return (
    <Container>
      <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
              {children}
          </Col>
      </Row>
    </Container>
  )
}

export default FormContainer;
