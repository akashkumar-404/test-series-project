import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/home';
import { AuthProvider } from './LoginPage/AuthContext';
import ProtectedRoute from './LoginPage/ProtectedRoute';
import Login from './LoginPage/login';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/test-series-project" element={<Login />} />
          <Route
            path="/test-series-project/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
