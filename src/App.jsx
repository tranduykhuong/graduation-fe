import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Begin from './pages/Begin/Begin';
import { Toaster } from 'react-hot-toast';

import './App.css'

function App() {
  const copos = [1,2,3,4]

  return (
    <div className='min-h-[100vh] relative'>
      <Toaster />

      <ul id='nevar'>
        {copos.map(() => (
          <>
            <li className='copos c1' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❄</li>
            <li className='copos c2' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❉</li>
            <li className='copos c3' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❋</li>
            <li className='copos c4' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❅</li>
            <li className='copos c5' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❋</li>
            <li className='copos c6' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❅</li>
            <li className='copos c7' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❉</li>
            <li className='copos c8' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❄</li>
            <li className='copos c9' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❄</li>
            <li className='copos c10' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❉</li>
            <li className='copos c11' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❋</li>
            <li className='copos c12' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❅</li>
            <li className='copos c13' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❋</li>
            <li className='copos c14' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❅</li>
            <li className='copos c15' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❉</li>
            <li className='copos c16' style={{left: Math.random()*100 + '%', animationDuration: ((Math.random()*100+10)%16+20) + 's'}}>❄</li>
          </>
        ))}
      </ul>

      <Router>
        <Routes>
          {/* Route mặc định */}
          <Route path="/" element={<Begin />} />
          {/* Dynamic route với params */}
          <Route path="/:id" element={<Begin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
