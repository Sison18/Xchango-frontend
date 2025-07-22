import axios from "axios";
import { API_BASE_URL } from "../apiBaseUrl.js";
import { getToken } from "../UTILS/secureStore.js";

//POST-ITEM with token to ensure user who post Item is utenticated

//POST-ITEM with token to ensure user who post Item is authenticated
export const postItem = async (formData) => {
  const token = await getToken();

  try {
    const response = await axios({
      method: "post",
      url: `${API_BASE_URL}/postItem`,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", 
      },
      timeout: 20000,
      // ✅ Prevent Axios from automatically transforming FormData to urlencoded string
      transformRequest: (data) => data,
    });

    return response.data;
  } catch (error) {
    console.error("Post item failed:", {
      message: error.message,
      isAxiosError: error.isAxiosError,
      code: error.code,
      request: error.request,
      response: error.response,
    });
    throw error;
  }
};

//DELETE ITEM
export const deleteItem = async (itemId) => {
  const token = await getToken();

  const response = await axios.delete(`${API_BASE_URL}/delete-item/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// GET USER'S ITEMS (OPTIONAL: Filter by availability_status)
export const getItem = async (status = null) => {
  const token = await getToken();
  const url = status
    ? `${API_BASE_URL}/my-items?status=${status}`
    : `${API_BASE_URL}/my-items`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.items;
};
