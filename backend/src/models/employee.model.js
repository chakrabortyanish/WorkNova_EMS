import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    adminId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    fullName: {
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
    },

    // Personal Information
    profileImage: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
    },

    address: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
    
      state: {
        type: String,
        required: true,
        trim: true,
      },
    
      country: {
        type: String,
        required: true,
        trim: true,
      },
    
      pinCode: {
        type: String,
        required: true,
        trim: true,
      },
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
      enum: ["Full-Time", "Part-Time",],
      default: "Full-Time",
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    /* location: {
      type: String,
      trim: true,
    }, */

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
  },

  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;