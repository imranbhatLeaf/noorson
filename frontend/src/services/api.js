import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAPI = {
  getProducts: () => api.get('/products'),
  getProductById: (id) => api.get(`/products/${id}`),
};

export const inquiryAPI = {
  sendInquiry: (data) => api.post('/inquiries', data),
};

export const uploadAPI = {
  uploadImage: (formData) => api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default api;
