import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await api.get('/get-me');
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('accessToken', token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.get('/logout');
      localStorage.removeItem('accessToken');
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const logoutAll = async () => {
    try {
      await api.get('/logout-all');
      localStorage.removeItem('accessToken');
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, logoutAll, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
