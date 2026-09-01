import express from "express";

import {
  createPayslip,
  getAllPayslips,
  getMyPayslips,
  getPayslip,
  markAsPaid,
} from "../controllers/index.js";

import adminAuth from "../middleware/adminAuth.js";
import employeeAuth from "../middleware/employeeAuth.js";

const router = express.Router();


// Admin
router.post("/", adminAuth, createPayslip);

router.get("/all", adminAuth, getAllPayslips);

router.patch("/:id/pay", adminAuth, markAsPaid);


// Employee
router.get("/my", employeeAuth, getMyPayslips);

router.get("/:id", employeeAuth, getPayslip);


export default router;