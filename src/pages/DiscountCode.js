import React, { useState, useEffect } from 'react';
import '../styles/DiscountCode.css';

function DiscountCode() {
  const [discountCode, setDiscountCode] = useState('');
  const [celebrityName, setCelebrityName] = useState('');
  const [usageCount, setUsageCount] = useState(0);
  const [value, setValue] = useState(0); // State for discount value
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [existingCodes, setExistingCodes] = useState([]); // State to store discount codes

  // Fetch existing discount codes on component mount
  useEffect(() => {
    const fetchDiscountCodes = async () => {
      try {
        const response = await fetch('https://backendjt-1.onrender.com/discount-codes');
        const data = await response.json();

        if (response.ok) {
          setExistingCodes(data);
        } else {
          console.error(data.error || 'Failed to fetch discount codes.');
        }
      } catch (error) {
        console.error('Error fetching discount codes:', error);
      }
    };

    fetchDiscountCodes(); // Call the function on component mount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!discountCode || !celebrityName || usageCount < 0 || value <= 0) {
      setErrorMessage('Please fill out all fields correctly.');
      return;
    }

    try {
      const response = await fetch('https://backendjt-1.onrender.com/add-discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          discountCode,
          celebrityName,
          usageCount,
          value,
          status: 'Active', // Default status is "Active"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Discount code added successfully!');
        setErrorMessage('');
        setDiscountCode('');
        setCelebrityName('');
        setUsageCount(0);
        setValue(0);

        // Add the new discount code to the state
        setExistingCodes((prevCodes) => [
          ...prevCodes,
          {
            discountCode,
            celebrityName,
            usageCount,
            value,
            status: 'Active',
          },
        ]);
      } else {
        setErrorMessage(data.error || 'Failed to add discount code.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('An error occurred while adding the discount code.');
      setSuccessMessage('');
    }
  };

  const updateStatus = async (discountCode, newStatus) => {
    try {
      const response = await fetch(`https://backendjt-1.onrender.com/update-discount-status/${discountCode}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
  
      if (response.ok) {
        setExistingCodes((prevCodes) =>
          prevCodes.map((code) =>
            code.discountCode === discountCode ? { ...code, status: newStatus } : code
          )
        );
      } else {
        console.error('Failed to update status.');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  

  return (
    <div className="discount-code">
      <h1>Manage Discount Codes</h1>
      <form className="for1" onSubmit={handleSubmit}>
  <div className="form-group">
    <input
      type="text"
      id="discountCode"
      value={discountCode}
      onChange={(e) => setDiscountCode(e.target.value)}
      placeholder="Discount Code"  // Set placeholder instead of label
      required
    />
  </div>
  <div className="form-group">
    <input
      type="text"
      id="celebrityName"
      value={celebrityName}
      onChange={(e) => setCelebrityName(e.target.value)}
      placeholder="Celebrity Name"  // Set placeholder instead of label
      required
    />
  </div>
  
  <div className="form-group">
    <input
      type="text"
      id="value"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      placeholder="Discount Value"  // Set placeholder instead of label
      required
      min="0"
    />
  </div>
  <button type="submit">Add Discount Code</button>
</form>

      

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h2>Existing Discount Codes</h2>
      <table className="discount-table">
        <thead>
          <tr>
            <th>Discount Code</th>
            <th>Celebrity Name</th>
            <th>Number of Times Used</th>
            <th>Discount Value</th>
            <th>Status</th>
            <th>Actions</th> {/* New column for action buttons */}
          </tr>
        </thead>
        <tbody>
          {existingCodes.length > 0 ? (
            existingCodes.map((code) => (
              <tr key={code.id}>
                <td>{code.discountCode}</td>
                <td>{code.celebrityName}</td>
                <td>{code.usageCount}</td>
                <td>{code.value}</td>
                <td  className={`activ1 ${code.status === "Active" ? "complete-bg" : code.status === "Inactive" ? "cancelled-bg" : ""}`}>{code.status}</td>
                <td>
                  <button
                    className="active1"
                    onClick={() => updateStatus(code.discountCode, 'Active')}
                  >
                    Active
                  </button>
                  <button
                    className="cancelled1"
                    onClick={() => updateStatus(code.discountCode, 'Inactive')}
                  >
                    Inactive
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No discount codes available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DiscountCode;
