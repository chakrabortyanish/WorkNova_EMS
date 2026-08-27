import express from "express";

import {
  applyLeave,
  getMyLeaves,
  getLeaveById,
  cancelLeave,

  getAllLeaves,
  getPendingLeaves,
  getEmployeeLeaves,

  approveLeave,
  rejectLeave,
} from "../controllers/index.js";

import adminAuth from "../middleware/adminAuth.js";
import employeeAuth from "../middleware/employeeAuth.js";

const router = express.Router();


// =====================================================
//! ADMIN ROUTES
// =====================================================

// Get all leave requests
router.get(
  "/all-leaves",
  adminAuth,
  getAllLeaves
);

// Get pending leave requests
router.get(
  "/pending",
  adminAuth,
  getPendingLeaves
);

// Get employee leave history
router.get(
  "/employee/:employeeId",
  adminAuth,
  getEmployeeLeaves
);

// Approve leave
router.patch(
  "/:id/approve",
  adminAuth,
  approveLeave
);

// Reject leave
router.patch(
  "/:id/reject",
  adminAuth,
  rejectLeave
);


// =====================================================
//! EMPLOYEE ROUTES
// =====================================================

// Apply for leave
router.post(
  "/apply",
  employeeAuth,
  applyLeave
);

// Get my leave requests
router.get(
  "/my-leaves",
  employeeAuth,
  getMyLeaves
);

// Cancel pending leave
router.patch(
  "/:id/cancel",
  employeeAuth,
  cancelLeave
);

// Get single leave (keep this last because it matches any path segment)
router.get(
  "/:id",
  employeeAuth,
  getLeaveById
);

export default router;