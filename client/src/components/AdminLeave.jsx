import React, { useEffect, useState } from 'react';
import { 
  Check, 
  X, 
  Search,
} from 'lucide-react';

import axios from "axios";
import { toast } from "react-hot-toast";

// --- Mock Data ---
const initialLeaveRequests = [
  {
    id: 'LR-101',
    employee: 'Sarah Jenkins',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    type: 'Sick Leave',
    startDate: 'Aug 10, 2026',
    endDate: 'Aug 12, 2026',
    days: 3,
    reason: 'Medical treatment and rest prescribed by doctor.',
    appliedDate: 'Aug 04, 2026',
    status: 'Pending'
  },
  {
    id: 'LR-102',
    employee: 'Michael Chen',
    role: 'Product Designer',
    department: 'Design & UX',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    type: 'Casual / PTO',
    startDate: 'Aug 15, 2026',
    endDate: 'Aug 18, 2026',
    days: 4,
    reason: 'Family vacation trip.',
    appliedDate: 'Aug 02, 2026',
    status: 'Pending'
  },
  {
    id: 'LR-103',
    employee: 'David Kim',
    role: 'DevOps Specialist',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    type: 'Personal Leave',
    startDate: 'Aug 08, 2026',
    endDate: 'Aug 08, 2026',
    days: 1,
    reason: 'Personal urgent work at home.',
    appliedDate: 'Aug 01, 2026',
    status: 'Approved'
  },
  {
    id: 'LR-104',
    employee: 'Jessica Taylor',
    role: 'HR Manager',
    department: 'Human Resources',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    type: 'Casual / PTO',
    startDate: 'Aug 20, 2026',
    endDate: 'Aug 22, 2026',
    days: 3,
    reason: 'Attending relative wedding ceremony.',
    appliedDate: 'Jul 29, 2026',
    status: 'Rejected'
  }
];

export const AdminLeave = () => {
  const [requests, setRequests] = useState(initialLeaveRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Handle Approve / Reject Actions
  const handleStatusChange = (id, newStatus) => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status: newStatus } : req))
    );
  };

  // Filter requests
  const filteredRequests = requests.filter(req => {
    const matchesSearch =
      req.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const fetchLeaveRequests = async () => {
  try {
    const token = localStorage.getItem("ems-token");

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/leave/all-leaves`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("Leave response:", response.data);

    setRequests(response.data.leaves || []);
  } catch (error) {
    console.error(
      "Failed to fetch leave requests:",
      error.response?.data || error
    );
  }
};

useEffect(() => {
  fetchLeaveRequests();
}, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* --- Header --- */}
        <header className="border-b border-slate-800 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Leave Requests Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Review, approve, or reject employee leave applications.
          </p>
        </header>

        {/* --- Controls Bar --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search employee, leave type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
            {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === status 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* --- Requests Table --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-6">Employee</th>
                  <th className="py-3.5 px-6">Leave Type</th>
                  <th className="py-3.5 px-6">Duration</th>
                  <th className="py-3.5 px-6">Reason</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Employee info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={req.avatar} 
                            alt={req.employee} 
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-800"
                          />
                          <div>
                            <div className="font-semibold text-white">{req.employee}</div>
                            <div className="text-xs text-slate-400">{req.department}</div>
                          </div>
                        </div>
                      </td>

                      {/* Leave Type */}
                      <td className="py-4 px-6 text-xs text-slate-200 font-medium">
                        <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800">
                          {req.type}
                        </span>
                      </td>

                      {/* Duration */}
                      <td className="py-4 px-6 text-xs">
                        <div className="text-slate-200 font-medium">{req.startDate} - {req.endDate}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{req.days} Day(s)</div>
                      </td>

                      {/* Reason */}
                      <td className="py-4 px-6 text-xs text-slate-300 max-w-xs truncate" title={req.reason}>
                        "{req.reason}"
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                          req.status === 'Approved' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : req.status === 'Rejected'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            req.status === 'Approved' ? 'bg-emerald-400' : req.status === 'Rejected' ? 'bg-rose-400' : 'bg-amber-400'
                          }`} />
                          {req.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        {req.status === 'Pending' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleStatusChange(req.id, 'Approved')}
                              className="p-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg transition-colors border border-emerald-500/30"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleStatusChange(req.id, 'Rejected')}
                              className="p-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white rounded-lg transition-colors border border-rose-500/30"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500 font-mono">Processed</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                      No leave requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
