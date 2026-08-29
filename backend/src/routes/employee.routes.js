import express from "express";

import {
  createEmployee,
  employeeLogin,
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

router.post("/create",adminAuth, createEmployee);


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
