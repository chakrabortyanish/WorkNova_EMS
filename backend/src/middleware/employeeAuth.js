import jwt from "jsonwebtoken";
import Employee from "../models/employee.model.js";

const employeeAuth = async (req, res, next) => {
  // console.log("Employee authentication middleware triggered");
  try {
    let token;

    // Get token from Authorization
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find employee
    const employee = await Employee.findById(decoded.employeeId).select(
      "-password",
    );

    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check inactive account
    if (employee.status === "Inactive") {
      return res.status(403).json({
        success: false,
        message: "Employee account is inactive",
      });
    }

    // Attach employee to request
    req.employeeId = employee._id;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default employeeAuth;
