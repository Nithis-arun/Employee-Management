// src/api.js
import axios from 'axios';

// Hardcoded API and Photo URLs
const API_BASE = 'http://localhost:8080/api';
const PHOTO_BASE = 'http://localhost:8080/uploads';

// Create Axios instance for JSON requests
const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Helper to get photo URL
export const photoUrl = (filename) => filename ? `${PHOTO_BASE}/${filename}` : null;

// Employees API calls
export const getEmployees = () => client.get('/employees');
export const getEmployee = (id) => client.get(`/employees/${id}`);
export const createEmployee = (formData) => client.post('/employees', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateEmployee = (id, data) => client.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => client.delete(`/employees/${id}`);

// Upload employee photo
export const uploadPhoto = (id, file) => {
  const fd = new FormData();
  fd.append('file', file);
  return client.post(`/employees/upload/${id}`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
