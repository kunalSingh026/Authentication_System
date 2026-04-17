import axios from 'axios';

const api = axios.create({
  baseURL: '/api/auth',
  withCredentials: true, // Need this to send the refreshToken cookie
});

// Request Interceptor: Attach the access token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: Handle 401 and try to refresh token automatically
api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry &&
    originalRequest.url !== '/refresh-token' &&
    originalRequest.url !== '/login'
  ) {
    originalRequest._retry = true;
    
    try {
      // Try to get a new access token using the HttpOnly cookie
      const res = await axios.get('/api/auth/refresh-token', { withCredentials: true });
      const newAccessToken = res.data.accessToken;
      
      localStorage.setItem('accessToken', newAccessToken);
      
      // Update the authorization header for the original request
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      
      return api(originalRequest);
    } catch (refreshError) {
      // Refresh failed (e.g., revoked, expired). Clean up.
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }
  
  return Promise.reject(error);
});

export default api;
