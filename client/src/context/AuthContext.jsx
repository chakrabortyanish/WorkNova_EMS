import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

function AuthProvider({ children }) {
  // Initialize state by safely decoding the token from localStorage
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("ems-token");
    try {
      return token ? jwtDecode(token) : null;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  });

  // Login function: saves token and updates user state
  const login = (token) => {
    localStorage.setItem("ems-token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  // Logout function: clears storage and resets user state
  const logout = () => {
    localStorage.removeItem("ems-token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

 const useAuth = () => useContext(AuthContext);

 export { AuthProvider, useAuth };