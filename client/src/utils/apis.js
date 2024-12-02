import axios from 'axios';

// Create an instance of axios
const apis = axios.create({
  baseURL: 'https://www.riderflow.app/api/',
  headers: {
    "Content-Type": "application/json",
  },
});

export default apis;
