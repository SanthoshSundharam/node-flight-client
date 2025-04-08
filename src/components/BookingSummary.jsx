import { useLocation } from "react-router-dom";
import '../BookingSummary.css'

const BookingSummary = () => {
  const { state } = useLocation();

  if (!state) return <div>No booking data found.</div>;

  const { flight, passengers, bookingId, date, commission, totalAmount } = state;

  return (
    <div className="summary-container">
      <h2>Booking Summary</h2>
      <p><strong>Booking ID:</strong> {bookingId}</p>
      <p><strong>Date:</strong> {date}</p>

      <div className="flight-card">
        <h3>{flight.airline}</h3>
        <p>{flight.origin} → {flight.destination}</p>
        <p>Departure: {flight.departure_time}</p>
        <p>Arrival: {flight.arrival_time}</p>
        <p>Price per Passenger: ${flight.price}</p>
      </div>

      <h3>Passengers:</h3>
      <ul>
        {passengers.map((p, i) => (
          <li key={i}>
            {p.first_name} {p.last_name}, Age: {p.age}, Gender: {p.gender}
          </li>
        ))}
      </ul>

      <p><strong>Commission:</strong> ${commission}</p>
      <p><strong>Total Amount:</strong> ${totalAmount}</p>
    </div>
  );
};

export default BookingSummary;
