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
