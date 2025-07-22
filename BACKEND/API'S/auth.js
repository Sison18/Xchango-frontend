// axios apis from backend
import * as mime from "react-native-mime-types";
import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl.js";


// SIGN UP
export const signup = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/signup`, formData);

  return response.data;
};

// LOGIN
export const login = async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/login`, formData);
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
    `${API_BASE_URL}/logout`,
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
    `${API_BASE_URL}/update-profile`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};


// UPDATE PROFILE PICTURE ( FIXED)
export const updateProfilePicture = async (token, imageFile) => {
  if (!imageFile || !imageFile.uri) {
    throw new Error("No image file provided");
  }

  const uri = imageFile.uri;
  const name = uri.split("/").pop();
  const type = mime.lookup(uri) || "image/jpeg";

  const formData = new FormData();
  formData.append("profile_picture", {
    uri,
    type,
    name,
  });

  const response = await axios.put(`${API_BASE_URL}/profile-picture`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// UPDATE PROFILE BY EMAIL (for FillUpScreen before login)
export const updateProfileByEmail = async (profileData) => {
  const response = await axios.post(
    `${API_BASE_URL}/update-profile-by-email`,
    profileData
  );
  return response.data;
};
