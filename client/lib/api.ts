// client/lib/api.ts
// This file is used to create an axios instance that will be used to make requests to the backend API.
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // My backend API
});

export default api;
