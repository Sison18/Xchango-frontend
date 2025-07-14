// TOKEN HELPER
import * as secureStore from "expo-secure-store"

const TOKEN_KEY = "authToken";

// when the user logs in
export const saveToken = async (token) => {
  await secureStore.setItemAsync(TOKEN_KEY , token);
}

//get token chincheck if nakalog in na yung user
export const getToken = async () =>{
  return await secureStore.getItemAsync(TOKEN_KEY);
}

//remove token pag nag logout
export const deleteToken =  async () =>{
  return await secureStore.deleteItemAsync(TOKEN_KEY);
}

