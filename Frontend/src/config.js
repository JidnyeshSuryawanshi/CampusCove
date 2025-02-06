// Default to production API URL if environment variable is not set
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://campus-cove.onrender.com/api';

export { API_BASE_URL }; 