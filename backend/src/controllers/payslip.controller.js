import {Payslip} from "../models/index.js";

// Admin creates payslip for one employee
export const createPayslip = async (req, res) => {
  try {
    const {
      employee,
      month,
      year,
      basicSalary,
      allowances = 0,
      deductions = 0,
      paymentMethod = "Bank Transfer",
    } = req.body;

    if (!employee || !month || !year || basicSalary === undefined) {
      return res.status(400).json({
        success: false,
        message: "Employee, month, year and salary are required",
      });
    }

    // Check if payslip already exists
    const existingPayslip = await Payslip.findOne({
      employee,
      month,
      year,
    });

    if (existingPayslip) {
      return res.status(400).json({
        success: false,
        message: "Payslip already exists for this employee",
      });
    }

    // Calculate net salary
    const netPayable =
      Number(basicSalary) +
      Number(allowances) -
      Number(deductions);

    if (netPayable < 0) {
      return res.status(400).json({
        success: false,
        message: "Net salary cannot be negative",
      });
    }

    const payslip = await Payslip.create({
      employee,
      month,
      year,
      basicSalary,
      allowances,
      deductions,
      netPayable,
      paymentMethod,
      generatedBy: req.adminId,
    });

    const result = await Payslip.findById(payslip._id)
      .populate("employee", "name email")
      .populate("generatedBy", "name email");

    res.status(201).json({
      success: true,
      message: "Payslip created successfully",
      payslip: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create payslip",
    });
  }
};


// Admin gets all payslips
export const getAllPayslips = async (req, res) => {
  try {
    const payslips = await Payslip.find()
      .populate("employee", "profileImage fullName email")
      .sort({ year: -1, month: -1 });

    res.status(200).json({
      success: true,
      payslips,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get payslips",
    });
  }
};


// Employee gets own payslips
export const getMyPayslips = async (req, res) => {
  try {
    const payslips = await Payslip.find({
      employee: req.employeeId,
    }).sort({
      year: -1,
      month: -1,
    });

    res.status(200).json({
      success: true,
      payslips,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get payslips",
    });
  }
};


// Admin marks payslip as paid
export const markAsPaid = async (req, res) => {
  try {
    const { id } = req.params;

    const payslip = await Payslip.findById(id);

    if (!payslip) {
      return res.status(404).json({
        success: false,
        message: "Payslip not found",
      });
    }

    payslip.status = "Paid";
    payslip.paidAt = new Date();

    await payslip.save();

    res.status(200).json({
      success: true,
      message: "Payslip marked as paid",
      payslip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update payslip",
    });
  }
};


// Get one payslip
export const getPayslip = async (req, res) => {
  try {
    const payslip = await Payslip.findById(req.params.id)
      .populate("employee", "name email role");

    if (!payslip) {
      return res.status(404).json({
        success: false,
        message: "Payslip not found",
      });
    }

    res.status(200).json({
      success: true,
      payslip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to get payslip",
    });
  }
};