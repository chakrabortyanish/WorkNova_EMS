//! for employee controllers
import {
  getAllEmployees,
  createEmployee,
  employeeLogin,
  getEmployeeProfile,
  updateProfileImage,
  updatePassword,
} from "./employee.controller.js";

export {
  getAllEmployees,
  createEmployee,
  employeeLogin,
  getEmployeeProfile,
  updateProfileImage,
  updatePassword,
};

//! for attendance controllers
import {
  checkIn,
  checkOut,
  getMyAttendance,
  getTodayAttendance,
  getAllAttendance,
  getEmployeeAttendance,
  getAttendanceReport,
  updateAttendanceStatus,
} from "./attendance.controller.js";

export {
  checkIn,
  checkOut,
  getMyAttendance,
  getTodayAttendance,
  getAllAttendance,
  getEmployeeAttendance,
  getAttendanceReport,
  updateAttendanceStatus,
};

//! for leave routes
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
} from "../controllers/leave.controller.js";

export {
  applyLeave,
  getMyLeaves,
  getLeaveById,
  cancelLeave,
  getAllLeaves,
  getPendingLeaves,
  getEmployeeLeaves,
  approveLeave,
  rejectLeave,
};


//! for payslip routes

import {
  createPayslip,
  getAllPayslips,
  getMyPayslips,
  getPayslip,
  markAsPaid,
} from "../controllers/payslip.controller.js";

export {
  createPayslip,
  getAllPayslips,
  getMyPayslips,
  getPayslip,
  markAsPaid,
};