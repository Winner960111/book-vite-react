import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL:
    import.meta.env.MODE == 'development'
      ? `http://${window.location.hostname}:80/api`
      : `${window.location.origin}/api`,
  headers: {
    'Content-Type': 'application/json',
    "X-Api-Key": 'tiJ0Wfsh.i8iP64GNla95d9nNsQIQodL15PdR0wpR',
  },
});

export default api;
