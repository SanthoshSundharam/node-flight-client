import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../FlightResult.css'

const FlightResult = ({
  flights,
  passengers,
  selectedDate,
  selectedFlight,
  onBookNow,
}) => {
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [commission, setCommission] = useState(0);

  useEffect(() => {
    if (showPassengerForm && passengers && passengers > 0) {
      const initialData = Array.from({ length: passengers }, () => ({
        first_name: "",
        last_name: "",
        age: "",
        gender: "",
      }));
      setPassengerDetails(initialData);

      if (selectedFlight && selectedFlight.price) {
        const calculatedTotal = selectedFlight.price * passengers;
        setTotalAmount(calculatedTotal);
      }
    }
  }, [showPassengerForm, passengers, selectedFlight]);

  const handleChange = (index, field, value) => {
    const updated = [...passengerDetails];
    updated[index][field] = value;
    setPassengerDetails(updated);
  };

  const navigate = useNavigate();

  const handleCommissionChange = (value) => {
    const commissionValue = parseFloat(value) || 0;
    setCommission(commissionValue);
    const totalWithCommission =
      selectedFlight.price * passengers + commissionValue;
    setTotalAmount(totalWithCommission);
  };

  const handleSubmitBooking = async () => {
    const isValid = passengerDetails.every(
      (passenger) =>
        passenger.first_name &&
        passenger.last_name &&
        passenger.age &&
        passenger.gender
    );

    const generateBookingId = () => {
      const today = new Date();
      const dateStr = today.toISOString().split("T")[0].replace(/-/g, ""); 

      let count =
        parseInt(localStorage.getItem("bookingCount_" + dateStr)) || 0;
      count += 1;

      localStorage.setItem("bookingCount_" + dateStr, count); 
      return `BOOK${dateStr}${count}`;
    };

    if (!isValid) {
      return alert("Please fill in all the passenger details.");
    }

    try {
      const bookingId =generateBookingId();
      const response = await axios.post(
        "http://localhost:5000/flights/passengers",
        {
          booking_id: bookingId,
          flight_id: selectedFlight.id,
          passengers: passengerDetails,
          total_amount: totalAmount,
          commission: commission,
          date: selectedDate,
        }
      );

      if (response.data.booking_id) {
        console.log("Booking Successful: ", response.data);
        navigate("/booking-summary", {
          state: {
            flight: selectedFlight,
            passengers: passengerDetails,
            bookingId: response.data.booking_id,
            date: selectedDate,
            commission,
            totalAmount
          }
        });
      }
    } catch (error) {
      console.error("Error booking passengers:", error);
      alert("Error booking passengers, please try again later.".flight_id);
    }
  };

  if (!flights.length) return <div className="no-flights">No flights found.</div>;

  return (
    <div className="flight-results-container">
      <h2>Available Flights for {new Date(selectedDate).toDateString()}</h2>
      <table>
        <thead>
          <tr>
            <th>Flight</th>
            <th>Route</th>
            <th>Timings</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td className="airline-name">{flight.airline}</td>
              <td>
                {flight.origin} → {flight.destination}
              </td>
              <td>
                {flight.departure_time} - {flight.arrival_time}
              </td>
              <td>${(flight.price * passengers).toFixed(2)}</td>
              <td>
                <button
                  onClick={() => {
                    onBookNow(flight);
                    setShowPassengerForm(true);
                  }}
                >
                  Book Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPassengerForm && (
        <div className="passenger-form">
          <h3>Enter Passenger Details</h3>
          {passengerDetails.map((passenger, idx) => (
            <div key={idx} className="passenger-details-group">
              <input
                type="text"
                placeholder="First Name"
                value={passenger.first_name}
                onChange={(e) =>
                  handleChange(idx, "first_name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                value={passenger.last_name}
                onChange={(e) => handleChange(idx, "last_name", e.target.value)}
              />
              <input
                type="number"
                placeholder="Age"
                value={passenger.age}
                onChange={(e) => handleChange(idx, "age", e.target.value)}
              />
              <select
                value={passenger.gender}
                onChange={(e) => handleChange(idx, "gender", e.target.value)}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          ))}

          <div class ="commission-section">
            <input
              type="number"
              placeholder="Commission"
              value={commission}
              onChange={(e) => handleCommissionChange(e.target.value)}
            />
            <h4>Total Amount with Commission: ${totalAmount.toFixed(2)}</h4>
          </div>

          <button className="submit-booking-btn" onClick={handleSubmitBooking}>Submit Booking</button>
        </div>
      )}
    </div>
  );
};

export default FlightResult;
