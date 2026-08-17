import { useState } from "react";
import { X } from "lucide-react";

import axios from "axios";
import { toast } from "react-hot-toast";

export const CreateEmployee = ({ setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    department: "",
    designation: "",
    employmentType: "Full-Time",
    joiningDate: "",
    basicSalary: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const employeeData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,

      address: {
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pinCode: formData.pinCode,
      },

      department: formData.department,
      designation: formData.designation,
      employmentType: formData.employmentType,
      joiningDate: formData.joiningDate,
      basicSalary: Number(formData.basicSalary),
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/employee/create`,
      employeeData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ems-token")}`,
        },
      }
    );

    console.log("Response:", response.data);

    if (response.data.success) {
      toast.success(response.data.message);
      setIsModalOpen(false);
    }
  } catch (error) {
    console.error("Error creating employee:", error);

    // Backend response
    console.log("Backend error:", error.response?.data);

    const message =
      error.response?.data?.message ||
      "Failed to create employee";

    toast.error(message);
  }
};

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-white mb-1">Add New Employee</h2>

        <p className="text-xs text-slate-400 mb-6">
          Enter employee details to send an onboarding invitation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personal Information */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              Personal Information
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Full Name */}
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Work Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Temporary Password
                </label>

                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter temporary password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Gender
                </label>

                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Address</h3>

            <div className="grid grid-cols-2 gap-3">
              {/* City */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Kolkata"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* State */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  required
                  placeholder="e.g. West Bengal"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Country */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  required
                  placeholder="e.g. India"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* PIN Code */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  PIN Code
                </label>

                <input
                  type="text"
                  name="pinCode"
                  required
                  placeholder="e.g. 700001"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              Professional Information
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {/* Department */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Department
                </label>

                <select
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design & UX">Design & UX</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Designation
                </label>

                <select
                  name="designation"
                  required
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select Designation</option>

                  <option value="Intern">Intern</option>
                  <option value="Junior Software Engineer">
                    Junior Software Engineer
                  </option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Senior Software Engineer">
                    Senior Software Engineer
                  </option>
                  <option value="Tech Lead">Tech Lead</option>
                  <option value="Engineering Manager">
                    Engineering Manager
                  </option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="Product Designer">Product Designer</option>
                  <option value="HR Executive">HR Executive</option>
                  <option value="HR Manager">HR Manager</option>
                  <option value="Marketing Executive">
                    Marketing Executive
                  </option>
                  <option value="Sales Executive">Sales Executive</option>
                  <option value="Accountant">Accountant</option>
                </select>
              </div>

              {/* Employment Type */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Employment Type
                </label>

                <select
                  name="employmentType"
                  required
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
              </div>

              {/* Joining Date */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Joining Date
                </label>

                <input
                  type="date"
                  name="joiningDate"
                  required
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Basic Salary */}
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Basic Salary
                </label>

                <input
                  type="number"
                  name="basicSalary"
                  required
                  min="0"
                  placeholder="e.g. 35000"
                  value={formData.basicSalary}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20"
            >
              Create Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
