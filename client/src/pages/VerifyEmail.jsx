import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await api.post('/verify-email', { email, otp });
      navigate('/login', { state: { message: 'Email verified! You can now log in.' }});
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Invalid OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Verify Email</h1>
          <p className="auth-subtitle">We sent a 6-digit code to {email}</p>
        </div>
        
        {error && <div className="alert">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Security Code (OTP)</label>
            <input 
              type="text" 
              name="otp" 
              className="form-input" 
              placeholder="e.g. 123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <span className="loading-spinner"></span> : 'Verify Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
