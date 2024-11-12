import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export const fetchUsers = () => api.get('/users');
export const fetchUserById = (id) => api.get(`/users/${id}`);
export const createUser = (email, age) => api.post('/users', { email, age });
export const updateUser = (id, data) => api.patch(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);
export const fetchUserProfile = (id) => api.get(`/users/${id}/profile`);
export const uploadUserProfile = (id, file) => api.put(`/users/${id}/profile`, file, {
  headers: { 'Content-Type': 'image/*' }
});
export const deleteUserProfile = (id) => api.delete(`/users/${id}/profile`);
