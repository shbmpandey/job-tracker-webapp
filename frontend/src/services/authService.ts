import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data; // Returns JWT Token
};

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password });
  return response.data;
};
