import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {Admin} from "../models/index.js";


// ==========================================
// ADMIN SIGNUP
// ==========================================

export const adminSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      profileImage,
    } = req.body;

    // -----------------------------
    // Validate required fields
    // -----------------------------

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // -----------------------------
    // Validate password
    // -----------------------------

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long",
      });
    }

    // -----------------------------
    // Check existing admin
    // -----------------------------

    const existingAdmin = await Admin.findOne({
      email: email,
    });

    if (existingAdmin) {
      return res.status(409).json({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    // -----------------------------
    // Hash password
    // -----------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // -----------------------------
    // Create admin
    // -----------------------------

    const admin = await Admin.create({
      name: name.trim(),

      email: email.toLowerCase().trim(),

      password: hashedPassword,

      profileImage: profileImage || "",
    });

    // -----------------------------
    // Remove password from response
    // -----------------------------

    const adminResponse = admin.toObject();

    delete adminResponse.password;

    return res.status(201).json({
      success: true,

      message: "Admin account created successfully",

      admin: adminResponse,
    });

  } catch (error) {
    console.error("Admin signup error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create admin account",
      error: error.message,
    });
  }
};


// ==========================================
// ADMIN LOGIN
// ==========================================

export const adminLogin = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // -----------------------------
    // Validate input
    // -----------------------------

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // -----------------------------
    // Find admin
    // -----------------------------

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // -----------------------------
    // Check account status
    // -----------------------------

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
    }

    // -----------------------------
    // Compare password
    // -----------------------------

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        admin.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // -----------------------------
    // Generate JWT
    // -----------------------------

    const token = jwt.sign(
      {
        adminId: admin._id,
        fullName: admin.name,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn:
          process.env.JWT_EXPIRES_IN || "7d",
      }
    );

    // -----------------------------
    // Update last login
    // -----------------------------

    admin.lastLogin = new Date();

    await admin.save();

    // -----------------------------
    // Remove password
    // -----------------------------

    const adminResponse = admin.toObject();

    delete adminResponse.password;

    // -----------------------------
    // Response
    // -----------------------------

    return res.status(200).json({
      success: true,

      message: "Admin login successful",

      token,

      admin: adminResponse,
    });

  } catch (error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// Get Admin Profile
export const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.user?.id || req.adminId;

    const admin = await Admin.findById(adminId).select("-password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Admin Profile
export const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user?.id || req.adminId; 
    const { name, email } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedAdmin) {
      return res.status(404).json({ 
        success: false, 
        message: "Admin not found" 
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is already in use by another account" 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};