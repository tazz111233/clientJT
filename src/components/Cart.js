import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Cart.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0); // Discount as a percentage
  const [error, setError] = useState('');

  const location = useLocation();

  useEffect(() => {
    const newItem = location.state?.item;
    if (newItem) {
      setCartItems((prevItems) => {
        const updatedCart = [...prevItems, newItem];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const removeItemFromCart = (index) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((_, i) => i !== index);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleApplyDiscount = async () => {
    try {
      const response = await axios.get(`https://backendjt-1.onrender.com/discounts?discountCode=${discountCode}`);
      const discountData = response.data.discounts[0]; // Assuming discount code is unique
      if (discountData) {
        setDiscount(discountData.value);
        setError('');
        // Save the discount code and calculated discounted total in localStorage
        const totalPrice = cartItems.reduce((total, item) => {
          const price = parseFloat(item.price);
          return !isNaN(price) ? total + price : total;
        }, 0);
        const discountedPrice = totalPrice - (totalPrice * (discountData.value / 100));
        localStorage.setItem('discountCode', discountCode);
        localStorage.setItem('discountedPrice', discountedPrice.toFixed(2)); // Store the discounted price
      } else {
        setError('Invalid discount code');
      }
    } catch (error) {
      console.error('Error verifying discount code:', error);
      setError('Error applying discount');
    }
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    return !isNaN(price) ? total + price : total;
  }, 0);

  const discountedPrice = totalPrice - (totalPrice * (discount / 100));

  return (
    <div className="gills">
    <div className="container1" style={{ height: "auto" }} >
      <h1>Shopping Cart</h1>
      <div className="cart">
        <div className="cart-table">
          <div className="cart-table-header">
            <span>Item</span>
            <span>Price</span>
            <span> </span>
          </div>
          <div className="cart-table-body">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="cart-table-row">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                  <button onClick={() => removeItemFromCart(index)}>Remove</button>
                </div>
              ))
            ) : (
              <p>Your cart is empty!</p>
            )}
          </div>
        </div>
        {cartItems.length > 0 && (
          <>
            <div className="discount-code">
              <input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button onClick={handleApplyDiscount}>Apply Discount</button>
              {error && <p className="error">{error}</p>}
            </div>
            <div className="total">
              <h3>Total: ${discountedPrice.toFixed(2)}</h3>
            </div>
          </>
        )}
        <Link className="links" to="/checkout" onClick={() => localStorage.setItem('checkoutCart', JSON.stringify(cartItems))}>
          Check out
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Cart;
