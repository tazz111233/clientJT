import React, { useEffect, useState } from "react";
import "../styles/Admin.css";

const AdminPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://backendjt-1.onrender.com/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, []);

  const updateStatus = (username, id, newStatus) => {
    fetch(`https://backendjt-1.onrender.com/update-status/${username}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredItems = items.filter((item) => {
    const username = Object.keys(item).find(
      (key) =>
        key !== "_id" &&
        key !== "order" &&
        key !== "status" &&
        key !== "address" &&
        key !== "phone" &&
        key !== "discountCode"
    );
    return username?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Admin Page</h1>
      
      {/* Search Bar with Label */}
      <div className="search-container">
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          id="search"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Order</th>
            <th>Username</th>
            <th>Items</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Discount Code</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => {
            const username = Object.keys(item).find(
              (key) =>
                key !== "_id" &&
                key !== "order" &&
                key !== "status" &&
                key !== "address" &&
                key !== "phone" &&
                key !== "discountCode"
            );

            return (
              <tr key={item._id}>
                <td>{item.order}</td>
                <td>{username}</td>
                <td>
                  {item[username]
                    ? item[username].map((subItem, index) => (
                        <div key={index}>
                          <strong>Item:</strong> {subItem.name} | <strong>Price:</strong> ${subItem.price}
                        </div>
                      ))
                    : "No items"}
                </td>
                <td>{item.address || "No address provided"}</td>
                <td>{item.phone || "No phone number provided"}</td>
                <td>{item.discountCode || "No discount code used"}</td>
                <td>
                  <span
                    className={`status-label ${
                      item.status === "Active"
                        ? "active"
                        : item.status === "Complete"
                        ? "complete"
                        : item.status === "Cancelled"
                        ? "cancelled"
                        : ""
                    }`}
                  >
                    {item.status || "No status"}
                  </span>
                </td>
                <td>
                  <button
                    className="active-btn"
                    onClick={() => updateStatus(username, item._id, "Active")}
                  >
                    Set Active
                  </button>
                  <button
                    className="complete-btn"
                    onClick={() => updateStatus(username, item._id, "Complete")}
                  >
                    Done
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => updateStatus(username, item._id, "Cancelled")}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
