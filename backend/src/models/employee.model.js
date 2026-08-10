import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    // Authentication
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Personal Information
    profileImage: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    dateOfBirth: {
      type: Date,
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },

    // Professional Information
    department: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Intern"],
      default: "Full-Time",
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      trim: true,
    },

    // Employment Status
    status: {
      type: String,
      enum: ["Active", "On Leave", "Onboarding", "Inactive"],
      default: "Active",
    },

    // Salary Information
    basicSalary: {
      type: Number,
      required: true,
      min: 0,
    },

    // Leave Balance
    leaveBalance: {
      paidTimeOff: {
        total: {
          type: Number,
          default: 18,
        },
        used: {
          type: Number,
          default: 0,
        },
      },

      sickLeave: {
        total: {
          type: Number,
          default: 10,
        },
        used: {
          type: Number,
          default: 0,
        },
      },

      personalLeave: {
        total: {
          type: Number,
          default: 5,
        },
        used: {
          type: Number,
          default: 0,
        },
      },
    },

    // Account
    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;