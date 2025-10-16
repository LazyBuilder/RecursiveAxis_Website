// src/App.jsx

import React from 'react';
import './App.css';

// Import your main single view/component
import Home from './Home';

// NOTE: You no longer need the BASE_PATH constant here, 
// as it was only required for the router's basename prop.

function App() {
  return (
    // Your application's main content is rendered directly.
    // The Home component represents your entire website content.
    <div className="App overflow-hidden">
      <Home />
    </div>
  );
}

export default App;
