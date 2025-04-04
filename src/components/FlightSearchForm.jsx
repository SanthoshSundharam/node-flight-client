import React, { useState } from "react";

const FlightSearchForm = ({ onSearch, isLoading }) => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: new Date().toISOString().split("T")[0],
    passengers: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "passengers" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div className="search-form">
      <h2>Find Flights</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Origin</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={formData.date}
            required
          />
        </div>

        <div className="form-group">
          <label>Passengers</label>
          <input
            type="number"
            name="passengers"
            min="1"
            max="10"
            value={formData.passengers}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search Flights"}
        </button>
      </form>

      <style jsx>{`
        .search-form {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
        }
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default FlightSearchForm;
