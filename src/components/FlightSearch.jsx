import React, { useState } from "react";
import axios from "axios";
import FlightSearchForm from "./FlightSearchForm";
import FlightList from "./FlightList";
import PassengerDetail from "./PassengerDetail";

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
      setError(err.response?.data?.message || "No flights available for selected day");
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookNow = (flight) => {
    setSelectedFlight(flight);
  };

  return (
    <div className="container">
      <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />

      {error && <div className="error">{error}</div>}

      {isLoading ? (
        <div className="loading">Searching flights...</div>
      ) : (
        searchParams && (
          <FlightList
            flights={flights}
            passengers={searchParams.passengers}
            selectedDate={searchParams.date}
            onBookNow={handleBookNow}
          />
        )
      )}

      {selectedFlight && (
        <PassengerDetail
          passengerCount={searchParams.passengers}
          selectedFlight={selectedFlight}
        />
      )}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .error {
          color: #d32f2f;
          padding: 10px;
          background: #ffebee;
          margin: 20px 0;
          border-radius: 4px;
        }
        .loading {
          padding: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default FlightSearch;
