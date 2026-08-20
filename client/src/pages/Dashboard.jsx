import { useState } from "react";
import { AdminDashboard, EmployeeDashboard } from "../components/index.js";
import { jwtDecode } from "jwt-decode";

import { useAuth } from "../context/AuthContext.jsx";

export const Dashboard = () => {
  const { user } = useAuth();

  const [role, setRole] = useState(user?.role); // Mock role state
  return <>{role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />}</>;
};
