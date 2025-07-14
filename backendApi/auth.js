// axios apis from backend

import axios from "axios";

const API_BASE_URL = "http://192.168.100.18:3001/api"; // Change this when deploying or hosted na

// SIGN UP
export const signup = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/SignUp`, formData);

  return response.data;
};

// LOGIN
export const login = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/logIn`, formData);
  return response.data;
};

// GOOGLE LOGIN
export const googleLogin = async (idToken) => {
  const response = await axios.post(`${API_BASE_URL}/Google`, {
    id_token: idToken,
  });
  return response.data;
};

// LOGOUT
export const logout = async (token) => {
  const response = await axios.post(
    `${API_BASE_URL}/logOut`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// GET USER PROFILE (/me) authenticated user using tokens
export const getMe = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_BASE_URL}/forgot-password`, {
    email,
  });
  return response.data;
};

// RESET PASSWORD
export const resetPassword = async (resetData) => {
  const response = await axios.post(
    `${API_BASE_URL}/reset-password`,
    resetData
  );
  return response.data;
};

// UPDATE PROFILE OR SUBMIT
export const updateProfile = async (token, profileData) => {
  const response = await axios.put(
    `${API_BASE_URL}/update-profile`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
