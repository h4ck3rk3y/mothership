import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">CustomGPT Telegram</Link>
        <nav>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
              <button onClick={logout} className="hover:text-gray-300">Logout</button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;