const PROD_API_URL = 'https://your-render-backend-url.onrender.com/api';
const DEV_API_URL = 'http://localhost:5000/api';

export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? PROD_API_URL
  : DEV_API_URL; 