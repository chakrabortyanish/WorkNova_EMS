import { useState } from "react";
import { AdminDashboard, EmployeeDashboard } from "../components/index.js";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!localStorage.getItem("ems-token")) {
    navigate("/");
  }

  let role = user?.role;

  return <>{role === "admin" ? <AdminDashboard /> : <EmployeeDashboard />}</>;
};
