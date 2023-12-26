import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Info from './components/Info'; // Import your About component
import Navbar from './layout/NavBar'; // Import your Navbar component
import Game from './components/Game';
import Option from './components/Option';
import Edit from './components/Edit';
function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/info" element={<Info />} />
      <Route path="/option" element={<Option />} />
      <Route path="/edit" element={<Edit />} />
      {/* Add more routes for other pages as needed */}
    </Routes>
  </Router>
  );
}

export default App;