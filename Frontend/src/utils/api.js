import axios from 'axios';

// Configure API URL based on environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Add a request interceptor to include auth token on every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling
    if (error.response) {
      // Server responded with an error status code
      console.error('API Error Response:', error.response.data);
      
      // Handle authentication errors
      if (error.response.status === 401) {
        // You might want to redirect to login or refresh token
        console.warn('Authentication error. Redirecting to login...');
        // Uncomment to redirect to login on auth errors
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('API No Response:', error.request);
    } else {
      // Something else caused the error
      console.error('API Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API request utilities
export const fetchHostels = async () => {
  try {
    const response = await api.get('/hostel-rooms');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMessServices = async () => {
  try {
    const response = await api.get('/mess');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGyms = async () => {
  try {
    const response = await api.get('/gym');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching gyms:', error);
    throw error;
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createStudentProfile = async (profileData) => {
  try {
    const response = await api.post('/student/profile', profileData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudentProfile = async (profileData) => {
  try {
    const response = await api.put('/student/profile', profileData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getStudentProfileStatus = async () => {
  try {
    const response = await api.get('/student/profile/status');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileCompletionSteps = async () => {
  try {
    const response = await api.get('/student/profile/completion-steps');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Student Profile API methods
export const getUserDetails = async () => {
  try {
    const response = await api.get('/student/details');
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const getStudentProfile = async () => {
  try {
    const response = await api.get('/student/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePersonalInfo = async (data) => {
  try {
    const response = await api.put('/student/profile/personal', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAcademicInfo = async (data) => {
  try {
    const response = await api.put('/student/profile/academic', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePaymentInfo = async (data) => {
  try {
    const response = await api.put('/student/profile/payment', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePreferences = async (data) => {
  try {
    const response = await api.put('/student/profile/preferences', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadDocument = async (formData, onUploadProgress) => {
  try {
    const response = await api.post('/student/profile/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDocument = async (documentId) => {
  try {
    const response = await api.delete(`/student/profile/documents/${documentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api; 