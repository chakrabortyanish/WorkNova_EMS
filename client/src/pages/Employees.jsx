import React, { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  LayoutGrid,
  List,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  X,
  Check,
  Building,
  Trash2,
  Edit,
} from "lucide-react";
import { CreateEmployee } from "../components";

import axios from "axios";
import { toast } from "react-hot-toast";
import { EditEmployee } from "../components/EditEmployee";

import defaultPic from "../assets/default-picture.png";

export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'grid'
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  // const [selectedType, setSelectedType] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEmployees = async () => {
    try {
      toast.loading("Loading Employees...");

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/employee/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ems-token")}`,
          },
        },
      );
      if (res.data.success) {
        setEmployees(res.data.employees);
        console.log("Employees:", res.data.employees);
      }
    } catch (error) {
      console.error("Error fetching employee profile:", error);
    } finally {
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // New Employee Form State
  const [newEmp, setNewEmp] = useState({
    name: "",
    role: "",
    department: "Engineering",
    type: "Full-Time",
    email: "",
    phone: "",
    location: "",
  });

  // Filter Employees Logic
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      emp.role?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm?.toLowerCase());

    const matchesDept =
      selectedDept === "All" || emp.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Handle Delete Feature
  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      toast.loading("Deleting employee...");
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/employee/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ems-token")}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message || "Employee deleted successfully");
        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error(error.response?.data?.message || "Failed to delete employee");
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Employee Directory
              </h1>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="w-3 h-3" /> {employees.length} Total Staff
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Manage team members, roles, employment types, and profiles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>
        </header>

        {/* --- Search & Controls Bar --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search name, role, email, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Filters & View Toggles */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Department Filter */}
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design & UX">Design & UX</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
            </select>

            {/* Employment Type Filter */}
            {/*  <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select> */}

            {/* Layout Toggle (Table vs Grid) */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "table"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Main Content Section --- */}
        {viewMode === "table" ? (
          /* Table View */
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-2">Employee</th>
                    <th className="py-3.5 px-2">Department</th>
                    <th className="py-3.5 px-2">Type</th>
                    <th className="py-3.5 px-2">Location</th>
                    <th className="py-3.5 px-2">Status</th>
                    <th className="py-3.5 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <tr
                        key={emp._id}
                        className="hover:bg-slate-800/40 transition-colors duration-150 group"
                      >
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={emp.profileImage || defaultPic}
                              alt={emp.fullName}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-indigo-500/50 transition-all"
                            />
                            <div>
                              <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                                {emp.fullName}
                                <span className="text-[10px] text-slate-500 font-normal">
                                  <span className="text-indigo-400">(</span>{" "}
                                  {emp._id.toString().slice(0, 6)}{" "}
                                  <span className="text-indigo-400">)</span>
                                </span>
                              </div>
                              <div className="text-xs text-slate-400">
                                {emp.designation}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-2 text-xs text-slate-300 font-medium">
                          {emp.department}
                        </td>

                        <td className="py-4 px-2 text-xs text-slate-400">
                          <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 font-mono">
                            {emp.employmentType}
                          </span>
                        </td>

                        <td className="py-4 px-2 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            {emp.address.city}, {emp.address.country}
                          </div>
                        </td>

                        <td className="py-4 px-2">
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full border ${
                              emp.status === "Active"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : emp.status === "On Leave"
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                  : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                emp.status === "Active"
                                  ? "bg-emerald-400"
                                  : emp.status === "On Leave"
                                    ? "bg-amber-400"
                                    : "bg-indigo-400"
                              }`}
                            />
                            {emp.status}
                          </span>
                        </td>

                        <td className="py-4 px-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setSelectedEmployee(emp);
                                setIsEditModalOpen(true);
                              }}
                              className="text-slate-500 hover:text-indigo-400 p-1 rounded transition-colors cursor-pointer"
                              title="Edit Employee"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEmployee(emp._id)}
                              className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                              title="Delete Employee"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-slate-500 text-xs"
                      >
                        No employees found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid View Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((emp) => (
              <div
                key={emp._id}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-lg relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={emp.profileImage || defaultPic}
                        alt={emp.fullName}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/30"
                      />
                      <div>
                        <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors text-base">
                          {emp.fullName}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {emp.designation}
                        </p>
                      </div>
                    </div>
                    <button className="text-slate-500 hover:text-white p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300 my-4 border-t border-b border-slate-800/80 py-3">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Building className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{emp.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="truncate">{emp.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>
                        {emp.address.city}, {emp.address.country}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span
                    className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                      emp.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {emp.status}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {emp.employmentType}
                  </span>
                </div>
              </div>
            ))}
            {filteredEmployees.length === 0 && (
              <div className="col-span-full text-center text-slate-500 text-xs py-8">
                No employees found matching your filters.
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- Add Employee Modal --- */}
      {isModalOpen && <CreateEmployee setIsModalOpen={setIsModalOpen} />}
      {isEditModalOpen && (
        <EditEmployee
          employee={selectedEmployee}
          setIsEditModalOpen={setIsEditModalOpen}
          setEmployees={setEmployees}
        />
      )}
    </div>
  );
};
