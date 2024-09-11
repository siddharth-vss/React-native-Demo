import axios from 'axios';

// const API_URL = 'http://localhost:3000';
//const API_URL = 'http://192.168.0.176:3000';
const API_URL = process.env.REACT_APP_API_BASE_URL || 'https://chatboat.koyeb.app';

export const register = (username: string, password: string) => {
  console.log("urls", API_URL)
  return axios.post(`${API_URL}/users/register`, { username, password });
};

export const login = (username: string, password: string) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};