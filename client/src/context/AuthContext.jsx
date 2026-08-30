import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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

  const [employeeInfo, setEmployeeInfo] = useState();
  const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/employee/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("ems-token")}`,
            },
          },
        );
        if (res.data.success) {
          setEmployeeInfo(res.data.employee);
          // console.log("Employee profile:", res.data.employee);
        }
      } catch (error) {
        console.error("Error fetching employee profile:", error);
      }
    };

  if(user?.role === "employee"){
    fetchProfile();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, employeeInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

 const useAuth = () => useContext(AuthContext);

 export { AuthProvider, useAuth };