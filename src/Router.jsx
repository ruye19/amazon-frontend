import React from 'react'
import { BrowserRouter } from 'react-router'
import { Routes } from 'react-router'
import { Route } from 'react-router'
import Landing from './Pages/Landing/Landing'

import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Result from './Pages/Results/Result'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Auth from './Pages/Auth/Auth'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51R0ieaHtfQErHysNP7WxydLmJDnjd9qBqyKRfjViID59OHiuuwwUzd9Wv1zg7MmlZnUCFy1wutJGgm4lruGhtUm400AY6jYBn6');


const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Landing />} />
    <Route path='/auth' element={<Auth />} />
    <Route path='/payment' element={
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
  
    } />
    <Route path='/orders' element={<Orders />} />
    <Route path='/cart' element={<Cart />} />
    <Route path='/categories/:catagoryid' element={<Result/>} />
      <Route path='/products/:productid' element={<ProductDetail/>}/>

    </Routes>
    </BrowserRouter>

  )
}

export default Router
