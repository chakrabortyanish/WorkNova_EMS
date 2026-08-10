import mongoose from "mongoose";

const payslipSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Salary month
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    year: {
      type: Number,
      required: true,
    },

    // Salary breakdown
    basicSalary: {
      type: Number,
      required: true,
      min: 0,
    },

    allowances: {
      type: Number,
      default: 0,
      min: 0,
    },

    deductions: {
      type: Number,
      default: 0,
      min: 0,
    },

    netPayable: {
      type: Number,
      required: true,
      min: 0,
    },

    // Payment information
    status: {
      type: String,
      enum: [
        "Pending",
        "Paid",
      ],
      default: "Pending",
    },

    paidAt: {
      type: Date,
      default: null,
    },

    paymentMethod: {
      type: String,
      enum: [
        "Bank Transfer",
        "Cash",
        "Other",
      ],
      default: "Bank Transfer",
    },

    // Payslip document
    payslipUrl: {
      type: String,
      default: "",
    },

    // Admin who generated the payslip
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// One payslip for one employee for one month/year
payslipSchema.index(
  {
    employee: 1,
    month: 1,
    year: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("Payslip", payslipSchema);