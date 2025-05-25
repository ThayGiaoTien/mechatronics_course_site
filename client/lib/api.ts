// client/lib/api.ts
// This file is used to create an axios instance that will be used to make requests to the backend API.
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mechatronicscoursesite-production.up.railway.app/api',  // Updated backend API
});

export default api;
