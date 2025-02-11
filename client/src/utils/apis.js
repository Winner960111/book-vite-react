import axios from 'axios';

// Create an instance of axios
const apis = axios.create({
  baseURL: 'https://www.riderflow.app/api/',
  headers: {
    "Content-Type": "application/json",
    'X-Api-Key': import.meta.env.VITE_X_API_KEY,
  },
});

export default apis;
