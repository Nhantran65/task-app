import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/About'; // Import your About component
import Navbar from './layout/NavBar'; // Import your Navbar component
import TaskList from './components/TaskList';
import TaskTable from './components/TaskTable';

function App() {
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/about" element={<About />} />
      <Route path="/table" element={<TaskTable />} />
      {/* Add more routes for other pages as needed */}
    </Routes>
  </Router>
  );
}

export default App;
