const PROD_API_URL = import.meta.env.VITE_PROD_API_URL;
const DEV_API_URL = 'http://localhost:5000/api';

export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? PROD_API_URL
  : DEV_API_URL; 