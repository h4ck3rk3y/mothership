import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleWIPClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <img src="/ufo.png" alt="MotherShip" className="w-10 h-10 mr-2" />
          MotherShip
        </Link>
        <nav className="flex items-center space-x-6">
          <a href="#" onClick={handleWIPClick} className="hover:text-blue-400 transition-colors">Features</a>
          <a href="#" onClick={handleWIPClick} className="hover:text-blue-400 transition-colors">Pricing</a>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
              <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">🚧 Work in Progress 🚧</h2>
            <p>This feature is coming soon! We're working hard to bring you the best experience.</p>
            <button onClick={() => setShowModal(false)} className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;