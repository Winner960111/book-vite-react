import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL:
    import.meta.env.MODE == 'development'
      ? `http://${window.location.hostname}:3000/api`
      : `${window.location.origin}:3000/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
