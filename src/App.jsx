import React from 'react';
import FlightSearch from './components/FlightSearch';

function App() {
  return (
    <div className="app">
      <FlightSearch />
      
      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .app {
          min-height: 100vh;
          padding: 20px 0;
        }
      `}</style>
    </div>
  );
}

export default App;