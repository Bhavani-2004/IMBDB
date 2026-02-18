import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // 👈 new state


  // ✅ Check login status from backend when app loads
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/users/profile", {
          method: "GET",
          credentials: "include", // important: sends cookies
        });
        console.log(response)
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
      }finally {
        setIsCheckingAuth(false); // 👈 done checking
      }
    };

    checkAuthStatus();
  }, []);

  // ✅ login: no need to store token manually
  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include", // sends and receives cookies
      });

      if (response.ok) {
        setIsAuthenticated(true);
        return {success: true,message:"Login successful"};
      } else {
        const responseData = await response.json();
        setIsAuthenticated(false);
        return {success: false,message:responseData.message || "Login failed"};
      }
    } catch (error) {
        return {success: false,message:error.message || "Login failed"};
    }
  };

  // ✅ logout: clear cookie via backend
  const logout = async () => {
    try {
      await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{isCheckingAuth, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
