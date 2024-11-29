import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Begin from './pages/Begin/Begin';
import { Toaster } from 'react-hot-toast';

import './App.css'

function App() {
  const copos = [1,2,3,4]

  return (
    <Router>
      <Routes>
        {/* Route mặc định */}
        <Route path="/" element={<Begin />} />
        {/* Dynamic route với params */}
        <Route path="/:id" element={<Begin />} />
      </Routes>
    </Router>
  );
}

export default App
