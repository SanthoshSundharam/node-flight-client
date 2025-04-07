import React from "react";

const FlightList = ({ flights, passengers, selectedDate, onBookNow }) => {
  if (!flights.length) {
    return <div className="no-flights">No flights found for selected day.</div>;
  }

  return (
    <div className="flight-list">
      <h2>
        Available Flights for{" "}
        {new Date(selectedDate).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Flight Name</th>
            <th>Route</th>
            <th>Timings</th>
            <th>
              Price ({passengers} {passengers > 1 ? "passengers" : "passenger"})
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.airline}</td>
              <td>
                <div className="route">
                  <span className="origin">{flight.origin}</span>
                  <span> → </span>
                  <span className="destination">{flight.destination}</span>
                </div>
              </td>
              <td>
                <div className="timings">
                  <div>Dep: {flight.departure_time}</div>
                  <div>Arr: {flight.arrival_time}</div>
                </div>
              </td>
              <td>${(flight.price * passengers).toFixed(2)}</td>
              <td>
                <button onClick={() => onBookNow(flight)}>Book Now</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .flight-list {
          margin-top: 30px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
        }
        th,
        td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        th {
          background-color: #f8f9fa;
          font-weight: 500;
        }
        .route {
          font-weight: 500;
        }
        .origin,
        .destination {
          display: inline-block;
          min-width: 60px;
        }
        .timings div {
          margin: 3px 0;
          font-size: 0.9em;
          color: #555;
        }
        .no-flights {
          padding: 20px;
          text-align: center;
          color: #666;
          background: #f8f9fa;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default FlightList;
