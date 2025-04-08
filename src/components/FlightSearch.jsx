import React, { useState } from "react";
import axios from "axios";
import FlightResult from "./FlightResult";
import '../FlightSearch.css'

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const getDayFromDate = (dateString) => {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const date = new Date(dateString);
    return days[date.getDay()];
  };

  const handleSearch = async (params) => {
    setIsLoading(true);
    setError(null);
    setSearchParams(params);

    try {
      const day = getDayFromDate(params.date);
      const response = await axios.get("http://localhost:5000/flights/search", {
        params: {
          origin: params.origin,
          destination: params.destination,
          date: day,
        },
      });
      setFlights(response.data);
    } catch (err) {
      setError("No flights found for selected day.");
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />

      {error && <div className="error">{error}</div>}
      {isLoading && <div className="loading">Searching flights...</div>}

      {!isLoading && searchParams && (
        <FlightResult
          flights={flights}
          passengers={searchParams.passengers}
          selectedDate={searchParams.date}
          selectedFlight={selectedFlight}
          onBookNow={(flight) => setSelectedFlight(flight)}
        />
      )}
    </div>
  );
};

const FlightSearchForm = ({ onSearch, isLoading }) => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: new Date().toISOString().split("T")[0],
    passengers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <h2>Find Flights</h2>
      <input
        name="origin"
        placeholder="Origin"
        value={formData.origin}
        onChange={handleChange}
        required
      />
      <input
        name="destination"
        placeholder="Destination"
        value={formData.destination}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="passengers"
        min="1"
        max="10"
        value={formData.passengers}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search Flights"}
      </button>
    </form>
    </div>
    
  );
};

export default FlightSearch;


