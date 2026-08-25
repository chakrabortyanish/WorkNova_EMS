//! for employee routes
import { createEmployee, employeeLogin, getEmployeeProfile } from "./employee.controller.js";

export { createEmployee, employeeLogin, getEmployeeProfile }; 


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