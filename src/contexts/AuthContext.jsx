import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      setIsLoggedIn(true);
      setIsAdmin(user.isAdmin);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user'); // or clear()
    setIsLoggedIn(false);
    setIsAdmin(false);
  };



  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
