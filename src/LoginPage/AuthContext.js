import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage to initialize state
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Update localStorage whenever the authentication state changes
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  const login = (email, password) => {
    // Mock login logic
    if (email === 'amitpatel@gmail.com' && password === 'password') {
      setIsAuthenticated(true);
      navigate('/home');
    } else {
      return 'Invalid email or password';
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear the value from localStorage
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
