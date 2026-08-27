import { useState } from "react";
import { AdminLeave, EmployeeLeave } from "../components";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const Leave = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!localStorage.getItem("ems-token")) {
    navigate("/");
  }

  let role = user?.role;

  return <>{role === "admin" ? <AdminLeave /> : <EmployeeLeave />}</>;
};
