import axios from 'axios';

// Create an instance of axios
console.log('mode=================>', import.meta.env.MODE);
const api = axios.create({
  baseURL: import.meta.env.MODE == 'development' ?`http://${window.location.hostname}:80/api`:`${window.location.origin}/api` ,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
