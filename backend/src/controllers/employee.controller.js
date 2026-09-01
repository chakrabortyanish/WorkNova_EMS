import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Employee from "../models/employee.model.js";

//! GET ALL EMPLOYEES
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({adminId: req.adminId}).select("-password");

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get employees",
    });
  }
};

// ==========================================
//! CREATE EMPLOYEE
// ==========================================
export const createEmployee = async (req, res) => {

  try {
    const {
      fullName,
      email,
      password,
      phone,
      gender,
      dateOfBirth,
      address,
      department,
      designation,
      employmentType,
      joiningDate,
      basicSalary,
      profileImage,
    } = req.body;

    // Required field validation
    if (
      !fullName ||
      !email ||
      !password ||
      !phone ||
      !gender ||
      !address ||
      !department ||
      !designation ||
      !employmentType ||
      !joiningDate ||
      basicSalary === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // console.log("body: ",req.body)

    // Password validation can handle frontend
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Check email
    const existingEmployee = await Employee.findOne({
      email: email,
    });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "Employee with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create Employee
    const employee = await Employee.create({
        
      adminId: req.adminId,

      fullName,

      email: email.toLowerCase(),

      password: hashedPassword,

      phone,

      gender,

      dateOfBirth,

      address,

      department,

      designation,

      employmentType,

      joiningDate,

      basicSalary,

      profileImage: profileImage || "",

      status: "Active",
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
    });
  } catch (error) {
    console.error("Create employee error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create employee",
      error: error.message,
    });
  }
};

// ==========================================
//! EMPLOYEE LOGIN
// ==========================================

export const employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find employee
    const employee = await Employee.findOne({
      email: email,
    });

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check account status
    /* if (employee.status === "Inactive") {
      return res.status(403).json({
        success: false,
        message: "Your employee account is inactive",
      });
    } */

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, employee.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // -----------------------------
    //* Create JWT
    // -----------------------------

    const token = jwt.sign(
      {
        employeeId: employee._id,
        fullName: employee.fullName,
        role: "employee",
      },

      process.env.JWT_SECRET,

      {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      },
    );

    return res.status(200).json({
      success: true,

      message: "Employee login successful",

      token,

      employee,
    });
  } catch (error) {
    console.error("Employee login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// ==========================================
//! GET LOGGED-IN EMPLOYEE
// ==========================================

export const getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.employeeId).select(
      "-password",
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("Get employee profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch employee profile",
      error: error.message,
    });
  }
};

//! Update Profile Image
export const updateProfileImage = async (req, res) => {
  try {
    const employeeId = req.employeeId;

    // console.log("Uploaded file:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // CloudinaryStorage already uploaded the image.
    // Get Cloudinary URL from req.file
    employee.profileImage = req.file.path;
    employee.isImageUpdate = true;

    await employee.save();

    return res.status(200).json({
      success: true,
      message: "Profile image updated successfully",
      profileImage: employee.profileImage,
    });
  } catch (error) {
    console.error("Update profile image error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile image",
      error: error.message,
    });
  }
};

//! Update Password
export const updatePassword = async (req, res) => {
  try {
    const employeeId = req.employeeId;

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check current password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      employee.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    employee.password = hashedPassword;
    employee.isPasswordUpdate = true;

    await employee.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Update password error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};
