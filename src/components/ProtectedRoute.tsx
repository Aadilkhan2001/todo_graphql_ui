import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
