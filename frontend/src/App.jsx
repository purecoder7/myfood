import './App.css'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import Card from './components/Card'
import Footer from './components/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './screens/Home'
import Contact from './screens/Contact'
import Signup from './screens/Signup'
import Login from './screens/Login'
import { CartProvider } from './components/ContextReducer'
import Cart from './screens/Cart'
import MyOrder from './screens/MyOrder'
import React from "react";


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Navbar globally visible */}
        {/* <Navbar /> */}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/myorders" element={<MyOrder />} />
          
        </Routes>

        {/* Footer globally visible */}
        {/* <Footer /> */}
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
