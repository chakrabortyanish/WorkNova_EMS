import {Attendance} from "../models/index.js";
import {Employee} from "../models/index.js";

// Helper function
const getStartAndEndOfDay = (date = new Date()) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

// =====================================================
// CHECK IN
// POST /api/attendance/check-in
// =====================================================

export const checkIn = async (req, res) => {
    console.log("Check-in request received");
  try {
    const employeeId = req.employeeId;

    if (!employeeId) {
      return res.status(401).json({
        success: false,
        message: "Employee not authenticated",
      });
    }

    const { start, end } = getStartAndEndOfDay();

    // Check whether employee already has attendance today
    const existingAttendance = await Attendance.findOne({
      employeeId,
      date: {
        $gte: start,
        $lte: end,
      },
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: "You have already checked in today",
        attendance: existingAttendance,
      });
    }

    const checkInTime = new Date();

    // Example office start time = 9:00 AM
    const officeStartHour = 18;
    const officeStartMinute = 0;

    const officeStart = new Date();
    officeStart.setHours(
      officeStartHour,
      officeStartMinute,
      0,
      0
    );

    let status = "Present";

    if (checkInTime > officeStart) {
      status = "Late";
    }

    const attendance = await Attendance.create({
      employeeId,
      date: checkInTime,
      checkIn: checkInTime,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Check-in successful",
      attendance,
    });
  } catch (error) {
    console.error("Check-in error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check in",
      error: error.message,
    });
  }
};

// =====================================================
// CHECK OUT
// PATCH /api/attendance/check-out
// =====================================================

export const checkOut = async (req, res) => {
  try {
    const employeeId = req.employeeId;

    if (!employeeId) {
      return res.status(401).json({
        success: false,
        message: "Employee not authenticated",
      });
    }

    const { start, end } = getStartAndEndOfDay();

    const attendance = await Attendance.findOne({
      employeeId,
      date: {
        $gte: start,
        $lte: end,
      },
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "You have not checked in today",
      });
    }

    if (!attendance.checkIn) {
      return res.status(400).json({
        success: false,
        message: "Check-in record not found",
      });
    }

    if (attendance.checkOut) {
      return res.status(400).json({
        success: false,
        message: "You have already checked out today",
        attendance,
      });
    }

    const checkOutTime = new Date();

    // Calculate working hours
    const difference =
      checkOutTime.getTime() - attendance.checkIn.getTime();

    const workHours = difference / (1000 * 60 * 60);

    attendance.checkOut = checkOutTime;
    attendance.workHours = Number(workHours.toFixed(2));

    // Optional: mark half day if less than 4 hours
    if (workHours < 4) {
      attendance.status = "Half Day";
    }

    await attendance.save();

    return res.status(200).json({
      success: true,
      message: "Check-out successful",
      attendance,
    });
  } catch (error) {
    console.error("Check-out error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check out",
      error: error.message,
    });
  }
};

// =====================================================
// MY ATTENDANCE
// GET /api/attendance/my-attendance
// =====================================================

export const getMyAttendance = async (req, res) => {
  try {
    const employeeId = req.employeeId;

    if (!employeeId) {
      return res.status(401).json({
        success: false,
        message: "Employee not authenticated",
      });
    }

    const attendance = await Attendance.find({
      employeeId,
    })
      .populate("employeeId", "fullName email department")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      // count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error("Get my attendance error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

// =====================================================
// TODAY'S ATTENDANCE
// GET /api/attendance/today
// =====================================================

export const getTodayAttendance = async (req, res) => {
  try {
    const { start, end } = getStartAndEndOfDay();

    const attendance = await Attendance.find({
      date: {
        $gte: start,
        $lte: end,
      },
    })
      .populate("employeeId", "fullName email department")
      .sort({ checkIn: 1 });

    return res.status(200).json({
      success: true,
      date: start,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error("Today attendance error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch today's attendance",
      error: error.message,
    });
  }
};

// =====================================================
// ALL ATTENDANCE
// GET /api/attendance/all
// =====================================================

export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("employeeId", "fullName email department")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error("All attendance error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
      error: error.message,
    });
  }
};

// =====================================================
// EMPLOYEE ATTENDANCE
// GET /api/attendance/employee/:employeeId
// =====================================================

export const getEmployeeAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const attendance = await Attendance.find({
      employeeId,
    }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      employee: {
        id: employee._id,
        fullName: employee.fullName,
        email: employee.email,
      },
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error("Employee attendance error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch employee attendance",
      error: error.message,
    });
  }
};

// =====================================================
// ATTENDANCE REPORT
// GET /api/attendance/report
// =====================================================

export const getAttendanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let start;
    let end;

    if (startDate) {
      start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
    } else {
      start = new Date();
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
    }

    if (endDate) {
      end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
    } else {
      end = new Date();
      end.setHours(23, 59, 59, 999);
    }

    const attendance = await Attendance.find({
      date: {
        $gte: start,
        $lte: end,
      },
    })
      .populate("employeeId", "fullName email department")
      .sort({ date: -1 });

    // Summary
    const summary = {
      totalRecords: attendance.length,
      present: 0,
      absent: 0,
      late: 0,
      halfDay: 0,
      leave: 0,
      totalWorkHours: 0,
    };

    attendance.forEach((record) => {
      if (record.status === "Present") {
        summary.present++;
      }

      if (record.status === "Absent") {
        summary.absent++;
      }

      if (record.status === "Late") {
        summary.late++;
      }

      if (record.status === "Half Day") {
        summary.halfDay++;
      }

      if (record.status === "Leave") {
        summary.leave++;
      }

      summary.totalWorkHours += record.workHours || 0;
    });

    summary.totalWorkHours = Number(
      summary.totalWorkHours.toFixed(2)
    );

    return res.status(200).json({
      success: true,
      dateRange: {
        startDate: start,
        endDate: end,
      },
      summary,
      attendance,
    });
  } catch (error) {
    console.error("Attendance report error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate attendance report",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE ATTENDANCE STATUS
// PATCH /api/attendance/:id/status
// =====================================================

export const updateAttendanceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Present",
      "Absent",
      "Late",
      "Half Day",
      "Leave",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance status",
        allowedStatuses,
      });
    }

    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    attendance.status = status;

    await attendance.save();

    return res.status(200).json({
      success: true,
      message: "Attendance status updated successfully",
      attendance,
    });
  } catch (error) {
    console.error("Update attendance status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update attendance status",
      error: error.message,
    });
  }
};
