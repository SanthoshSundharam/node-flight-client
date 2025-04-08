import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FlightSearch from "./components/FlightSearch";
import BookingSummary from "./components/BookingSummary"; // New component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlightSearch />} />
        <Route path="/booking-summary" element={<BookingSummary />} />
      </Routes>
    </Router>
  );
}


export default App;