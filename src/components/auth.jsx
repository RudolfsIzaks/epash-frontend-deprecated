import React, { createContext, useContext, useState, useEffect } from "react";
import "../index.css";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
      fetch('https://epash-ai-jaroslavsbolsak.replit.app/api/user_info', {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setIsAuthenticated(true);
          setUser(data);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      })
      .catch(error => {
        console.error('Error verifying auth:', error);
        setIsAuthenticated(false);
        setUser(null);
      })
      .finally(() => setLoading(false));  
  }, []);

  if (loading) {
    return <div className="w-full h-screen bg-white flex justify-center items-center"><div className="flex gap-3 items-center animate-pulse"><img src="../src/assets/logo.png" alt="Logo Epash" className="w-16" /><h1 className="font-bold text-4xl">Epash AI</h1></div></div>; // Or any other loading indicator
  }

  // Method to set user_id when logging in
  const login = (user_id) => {
    setUser({ ...user, user_id });
    setIsAuthenticated(true);
  };

  // Method to logout the user
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
