import axios from 'axios';

// support legacy variable name REACT_APP_API_BASE as well as REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL 
  || process.env.REACT_APP_API_BASE 
  || 'http://localhost:5000/api';

console.log('🔗 API Base URL:', API_URL);

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData, let browser set it with boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  console.debug(`📡 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => {
    console.debug(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
    const status = error.response?.status;
    
    console.error('❌ API Error:', {
      status,
      message: errorMsg,
      url: error.config?.url,
      method: error.config?.method,
    });

    if (status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    // Re-throw with better message
    const betterError = new Error(errorMsg);
    betterError.response = error.response;
    betterError.status = status;
    return Promise.reject(betterError);
  }
);

export default apiClient;
