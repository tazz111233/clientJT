import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Checkout.css";
import axios from "axios";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [bkash, setBkash] = useState(""); // New state for transaction ID
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  const storedCart = localStorage.getItem("checkoutCart");
  const cartItems = location.state || (storedCart ? JSON.parse(storedCart) : []);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    return isNaN(price) ? total : total + price;
  }, 0);

  // Get discount details
  const discountCode = localStorage.getItem("discountCode");
  const discountedPrice =
    parseFloat(localStorage.getItem("discountedPrice")) || totalPrice;

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("username");

  // Function to handle payment after transaction ID is entered
  const handlePayment = () => {
    console.log("Transaction ID Before Sending:", bkash);
  
    if (!bkash) {
      alert("Please enter a transaction ID.");
      return;
    }
  
    const paymentData = {
      cartItems,
      discountCode,
      discountedPrice,
      usernamep: isLoggedIn, // Sending username as "usernamep"
      address,
      phone,
      bkash, // Adding transaction ID
    };
  
    console.log("Final Request Body:", paymentData);
  
    // Send a request to increment views for each product in the cart
    cartItems.forEach((item) => {
      axios
        .post("https://backendjt-1.onrender.com/incrementProductViews", {
          productName: item.name,
        })
        .then((response) => {
          console.log(`Incremented views for ${item.name}:`, response.data);
        })
        .catch((error) => {
          console.error(`Error incrementing views for ${item.name}:`, error);
        });
    });
  
    // Proceed with saving the cart data after incrementing views
    axios
      .post("https://backendjt-1.onrender.com/save-cart", paymentData)
      .then((response) => {
        console.log("Server Response:", response.data);
  
        // Clear localStorage after successful payment
        localStorage.removeItem("cart");
        localStorage.removeItem("checkoutCart");
        localStorage.removeItem("discountCode");
        localStorage.removeItem("discountedPrice");
  
        // Redirect to home
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error saving cart:", error);
      });
  
    setShowPopup(false); // Close the popup
  };
  

  return (
    <>
    <div className="gills">
      <div className="container1">
        <h1>Checkout</h1>
        <div className="cart">
          <div className="carttable">
            <div className="cart-table-header">
              <span>Item</span>
              <span>Price</span>
            </div>
            <div className="cart-table-body">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className="cart-table-row">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))
              ) : (
                <p>Your cart is empty!</p>
              )}
            </div>
          </div>

          <div className="discount-code1">
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {cartItems.length > 0 && (
            <div className="total">
              <h4>Total: ${totalPrice.toFixed(2)}</h4>
              {discountCode && (
                <>
                  <h5>Discount Code Applied: {discountCode}</h5>
                  <h4>Discounted Total: ${discountedPrice.toFixed(2)}</h4>
                </>
              )}
            </div>
          )}

          {/* Place Order Button - Opens Popup */}
          <button className="pay-button" onClick={() => setShowPopup(true)}>
            Place Order
          </button>
        </div>
      </div>
      </div>

      {/* Transaction ID Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Enter Transaction ID</h2>
            <input
              type="text"
              placeholder="Transaction ID"
              value={bkash}
              onChange={(e) => {setBkash(e.target.value);
                console.log(bkash)}
              }
            />
            <div className="popup-buttons">
              <button onClick={() => setShowPopup(false)}>Cancel</button>
              <button onClick={handlePayment}>Pay</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
