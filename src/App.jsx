// src/App.jsx (Updated to handle multiple pages via React Router)

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import the two main views
import Home from './Home';      // Your existing single-page component
import ProjectsPage from './ProjectsPage'; // The new component we just created

function App() {
  return (
    // BrowserRouter is the necessary wrapper for all routing logic
    <BrowserRouter>
      <div className="App">
        {/* Routes component handles switching based on URL path */}
        <Routes>
          
          {/* 1. Home Route: Renders your main single-page application */}
          <Route path="/" element={<Home />} /> 
          
          {/* 2. Projects Route: Renders the dedicated project list page */}
          <Route path="/projects" element={<ProjectsPage />} /> 
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;