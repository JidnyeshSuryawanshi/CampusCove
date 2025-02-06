export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-render-backend-url.onrender.com/api'
  : 'http://localhost:5000/api'; 