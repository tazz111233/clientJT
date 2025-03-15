import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons
import '../styles/Navbar.css';
import image1 from '../img/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu
  const isLoggedIn = localStorage.getItem('username');

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch('https://backendjt-1.onrender.com/get-role', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: isLoggedIn }),
          });
          const data = await response.json();
          if (response.ok) {
            setRole(data.role);
          } else {
            console.error(data.error || 'Failed to fetch role');
          }
        } catch (error) {
          console.error('Error fetching role:', error);
        }
      }
    };

    fetchUserRole();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    setRole(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={image1} alt="Logo" />
      </div>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={menuOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
        {isLoggedIn && <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>}
        {role === 'admin' && <li><Link to="/addproduct" onClick={() => setMenuOpen(false)}>Add Product</Link></li>}
        {role === 'admin' && <li><Link to="/discount" onClick={() => setMenuOpen(false)}>DiscountCodes</Link></li>}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
