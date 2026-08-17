import jwt from "jsonwebtoken";
import {Admin} from "../models/index.js";

const adminAuth = async (req, res, next) => {
  try {
    let token;

      // 1. Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token =
        req.headers.authorization.split(" ")[1];
    }

    // 2. If no header token, check cookie
    // if (!token && req.cookies?.token) {
    //   token = req.cookies.token;
    // }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find admin
    const admin = await Admin.findById(
      decoded.adminId
    ).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Check account
    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        message: "Admin account is inactive",
      });
    }

    // Attach admin to request
    req.adminId = admin._id;

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

export default adminAuth;