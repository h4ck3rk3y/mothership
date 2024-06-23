import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const IndexPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Launch Your Custom GPT on Telegram</h1>
      <p className="text-xl mb-8">We help you create and manage powerful AI bots on Telegram with ease.</p>
      <img src="/api/placeholder/800/400" alt="CustomGPT Telegram Bot" className="mx-auto mb-8 rounded-lg shadow-lg" />
      <div className="space-x-4">
        {!isAuthenticated && (
          <>
            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </Link>
            <Link to="/login" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </Link>
          </>
        )}
        {isAuthenticated && (
          <Link to="/dashboard" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}

export default IndexPage;