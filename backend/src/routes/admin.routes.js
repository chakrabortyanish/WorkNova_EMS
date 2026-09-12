import express from "express";

import {
  adminSignup,
  adminLogin,
  getAdminProfile,
  updateAdminProfile
} from "../controllers/index.js";

import adminAuth from "../middleware/adminAuth.js";

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

router.get(
  "/profile",
  adminAuth,
  getAdminProfile
);

router.put(
  "/update-profile",
  adminAuth, 
  updateAdminProfile
);


export default router;