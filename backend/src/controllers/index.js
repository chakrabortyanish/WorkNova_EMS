//! for employee controllers
import {
  createEmployee,
  employeeLogin,
  getEmployeeProfile,
} from "./employee.controller.js";

export { createEmployee, employeeLogin, getEmployeeProfile };

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

export { applyLeave, getMyLeaves, getLeaveById, cancelLeave, getAllLeaves, getPendingLeaves, getEmployeeLeaves, approveLeave, rejectLeave };
