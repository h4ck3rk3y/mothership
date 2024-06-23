import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
          Mothership
        </Link>
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