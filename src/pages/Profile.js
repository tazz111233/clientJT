import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';

function Profile() {
  const usernamet = localStorage.getItem('username'); // Get username from localStorage
  const [items, setItems] = useState([]); // State to store user items

  useEffect(() => {
    if (usernamet) {
      fetch(`hhttps://backendjt-1.onrender.com/items`) // Hardcoded to fetch items for 'tasneem'
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Inspect the fetched data
          if (data.error) {
            console.error(data.error);
          } else {
            setItems(data || []); // Update state with user items
          }
        })
        .catch((error) => console.error('Error fetching items:', error));
    }
  }, [usernamet]);

  return (
    <div className="profile-container">
      <h1>{usernamet}'s Profile</h1>
      <div className="cards-container">
        {items.length > 0 ? (
          items.map((item, index) =>
            Array.isArray(item[usernamet]) && item[usernamet].length > 0 ? (
              <div key={index} className="card">
                <h3>{item.order}</h3>
                {item[usernamet].map((g, subIndex) => (
                  <div key={subIndex} className="card-content">
                    <h4>{g.name}</h4>
                    <p>Price: ${g.price}</p>
                  </div>
                ))}
              </div>
            ) : null
          )
        ) : (
          <p>No items found for this user.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
