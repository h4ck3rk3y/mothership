import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { login as apiLogin, signup as apiSignup } from '../api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // You might want to validate the token here
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await apiLogin(username, password);
      localStorage.setItem('token', response.access_token);
      setIsAuthenticated(true);
      setUser({ username });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      await apiSignup(username, password);
      // After successful signup, log the user in
      await login(username, password);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};