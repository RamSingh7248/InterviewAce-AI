import axios from 'axios';

/**
 * Shared Axios instance configured for cookie-based authentication
 * and API communication. Uses Vite proxy in development or relative /api.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
