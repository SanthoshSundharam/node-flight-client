import React, { useEffect, useState } from "react";

const PassengerDetail = ({ passengerCount, selectedFlight }) => {
  const [passengerData, setPassengerData] = useState(
    new Array(passengerCount).fill({ firstName: "", lastName: "", age: "", gender: "" })
  );

  useEffect(() => {
    setPassengerData(new Array(passengerCount).fill({ firstName: "", lastName: "", age: "", gender: "" }));
  }, [passengerCount]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...passengerData];
    updatedData[index][name] = value;
    setPassengerData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Passenger Data Submitted:", passengerData);
    // Call API to submit passenger data, linked to selectedFlight.bookingId
  };

  return (
    <div>
      <h3>Enter Passenger Details for {selectedFlight.airline}</h3>
      <form onSubmit={handleSubmit}>
        {passengerData.map((_, index) => (
          <div key={index}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={passengerData[index].firstName}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={passengerData[index].lastName}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={passengerData[index].age}
              onChange={(e) => handleChange(e, index)}
              required
            />
            <select
              name="gender"
              value={passengerData[index].gender}
              onChange={(e) => handleChange(e, index)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        ))}
        <button type="submit">Submit Passenger Details</button>
      </form>
    </div>
  );
};

export default PassengerDetail;
