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
      <Route path="/" element={<Layout />}>
        <Route index path="/dashboard" element={<Dashboard />} />
        <Route path="/payslips" element={<PaySlips />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
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
