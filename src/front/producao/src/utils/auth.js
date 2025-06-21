import { jwtDecode } from "jwt-decode";
import { api } from "./api";

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });

  localStorage.setItem('token', response.token);
  localStorage.setItem('role', response.role);

  const decoded = jwtDecode(response.token);
  localStorage.setItem('username', decoded.sub);

  setupAutoLogout(); 
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('username');
  localStorage.removeItem('logoutReason'); 
  clearAutoLogout();
};

// 🛠️ getters
export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('role');
export const getUsername = () => localStorage.getItem('username');

// 🔍 verifica expiração do token
export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

//  verifica autenticação
export const isAuthenticated = () => {
  const token = getToken();
  return token && !isTokenExpired(token);
};

// 🔑 verifica se é ADMIN
export const isAdmin = () => getRole() === 'ADMIN';

// ⏱️ timer do logout automatico
let logoutTimer;

export const setupAutoLogout = () => {
  clearAutoLogout();

  const token = getToken();
  if (!token) return;

  try {
    const decoded = jwtDecode(token);
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    const timeout = expirationTime - currentTime;

    if (timeout <= 0) {
      handleSessionExpired();
    } else {
      logoutTimer = setTimeout(() => {
        handleSessionExpired();
      }, timeout);
    }
  } catch (error) {
    handleSessionExpired();
  }
};

const handleSessionExpired = () => {
  localStorage.setItem('logoutReason', 'expired');
  logout();
  window.location.href = '/login';
};


export const clearAutoLogout = () => {
  if (logoutTimer) {
    clearTimeout(logoutTimer);
    logoutTimer = null;
  }
};
