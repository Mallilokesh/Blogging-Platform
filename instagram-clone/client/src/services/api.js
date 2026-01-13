import axios from 'axios';
import { API_URL } from '../constants/route';

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic API handler to reduce code duplication
const handleApiCall = async (method, endpoint, data = null) => {
  try {
    const config = { method, url: endpoint };
    if (data) config.data = data;
    
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    console.error(`API Error [${method.toUpperCase()} ${endpoint}]:`, error.message);
    return error.response?.data || { error: 'An error occurred' };
  }
};

// Auth endpoints
export const signupUser = (data) => handleApiCall('post', '/signup', data);
export const loginUser = (data) => handleApiCall('post', '/login', data);
export const followUser = (data) => handleApiCall('post', '/follow', data);

// User endpoints
export const getAllUsers = () => handleApiCall('get', '/users');
export const getUserByUsername = (data) => handleApiCall('post', '/user', data);

// File endpoints
export const uploadFile = (data) => handleApiCall('post', '/file/upload', data);

// Post endpoints
export const savePost = (data) => handleApiCall('post', '/post/save', data);
