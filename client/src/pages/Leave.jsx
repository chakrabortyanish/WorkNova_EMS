import { useState, useEffect } from "react";
import { AdminLeave, EmployeeLeave } from "../components";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export const Leave = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

   useEffect(() => {
    if (!localStorage.getItem("ems-token")) {
      navigate("/");
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return <>{user.role === "admin" ? <AdminLeave /> : <EmployeeLeave />}</>;
};
