import express from "express";

import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  employeeLogin,
  deleteEmployee,
  getEmployeeProfile,
  updateProfileImage,
  updatePassword
} from "../controllers/index.js";

import employeeAuth from "../middleware/employeeAuth.js";
import adminAuth from "../middleware/adminAuth.js"
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

//! PUBLIC ROUTES

// Employee login
router.post("/login", employeeLogin);


//! ADMIN-PROTECTED ROUTE

// get all employees
router.get("/all",adminAuth, getAllEmployees);
router.post("/create",adminAuth, createEmployee);
router.put("/edit/:id", adminAuth, updateEmployee);
router.delete("/delete/:id", adminAuth, deleteEmployee);


//! EMPLOYEE-PROTECTED ROUTES

router.get("/profile", employeeAuth, getEmployeeProfile);

//! Update profile image
router.patch(
  "/profile-image",
  employeeAuth,
  upload.single("profileImage"),
  updateProfileImage
);

//! Update password
router.patch(
  "/password",
  employeeAuth,
  updatePassword
);

export default router;
