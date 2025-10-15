// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Import the two main views from the src/ directory
import Home from './Home';                 
import ProjectsPage from './ProjectsPage'; 

// 💡 Define the required base path
const BASE_PATH = '/storylineds_website'; 

function App() {
  return (
    // BrowserRouter is the necessary wrapper for all routing logic
    <BrowserRouter basename={BASE_PATH}>
      <div className="App">
        {/* Routes component handles switching based on URL path */}
        <Routes>
          
          {/* 1. Home Route: Renders your main single-page application */}
          <Route path="/" element={<Home />} /> 
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;