import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="auth-container">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <h1 className="auth-title">404</h1>
        <p className="auth-subtitle" style={{ marginBottom: '2rem' }}>
          The page you're looking for has vanished into the gravity well.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Safety
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
