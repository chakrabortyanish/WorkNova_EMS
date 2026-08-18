import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

// all pages
import {
  Layout,
  Dashboard,
  PaySlips,
  Settings,
  Leave,
  Employees,
  Attendance,
} from "./pages/index.js";
import LoginPage from "./pages/LoginPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="leave" element={<Leave />} />
        <Route path="payslips" element={<PaySlips />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </>,
  ),
);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
