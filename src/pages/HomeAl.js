import "../styles/HomeAl.css";
import image1 from "../img/horsebag.png";
import image2 from "../img/gucci.jpg";
import mainDrink from "../img/logotransparent.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const StarbucksClone = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const drinks = [image1, image2];
  const [mainImage, setMainImage] = useState(mainDrink);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      fetch("https://backendjt-1.onrender.com/get-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.role) {
            setRole(data.role);
            if (data.role === "admin") {
              navigate("/admin");
            }
          }
        })
        .catch((error) => console.error("Error fetching role:", error));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!role) {
    return <p>Loading...</p>;
  }

  const handleCartClick = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartItems.length > 0) {
      navigate("/cart");
    } else {
      alert("Your cart is empty!");
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <>
    <div className="containerh">
      <div className="cardh">
        <div className="text-section">
          <h1>
            It's not just coffee <br /> It's <span className="highlight">Starbucks</span>
          </h1>
          <p>
            Flavorful creations sure to brighten any summer day. Enjoy a powerful boost of
            energy handcrafted with sparkling fruit flavors. Try it frozen with a swirl of
            strawberry puree. Join Starbucks and savor our drinks made specially for you.
          </p>
          <button className="learn-more">Learn More</button>
        </div>
        <div className="small-images">
          {drinks.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Drink ${index + 1}`}
              onClick={() => setMainImage(img)}
              className="small-drink"
            />
          ))}
        </div>

        
      </div>

      <div className="bottom-section">
      <div className="image-section">
          <img src={mainImage} alt="Main Drink" className="main-image" />
        </div>

        
      </div>
      
    </div>
    <div className="home">
      
    <h1>Welcome to Plink Bd</h1>
    <p>Welcome to Plink – Custom Made Cool!</p>

    <Link to="/shop" className="shop-now-button">
      Shop Now
    </Link>

    <div className="categories-container">
      {[
        { name: "Tops", img: "https://dummyimage.com/150x150/000/fff" },
        { name: "Bottoms", img: "https://dummyimage.com/150x150/000/fff" },
        { name: "Accessories", img: "https://dummyimage.com/150x150/000/fff" },
        { name: "Shoes", img: "https://dummyimage.com/150x150/000/fff" },
        { name: "Stationery", img: "https://dummyimage.com/150x150/000/fff" },
        { name: "Gift Items", img: "https://dummyimage.com/150x150/000/fff" },
      ].map((category) => (
        <div key={category.name} className="category-card" onClick={() => handleCategoryClick(category.name)}>
          <img src={category.img} alt={category.name} />
          <p>{category.name}</p>
        </div>
      ))}
    </div>

    <div className="hiddenDiv" onClick={handleCartClick}>
      <i className="fas fa-shopping-cart"></i>
    </div>
  </div>
  </>
  );
};

export default StarbucksClone;
