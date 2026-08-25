import React, { useState, useEffect } from "react";
import { Calendar, Send } from "lucide-react";

import axios from "axios";
import { toast } from "react-hot-toast";

// --- Mock Data ---
const leaveBalances = [
  {
    type: "Paid Time Off (PTO)",
    total: 18,
    used: 6,
    remaining: 12,
    color: "bg-indigo-500",
  },
  {
    type: "Sick Leave",
    total: 10,
    used: 2,
    remaining: 8,
    color: "bg-emerald-500",
  },
  {
    type: "Personal Leave",
    total: 5,
    used: 1,
    remaining: 4,
    color: "bg-purple-500",
  },
];

export const EmployeeLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    type: "Paid Time Off (PTO)",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const fetchMyLeaves = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/leave/my-leaves`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ems-token")}`,
          },
          withCredentials: true,
        },
      );

      setLeaves(response.data.leaves || []);
    } catch (error) {
      console.error("Failed to fetch leave requests:", error);

      toast.error(
        error.response?.data?.message || "Failed to load leave requests",
      );
    }
  };

  useEffect(() => {
    fetchMyLeaves();
  }, [leaves]);

  // Calculate days between dates
  const calculateDays = (start, end) => {
    if (!start || !end) return 0;

    const s = new Date(start);
    const e = new Date(end);

    s.setHours(0, 0, 0, 0);
    e.setHours(0, 0, 0, 0);

    const diff = (e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24);

    return diff + 1;
  };

  // Submit Leave Application
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate || !formData.reason) {
      toast.error("Please fill in all fields");
      return;
    }

    // Check date
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error("End date cannot be before start date");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/leave/apply`,
        {
          leaveType: formData.type,
          startDate: formData.startDate,
          endDate: formData.endDate,
          reason: formData.reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ems-token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      console.log(response.data);

      if (response.data.success) {
        // reset form
        setFormData({
          type: "",
          startDate: "",
          endDate: "",
          reason: "",
        });

        toast.success("Leave application submitted successfully");
      }
    } catch (error) {
      console.error("Leave application failed:", error);

      toast.error(
        error.response?.data?.message || "Failed to submit leave application",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- Header --- */}
        <header className="border-b border-slate-800 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            My Leave Portal
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Apply for leave, check available balances, and track application
            progress.
          </p>
        </header>

        {/* --- Balances Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {leaveBalances.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-200">
                    {item.type}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.used} of {item.total} days used
                  </p>
                </div>
                <span className="text-2xl font-bold text-white">
                  {item.remaining}{" "}
                  <span className="text-xs text-slate-400 font-normal">
                    left
                  </span>
                </span>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 mt-2">
                <div
                  className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                  style={{ width: `${(item.remaining / item.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* --- Apply Form + Request History Grid --- */}
        <div className="flex flex-col gap-5">
          {/* Apply Leave Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl h-fit">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" /> Apply For Leave
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Submit a new request for manager approval.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Leave Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="" selected opcaity={0.4}>
                    Select Leave
                  </option>
                  <option value="Paid Time Off">Paid Time Off (PTO)</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Reason
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Provide brief details for your leave request..."
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Submit Request
              </button>
            </form>
          </div>

          {/* My Requests History Table */}
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
            <div>
              <div className="p-5 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">
                  Leave History & Status
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Track your submitted applications
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800/80 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                      <th className="py-3.5 px-6">Type</th>
                      <th className="py-3.5 px-6">Dates</th>
                      <th className="py-3.5 px-6">Reason</th>
                      <th className="py-3.5 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {leaves.length > 0 ? (
                      leaves.map((leave) => (
                        <tr
                          key={leave.id}
                          className="hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-4 px-6 text-xs text-slate-200 font-medium">
                            <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800">
                              {leave.leaveType}
                            </span>
                          </td>

                          <td className="py-4 px-6 text-xs">
                            <div className="text-slate-200 font-medium">
                              {new Date(leave.startDate).toLocaleDateString()} -{" "}
                              {new Date(leave.endDate).toLocaleDateString()}
                            </div>
                            <div className="text-slate-500 text-[11px] mt-0.5">
                              {leave.totalDays} Day(s)
                            </div>
                          </td>

                          <td
                            className="py-4 px-6 text-xs text-slate-400 max-w-xs truncate"
                            title={leave.reason}
                          >
                            "{leave.reason}"
                          </td>

                          <td className="py-4 px-6">
                            <span
                              className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                                leave.status === "Approved"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : leave.status === "Rejected"
                                    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  leave.status === "Approved"
                                    ? "bg-emerald-400"
                                    : leave.status === "Rejected"
                                      ? "bg-rose-400"
                                      : "bg-amber-400"
                                }`}
                              />
                              {leave.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-8 text-center text-slate-500 text-xs"
                        >
                          No leave applications submitted yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
