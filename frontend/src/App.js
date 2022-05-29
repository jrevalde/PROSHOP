import React from 'react';
import {BrowserRouter, Route, Routes}  from 'react-router-dom'; //react router for managing routes
import {Container}  from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <BrowserRouter> 
      <Header/>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen/>} exact/>
            <Route path='/product/:id' element={<ProductScreen/>}/>
            <Route path='cart'>
              <Route path=':id' element={<CartScreen/>}/>
              <Route path='' element={<CartScreen/>}/>
            </Route>
          </Routes>
    
        </Container>
        
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
