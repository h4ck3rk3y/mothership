import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <img src="/ufo.png" alt="MotherShip" className="w-10 h-10 mr-2" />
          MotherShip
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/features" className="hover:text-blue-400 transition-colors">Features</Link>
          <Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link>
          <Link to="/docs" className="hover:text-blue-400 transition-colors">Docs</Link>
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
    </header>
  );
};

export default Header;