import { jwtDecode } from "jwt-decode";
import { api } from "./api";

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });

  localStorage.setItem('token', response.token);
  localStorage.setItem('role', response.role);

  const decoded = jwtDecode(response.token);
  localStorage.setItem('username', decoded.sub);
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
};

export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('role');
export const getUsername = () => localStorage.getItem('username');

export const isAuthenticated = () => !!getToken();
export const isAdmin = () => getRole() === 'ADMIN';
