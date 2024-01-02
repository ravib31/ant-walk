import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const Protected = ({ children, ...rest }) => {
  // Add your authentication logic here
  const isAuthenticated = true; // Replace with your actual authentication check

  return (
    <Route
      {...rest}
      element={isAuthenticated ? (
        children
      ) : (
        <Navigate to="/login" replace state={{ from: rest.path }} />
      )}
    />
  );
};

export default Protected;
