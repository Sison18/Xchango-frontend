import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, saveToken, deleteToken }from "../UTILS/secureStore.js";
import { getMe, login as apiLogin, googleLogin as apiGoogleLogin, logout as apiLogout } from "../API'S/auth.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login on app start
  useEffect(() => {
    const loadUser = async () => {
      const token = await getToken();
      if (!token) return setLoading(false);
      try {
        const me = await getMe(token);
        setUser(me);
      } catch (err) {
        console.log("Auto-login failed", err);
        await deleteToken();
      }
      setLoading(false);
    };
    loadUser();
  }, []);


  // UPDATED Put Try catch
 const login = async (email, password) => {
  try {
  const { token } = await apiLogin({ email, password }); // only token returned
  await saveToken(token);
  const me = await getMe(token); // fetch real user
  setUser(me);
  } catch (err) {
    throw err;
    
  }
};

  //GOOGLE LOGIN
  const loginWithGoogle = async (idToken) => {
  const { token } = await apiGoogleLogin(idToken); // only token returned
  await saveToken(token);
  const me = await getMe(token); // fetch real user
  setUser(me);
};


  // 
  const logout = async () =>{
    try {
    const token = await getToken();
    if (token){
      await apiLogout(token) // notify the backend ne idelete ang session
    }
    } catch (error) {
      console.error("Logout Error", error);
    }finally{
      await deleteToken(); // always delete token even logout fails
      setUser(null); // kickout the user hahah kickout ampochi haha
    }
  }

  return (
  <AuthContext.Provider
    value={{ user, setUser, login, loginWithGoogle, logout, loading }}
  >
    {children}
  </AuthContext.Provider>
);
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);
