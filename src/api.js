// src/services/api.js
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/flights', // Your backend base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flight search API
export const searchFlights = async (params) => {
  try {
    const response = await api.get('/search', { params });
    return response.data;
  } catch (error) {
    console.error('Flight search error:', error.response?.data || error.message);
    throw error;
  }
};

// Add interceptors if needed (for auth, error handling, etc.)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global API errors here
    if (error.response) {
      // Server responded with a status code outside 2xx range
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;