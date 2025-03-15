import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import AddPro from './pages/AddPro';
import ForPass from './pages/ForPasss';
import DiscountCode from './pages/DiscountCode';
import HomeAl from './pages/HomeAl';
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomeAl />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addproduct" element={<AddPro />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home1" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/discount" element={<DiscountCode />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/forpass" element={<ForPass />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  </div>
  );
}

export default App;