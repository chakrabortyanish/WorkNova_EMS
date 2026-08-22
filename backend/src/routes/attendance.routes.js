import express from "express";

import {
  checkIn,
  checkOut,
  getMyAttendance,
  getTodayAttendance,
  getAllAttendance,
  getEmployeeAttendance,
  getAttendanceReport,
  updateAttendanceStatus,
} from "../controllers/index.js";

import employeeAuth from "../middleware/employeeAuth.js";

const router = express.Router();

// Employee routes
router.post(
  "/check-in",
  employeeAuth,
  checkIn
);

router.patch(
  "/check-out",
  employeeAuth,
  checkOut
);

router.get(
  "/my-attendance",
  employeeAuth,
  getMyAttendance
);

// Admin routes
router.get(
  "/today",
  employeeAuth,
  getTodayAttendance
);

router.get(
  "/all",
  employeeAuth,
  getAllAttendance
);

router.get(
  "/employee/:employeeId",
  employeeAuth,
  getEmployeeAttendance
);

router.get(
  "/report",
  employeeAuth,
  getAttendanceReport
);

router.patch(
  "/:id/status",
  employeeAuth,
  updateAttendanceStatus
);

export { router as attendanceRoutes };