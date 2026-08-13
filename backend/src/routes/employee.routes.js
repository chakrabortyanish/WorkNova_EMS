import express from "express";

import {
  createEmployee,
  employeeLogin,
  getEmployeeProfile,
} from "../controllers/index.js";

import employeeAuth from "../middleware/employeeAuth.js";
import adminAuth from "../middleware/adminAuth.js"

const router = express.Router();

//! PUBLIC ROUTES

// Employee login
router.post("/login", employeeLogin);


//! ADMIN-PROTECTED ROUTE

router.post("/create",adminAuth, createEmployee);


//! EMPLOYEE-PROTECTED ROUTES

router.get("/profile", employeeAuth, getEmployeeProfile);

export default router;
