import axios from 'axios';

// Create an instance of axios
const apis = axios.create({
  baseURL: 'https://www.dev.creditapps.com/api',
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': 'tiJ0Wfsh.i8iP64GNla95d9nNsQIQodL15PdR0wpR',
    'Access-Control-Allow-Methods': '*',
  },
});

export default apis;
