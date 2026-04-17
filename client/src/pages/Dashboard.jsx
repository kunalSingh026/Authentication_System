import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout, logoutAll } = useAuth();
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [loadingLogoutAll, setLoadingLogoutAll] = useState(false);

  const handleLogout = async () => {
    setLoadingLogout(true);
    await logout();
    setLoadingLogout(false);
  };

  const handleLogoutAll = async () => {
    setLoadingLogoutAll(true);
    await logoutAll();
    setLoadingLogoutAll(false);
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="dashboard-brand">MyApp Pulse</div>
        <button className="btn btn-danger" style={{ width: 'auto', padding: '0.5rem 1.5rem' }} onClick={handleLogout} disabled={loadingLogout}>
          {loadingLogout ? <span className="loading-spinner"></span> : 'Logout'}
        </button>
      </nav>
      
      <div className="dashboard-content">
        <div className="card">
          <h2 className="card-title">Profile Context</h2>
          <div className="profile-info">
            <div className="profile-item">
              <span className="profile-label">Username</span>
              <span className="profile-value">{user?.username}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Email</span>
              <span className="profile-value">{user?.email}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Account Status</span>
              <span className="profile-value" style={{ color: 'var(--success-color)' }}>Active & Verified</span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="card-title">Security Actions</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Manage your active sessions. If you notice any suspicious activity, you can securely logout from all connected devices immediately.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-danger" style={{ flex: 1 }} onClick={handleLogoutAll} disabled={loadingLogoutAll}>
              {loadingLogoutAll ? <span className="loading-spinner"></span> : 'Logout from All Devices'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
