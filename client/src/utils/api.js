import axios from 'axios';

// Create an instance of axios

const api = axios.create({
  baseURL: `${window.location.origin}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
