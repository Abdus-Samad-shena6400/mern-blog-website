import apiClient from './api';

// helper to rewrite any localhost image links on the client
export const fixImageUrl = (url) => {
  if (!url) return url;
  const localPrefix = 'http://localhost:5000';
  if (url.startsWith(localPrefix)) {
    const backendBase =
      (process.env.REACT_APP_API_URL || '').replace(/\/api$/, '') || '';
    return backendBase + url.replace(localPrefix, '');
  }
  return url;
};

// Auth APIs
export const registerUser = (userData) =>
  apiClient.post('/auth/register', userData);

export const loginUser = (userData) =>
  apiClient.post('/auth/login', userData);

export const getCurrentUser = () =>
  apiClient.get('/auth/me');

export const updateProfile = (userData) =>
  apiClient.put('/auth/update', userData);

// Blog APIs
export const getAllBlogs = (params) =>
  apiClient.get('/blogs', { params });

export const getBlogById = (id) =>
  apiClient.get(`/blogs/single/${id}`);

export const getBlogsByUser = (userId) =>
  apiClient.get(`/blogs/user/${userId}`);

export const getMyBlogs = () =>
  apiClient.get('/blogs/my-blogs');

export const createBlog = (formData) =>
  apiClient.post('/blogs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateBlog = (id, formData) =>
  apiClient.put(`/blogs/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteBlog = (id) =>
  apiClient.delete(`/blogs/${id}`);
