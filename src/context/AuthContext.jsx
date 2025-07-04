import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ nombre: null, type: null });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({
        nombre: payload.username || "Usuario",
        type: payload.type || "alumno",
      });
    } else {
      setIsAuthenticated(false);
      setUser({ nombre: null, type: null });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUser({
      nombre: payload.username || "Usuario",
      type: payload.type || "alumno",
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ nombre: null, type: null });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
