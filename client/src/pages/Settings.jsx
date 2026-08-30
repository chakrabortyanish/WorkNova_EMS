import { AdminSettings, EmployeeSettings } from "../components";

import { useAuth } from "../context/AuthContext.jsx";

export const Settings = () => {
  const { user } = useAuth();
  let role = user?.role;

  return <>{role === "admin" ? <AdminSettings /> : <EmployeeSettings />}</>;
};
