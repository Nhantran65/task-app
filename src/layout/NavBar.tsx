import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-bold">Snake Game</div>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="text-white hover:text-blue-300">Home</a>
            </li>
            <li>
              <a href="/info" className="text-white hover:text-blue-300">Info</a>
            </li>
            <li>
              <a href="/option" className="text-white hover:text-blue-300">Options</a>
            </li>
            <li>
              <a href="/edit" className="text-white hover:text-blue-300">Edit</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
