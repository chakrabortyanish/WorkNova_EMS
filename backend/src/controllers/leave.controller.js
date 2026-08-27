import {Admin, Employee, Leave} from "../models/index.js";

// =====================================================
// HELPER
// Calculate total leave days
// =====================================================

const calculateTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Remove time portion
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const difference = end.getTime() - start.getTime();

  return Math.floor(
    difference / (1000 * 60 * 60 * 24)
  ) + 1;
};

// =====================================================
// APPLY FOR LEAVE
// POST /api/v1/leave/apply
// =====================================================

export const applyLeave = async (req, res) => {
  try {
    const employeeId = req.employeeId;

    if (!employeeId) {
      return res.status(401).json({
        success: false,
        message: "Employee not authenticated",
      });
    }

    const {
      leaveType,
      startDate,
      endDate,
      reason,
    } = req.body;

    // -------------------------------
    // Validate required fields
    // -------------------------------

    if (
      !leaveType ||
      !startDate ||
      !endDate ||
      !reason
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Leave type, start date, end date and reason are required",
      });
    }

    // -------------------------------
    // Check employee
    // -------------------------------

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // -------------------------------
    // Validate dates
    // -------------------------------

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    if (end < start) {
      return res.status(400).json({
        success: false,
        message:
          "End date cannot be before start date",
      });
    }

    // -------------------------------
    // Calculate total days
    // -------------------------------

    const totalDays = calculateTotalDays(
      startDate,
      endDate
    );

    // -------------------------------
    // Check overlapping leave
    // -------------------------------

    const overlappingLeave = await Leave.findOne({
      employeeId,

      status: {
        $in: ["Pending", "Approved"],
      },

      startDate: {
        $lte: end,
      },

      endDate: {
        $gte: start,
      },
    });

    if (overlappingLeave) {
      return res.status(400).json({
        success: false,
        message:
          "You already have a pending or approved leave during these dates",
      });
    }

    // -------------------------------
    // Create leave
    // -------------------------------

    const leave = await Leave.create({
      employeeId,
      leaveType,
      startDate: start,
      endDate: end,
      totalDays,
      reason,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Leave application submitted successfully",
      leave,
    });
  } catch (error) {
    console.error("Apply leave error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to apply for leave",
      error: error.message,
    });
  }
};

// =====================================================
// GET MY LEAVES
// GET /api/v1/leave/my-leaves
// =====================================================

export const getMyLeaves = async (req, res) => {
  try {
    const employeeId = req.employeeId;

    if (!employeeId) {
      return res.status(401).json({
        success: false,
        message: "Employee not authenticated",
      });
    }

    const leaves = await Leave.find({
      employeeId,
    })
      .populate(
        "employeeId",
        "fullName email department"
      )
      .populate(
        "reviewedBy",
        "fullName email"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Get my leaves error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leave records",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE LEAVE
// GET /api/v1/leave/:id
// =====================================================

export const getLeaveById = async (req, res) => {
  try {
    const employeeId = req.employeeId;
    const { id } = req.params;

    const leave = await Leave.findOne({
      _id: id,
      employeeId,
    })
      .populate(
        "employeeId",
        "fullName email department"
      )
      .populate(
        "reviewedBy",
        "fullName email"
      );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    return res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    console.error("Get leave error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leave",
      error: error.message,
    });
  }
};

// =====================================================
// CANCEL MY LEAVE
// PATCH /api/v1/leave/:id/cancel
// =====================================================

export const cancelLeave = async (req, res) => {
  try {
    const employeeId = req.employeeId;
    const { id } = req.params;

    const leave = await Leave.findOne({
      _id: id,
      employeeId,
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    if (leave.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending leave requests can be cancelled",
      });
    }

    leave.status = "Cancelled";

    await leave.save();

    return res.status(200).json({
      success: true,
      message: "Leave request cancelled successfully",
      leave,
    });
  } catch (error) {
    console.error("Cancel leave error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel leave",
      error: error.message,
    });
  }
};

// =====================================================
// ADMIN - GET ALL LEAVES
// GET /api/v1/leave/all
// =====================================================

export const getAllLeaves = async (req, res) => {
  console.log("getAllLeaves");
  try {
    const leaves = await Leave.find()
      .populate(
        "employeeId",
        "fullName email department role"
      )
      .populate(
        "reviewedBy",
        "fullName email"
      )
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Get all leaves error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leaves",
      error: error.message,
    });
  }
};

// =====================================================
// ADMIN - GET PENDING LEAVES
// GET /api/v1/leave/pending
// =====================================================

export const getPendingLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      status: "Pending",
    })
      .populate(
        "employeeId",
        "fullName email department role"
      )
      .sort({
        createdAt: 1,
      });

    return res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Get pending leaves error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pending leaves",
      error: error.message,
    });
  }
};

// =====================================================
// ADMIN - GET EMPLOYEE LEAVES
// GET /api/v1/leave/employee/:employeeId
// =====================================================

export const getEmployeeLeaves = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(
      employeeId
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const leaves = await Leave.find({
      employeeId,
    })
      .populate(
        "reviewedBy",
        "fullName email"
      )
      .sort({
        startDate: -1,
      });

    return res.status(200).json({
      success: true,

      employee: {
        _id: employee._id,
        fullName: employee.fullName,
        email: employee.email,
        department: employee.department,
      },

      count: leaves.length,

      leaves,
    });
  } catch (error) {
    console.error(
      "Get employee leaves error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch employee leave history",
      error: error.message,
    });
  }
};

// =====================================================
// ADMIN - APPROVE LEAVE
// PATCH /api/v1/leave/:id/approve
// =====================================================

export const approveLeave = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { id } = req.params;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Admin not authenticated",
      });
    }

    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    if (leave.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending leave requests can be approved",
      });
    }

    leave.status = "Approved";
    leave.reviewedBy = adminId;
    leave.reviewedAt = new Date();

    leave.rejectionReason = "";

    await leave.save();

    return res.status(200).json({
      success: true,
      message: "Leave approved successfully",
      leave,
    });
  } catch (error) {
    console.error("Approve leave error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to approve leave",
      error: error.message,
    });
  }
};

// =====================================================
// ADMIN - REJECT LEAVE
// PATCH /api/v1/leave/:id/reject
// =====================================================

export const rejectLeave = async (req, res) => {
  try {
    const adminId = req.adminId;
    const { id } = req.params;

    const { rejectionReason } = req.body;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Admin not authenticated",
      });
    }

   /*  if (!rejectionReason) {
      return res.status(400).json({
        success: false,
        message:
          "Rejection reason is required",
      });
    } */

    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    if (leave.status !== "Pending") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending leave requests can be rejected",
      });
    }

    leave.status = "Rejected";
    leave.reviewedBy = adminId;
    leave.reviewedAt = new Date();
    /* leave.rejectionReason =
      rejectionReason.trim(); */

    await leave.save();

    return res.status(200).json({
      success: true,
      message: "Leave rejected successfully",
      leave,
    });
  } catch (error) {
    console.error("Reject leave error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject leave",
      error: error.message,
    });
  }
};