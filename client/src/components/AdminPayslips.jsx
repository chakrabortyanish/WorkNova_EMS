import { useEffect, useState } from "react";
import axios from "axios";

import {
  Search,
  Eye,
  X,
  CreditCard,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  Plus,
} from "lucide-react";

import defalut_pic from "../assets/default-picture.png";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1`;

// all months
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AdminPayslips = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",
    month: "",
    year: new Date().getFullYear(),
    basicSalary: "",
    allowances: "",
    deductions: "",
    paymentMethod: "Bank Transfer",
  });

  const token = localStorage.getItem("ems-token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ========================================
  // FETCH ALL PAYSLIPS
  // ========================================

  const fetchPayslips = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/payslip/all`, axiosConfig);

      setPayrolls(response.data.payslips);
      console.log(5, response.data.payslips);
    } catch (error) {
      console.error("Fetch payslips error:", error);

      alert(error.response?.data?.message || "Failed to fetch payslips");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // FETCH EMPLOYEES
  // ========================================

  const fetchEmployees = async () => {
    try {
      /*
       * Change this URL if your existing employee API
       * uses a different endpoint.
       */
      const response = await axios.get(`${API_URL}/employee/all`, axiosConfig);

      if (response.data.success === true) {
        setEmployees(response.data.employees);
        // setPayro(response.data.employees);
      }

      console.log(12, response.data.employees);
    } catch (error) {
      console.error("Fetch employees error:", error);

      alert(error.response?.data?.message || "Failed to fetch employees");
    }
  };

  // ========================================
  // LOAD DATA
  // ========================================

  useEffect(() => {
    fetchPayslips();
    fetchEmployees();
  }, []);

  // ========================================
  // FORM CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================================
  // CREATE PAYSLIP
  // ========================================

  const handleCreatePayslip = async (e) => {
    e.preventDefault();

    if (!formData.employee) {
      alert("Please select an employee");
      return;
    }

    if (!formData.basicSalary) {
      alert("Please enter basic salary");
      return;
    }

    try {
      setCreating(true);

      await axios.post(
        `${API_URL}/payslip`,
        {
          employee: formData.employee,
          month: formData.month,
          year: Number(formData.year),
          basicSalary: Number(formData.basicSalary),
          allowances: Number(formData.allowances || 0),
          deductions: Number(formData.deductions || 0),
          paymentMethod: formData.paymentMethod,
        },
        axiosConfig,
      );

      alert("Payslip created successfully");

      // Close modal
      setShowCreateModal(false);

      // Reset form
      setFormData({
        employee: "",
        month: "",
        year: new Date().getFullYear(),
        basicSalary: "",
        allowances: "",
        deductions: "",
        paymentMethod: "Bank Transfer",
      });

      // Refresh payslips
      fetchPayslips();
    } catch (error) {
      console.error("Create payslip error:", error);

      alert(error.response?.data?.message || "Failed to create payslip");
    } finally {
      setCreating(false);
    }
  };

  // ========================================
  // MARK AS PAID
  // ========================================

  const handleMarkAsPaid = async (id) => {
    const confirmPayment = window.confirm(
      "Are you sure you want to mark this payslip as Paid?",
    );

    if (!confirmPayment) return;

    try {
      await axios.patch(`${API_URL}/payslip/${id}/pay`, {}, axiosConfig);

      alert("Payslip marked as Paid");

      setSelectedPayroll(null);

      fetchPayslips();
    } catch (error) {
      console.error("Mark as paid error:", error);

      alert(error.response?.data?.message || "Failed to mark payslip as paid");
    }
  };

  // ========================================
  // SEARCH + FILTER
  // ========================================

  const filteredPayrolls = payrolls.filter((pay) => {
    const employeeName = pay.employee?.name?.toLowerCase() || "";

    const employeeEmail = pay.employee?.email?.toLowerCase() || "";

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      employeeName.includes(search) || employeeEmail.includes(search);

    const matchesStatus = statusFilter === "All" || pay.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ========================================
  // METRICS
  // ========================================

  const paidPayrolls = payrolls.filter((item) => item.status === "Paid");

  const pendingPayrolls = payrolls.filter((item) => item.status === "Pending");

  const totalPaid = paidPayrolls.reduce(
    (total, item) => total + Number(item.netPayable || 0),
    0,
  );

  const totalPending = pendingPayrolls.reduce(
    (total, item) => total + Number(item.netPayable || 0),
    0,
  );

  // ========================================
  // CURRENCY
  // ========================================

  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* =====================================
            HEADER
        ====================================== */}

        <header className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Payroll & Payslip Management
              </h1>

              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Admin View
              </span>
            </div>

            <p className="text-slate-400 text-sm mt-1">
              Create and manage monthly employee payslips.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-600/25 transition-all text-xs w-fit"
          >
            <Plus className="w-4 h-4" />
            Create Payslip
          </button>
        </header>

        {/* =====================================
            METRICS
        ====================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Paid */}

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL PAID</span>

              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="text-2xl font-extrabold text-white">
              {formatCurrency(totalPaid)}
            </div>

            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              {paidPayrolls.length} Paid
            </div>
          </div>

          {/* Pending */}

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>PENDING PAYMENTS</span>

              <Clock className="w-4 h-4 text-amber-400" />
            </div>

            <div className="text-2xl font-extrabold text-white">
              {formatCurrency(totalPending)}
            </div>

            <div className="text-[11px] text-amber-400 mt-1 font-medium">
              {pendingPayrolls.length} Pending
            </div>
          </div>

          {/* Total */}

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL PAYSLIPS</span>

              <Users className="w-4 h-4 text-indigo-400" />
            </div>

            <div className="text-2xl font-extrabold text-white">
              {payrolls.length}
            </div>

            <div className="text-[11px] text-slate-400 mt-1">
              All generated payslips
            </div>
          </div>
        </div>

        {/* =====================================
            SEARCH + FILTER
        ====================================== */}

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          {/* Search */}

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status */}

          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
            {["All", "Paid", "Pending"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === status
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* =====================================
            PAYSLIP TABLE
        ====================================== */}

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-6">Employee</th>

                  <th className="py-3.5 px-6">Month</th>

                  <th className="py-3.5 px-6">Basic Salary</th>

                  <th className="py-3.5 px-6">Allowances</th>

                  <th className="py-3.5 px-6">Deductions</th>

                  <th className="py-3.5 px-6">Net Payable</th>

                  <th className="py-3.5 px-6">Status</th>

                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/60 text-sm">
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-10 text-center text-slate-400"
                    >
                      Loading payslips...
                    </td>
                  </tr>
                ) : filteredPayrolls.length > 0 ? (
                  filteredPayrolls.map((pay) => (
                    <tr
                      key={pay._id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Employee */}

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 overflow-hidden rounded-full bg-gray-50 flex items-center justify-center">
                            <img
                              src={
                                pay.employee?.profileImage
                                  ? pay.employee?.profileImage
                                  : defalut_pic
                              }
                              alt={pay.employee?.fullName}
                              className="w-full h-full"
                            />
                          </div>

                          <div>
                            <div className="font-semibold text-white">
                              {pay.employee?.fullName || "Unknown Employee"}
                            </div>

                            <div className="text-xs text-slate-400">
                              {pay.employee?.email || "No email"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Month */}

                      <td className="py-4 px-6 text-xs text-slate-300">
                        {pay.month}/{pay.year}
                      </td>

                      {/* Basic */}

                      <td className="py-4 px-6 text-xs text-slate-300 font-mono">
                        {formatCurrency(pay.basicSalary)}
                      </td>

                      {/* Allowances */}

                      <td className="py-4 px-6 text-xs text-emerald-400 font-mono">
                        +{formatCurrency(pay.allowances)}
                      </td>

                      {/* Deductions */}

                      <td className="py-4 px-6 text-xs text-rose-400 font-mono">
                        -{formatCurrency(pay.deductions)}
                      </td>

                      {/* Net */}

                      <td className="py-4 px-6 text-xs font-bold text-white font-mono">
                        {formatCurrency(pay.netPayable)}
                      </td>

                      {/* Status */}

                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                            pay.status === "Paid"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              pay.status === "Paid"
                                ? "bg-emerald-400"
                                : "bg-amber-400"
                            }`}
                          />

                          {pay.status}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* View */}

                          <button
                            onClick={() => setSelectedPayroll(pay)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Pay */}

                          {pay.status === "Pending" && (
                            <button
                              onClick={() => handleMarkAsPaid(pay._id)}
                              className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg transition-colors text-xs font-semibold border border-emerald-500/30 flex items-center gap-1"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              Disburse
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-10 text-center text-slate-500 text-xs"
                    >
                      No payslips found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* =====================================
          CREATE PAYSLIP MODAL
      ====================================== */}

      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Create Payslip</h2>

                <p className="text-xs text-slate-400 mt-1">
                  Create a monthly payslip for an employee.
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePayslip} className="space-y-4 mt-5">
              {/* Employee */}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Employee
                </label>

                <select
                  name="employee"
                  value={formData.employee}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                >
                  <option value="">Select employee</option>

                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.fullName}{" "}
                      {employee.email ? `- ${employee.email}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month + Year */}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Month
                  </label>

                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Year
                  </label>

                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Basic Salary */}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Basic Salary
                </label>

                <input
                  type="number"
                  name="basicSalary"
                  value={formData.basicSalary}
                  onChange={handleChange}
                  placeholder="25000"
                  min="0"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Allowances + Deductions */}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Allowances
                  </label>

                  <input
                    type="number"
                    name="allowances"
                    value={formData.allowances}
                    onChange={handleChange}
                    placeholder="5000"
                    min="0"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Deductions
                  </label>

                  <input
                    type="number"
                    name="deductions"
                    value={formData.deductions}
                    onChange={handleChange}
                    placeholder="2000"
                    min="0"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Payment Method */}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Payment Method
                </label>

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Bank Transfer">Bank Transfer</option>

                  <option value="Cash">Cash</option>

                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Info */}

              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3">
                <p className="text-xs text-indigo-300">
                  Net Payable = Basic Salary + Allowances - Deductions
                </p>
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold"
                >
                  {creating ? "Creating..." : "Create Payslip"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================
          PAYSLIP DETAILS MODAL
      ====================================== */}

      {selectedPayroll && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            {/* Header */}

            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Payslip Details
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  {selectedPayroll.employee?.name}
                </p>
              </div>

              <button
                onClick={() => setSelectedPayroll(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Details */}

            <div className="space-y-3 text-xs mt-5">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Employee</span>

                <span className="text-white font-medium">
                  {selectedPayroll.employee?.name}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Salary Month</span>

                <span className="text-white">
                  {getMonthName(selectedPayroll.month)} {selectedPayroll.year}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Basic Salary</span>

                <span className="font-mono text-white">
                  {formatCurrency(selectedPayroll.basicSalary)}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Allowances</span>

                <span className="font-mono text-emerald-400">
                  +{formatCurrency(selectedPayroll.allowances)}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Deductions</span>

                <span className="font-mono text-rose-400">
                  -{formatCurrency(selectedPayroll.deductions)}
                </span>
              </div>

              <div className="flex justify-between py-3 text-sm font-bold text-white">
                <span>Net Payable</span>

                <span className="font-mono">
                  {formatCurrency(selectedPayroll.netPayable)}
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-slate-400">Payment Method</span>

                <span className="text-white">
                  {selectedPayroll.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-slate-400">Status</span>

                <span
                  className={
                    selectedPayroll.status === "Paid"
                      ? "text-emerald-400"
                      : "text-amber-400"
                  }
                >
                  {selectedPayroll.status}
                </span>
              </div>

              {selectedPayroll.paidAt && (
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Paid At</span>

                  <span className="text-white">
                    {new Date(selectedPayroll.paidAt).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Buttons */}

            <div className="flex items-center justify-end gap-3 pt-5">
              <button
                onClick={() => setSelectedPayroll(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
              >
                Close
              </button>

              {selectedPayroll.status === "Pending" && (
                <button
                  onClick={() => handleMarkAsPaid(selectedPayroll._id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  Mark as Paid
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// --- Mock Data ---
/* const initialPayrollList = [
  {
    id: 'PAY-2026-07-01',
    employee: 'Sarah Jenkins',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    basicSalary: 6500,
    allowances: 1200,
    deductions: 850,
    netPay: 6850,
    month: 'July 2026',
    status: 'Paid',
    payDate: 'Jul 31, 2026'
  },
  {
    id: 'PAY-2026-07-02',
    employee: 'Michael Chen',
    role: 'Product Designer',
    department: 'Design & UX',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    basicSalary: 5800,
    allowances: 900,
    deductions: 700,
    netPay: 6000,
    status: 'Paid',
    payDate: 'Jul 31, 2026'
  },
  {
    id: 'PAY-2026-08-01',
    employee: 'Elena Rostova',
    role: 'Marketing Lead',
    department: 'Marketing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    basicSalary: 6200,
    allowances: 1000,
    deductions: 800,
    netPay: 6400,
    status: 'Pending',
    payDate: 'Aug 31, 2026'
  },
  {
    id: 'PAY-2026-08-02',
    employee: 'David Kim',
    role: 'DevOps Specialist',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    basicSalary: 6000,
    allowances: 800,
    deductions: 750,
    netPay: 6050,
    status: 'Pending',
    payDate: 'Aug 31, 2026'
  }
]; */
