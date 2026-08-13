import express from "express";

import {
  adminSignup,
  adminLogin,
} from "../controllers/admin.controller.js";

const router = express.Router();


// ==========================================
// ADMIN AUTH
// ==========================================

// Signup
router.post(
  "/signup",
  adminSignup
);

// Login
router.post(
  "/login",
  adminLogin
);


export default router;