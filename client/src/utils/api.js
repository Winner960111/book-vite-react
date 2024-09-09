import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL:
    import.meta.env.MODE == 'development'
      ? `http://${window.location.hostname}/api`
      : `${window.location.origin}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
