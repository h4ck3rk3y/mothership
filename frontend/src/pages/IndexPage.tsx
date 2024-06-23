import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const IndexPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Launch Your Custom AI Bot on Telegram</h1>
      <p className="text-xl mb-8">We help you create and manage powerful AI bots on Telegram with ease.</p>
      <div className="mb-8">
        <svg className="w-32 h-32 mx-auto" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
      </div>
      <div className="space-y-4">
        {!isAuthenticated && (
          <>
            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
              Sign Up
            </Link>
            <Link to="/login" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-block ml-4">
              Sign In
            </Link>
          </>
        )}
        {isAuthenticated && (
          <Link to="/dashboard" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-block">
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default IndexPage;