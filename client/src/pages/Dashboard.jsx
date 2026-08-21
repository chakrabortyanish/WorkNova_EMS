import { useState } from "react";
import { AdminDashboard, EmployeeDashboard } from "../components/index.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

   if (!localStorage.getItem("ems-token")) {
    navigate("/");
  }

  const [role, setRole] = useState(user?.role); // Mock role state
  return <>{role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />}</>;
};
