import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  UserCheck, 
  UserX, 
  AlertTriangle, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Download, 
  MoreVertical,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

// --- Fake / Mock Data ---
const mockAttendanceMetrics = [
  {
    id: 1,
    title: 'Present Today',
    value: '1,120',
    subtext: '89.7% of total workforce',
    icon: UserCheck,
    color: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20'
  },
  {
    id: 2,
    title: 'On-Time Arrival',
    value: '1,042',
    subtext: '+3.1% from yesterday',
    icon: Clock,
    color: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/20'
  },
  {
    id: 3,
    title: 'Late Arrivals',
    value: '78',
    subtext: 'Requires review',
    icon: AlertTriangle,
    color: 'from-amber-500 to-orange-600',
    shadow: 'shadow-amber-500/20'
  },
  {
    id: 4,
    title: 'Pending Leave Requests',
    value: '14',
    subtext: '5 urgent approvals',
    icon: Calendar,
    color: 'from-purple-500 to-pink-600',
    shadow: 'shadow-purple-500/20'
  }
];

const mockAttendanceLogs = [
  {
    id: 'ATT-101',
    employee: {
      name: 'Sarah Jenkins',
      role: 'Senior Frontend Engineer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      id: 'EMP-1092'
    },
    department: 'Engineering',
    date: 'Aug 06, 2026',
    checkIn: '08:52 AM',
    checkOut: '05:05 PM',
    workHours: '8h 13m',
    status: 'Present',
    location: 'Office (HQ)'
  },
  {
    id: 'ATT-102',
    employee: {
      name: 'Michael Chen',
      role: 'Product Designer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      id: 'EMP-1093'
    },
    department: 'Design & UX',
    date: 'Aug 06, 2026',
    checkIn: '09:28 AM',
    checkOut: '05:30 PM',
    workHours: '8h 02m',
    status: 'Late',
    location: 'Remote'
  },
  {
    id: 'ATT-103',
    employee: {
      name: 'Elena Rostova',
      role: 'Marketing Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      id: 'EMP-1094'
    },
    department: 'Marketing',
    date: 'Aug 06, 2026',
    checkIn: '-',
    checkOut: '-',
    workHours: '0h 00m',
    status: 'On Leave',
    location: '-'
  },
  {
    id: 'ATT-104',
    employee: {
      name: 'David Kim',
      role: 'DevOps Specialist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      id: 'EMP-1095'
    },
    department: 'Engineering',
    date: 'Aug 06, 2026',
    checkIn: '08:58 AM',
    checkOut: '05:00 PM',
    workHours: '8h 02m',
    status: 'Present',
    location: 'Office (HQ)'
  },
  {
    id: 'ATT-105',
    employee: {
      name: 'Jessica Taylor',
      role: 'HR Business Partner',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      id: 'EMP-1096'
    },
    department: 'Human Resources',
    date: 'Aug 06, 2026',
    checkIn: '-',
    checkOut: '-',
    workHours: '0h 00m',
    status: 'Absent',
    location: '-'
  }
];

const mockLeaveRequests = [
  {
    id: 'LR-501',
    employee: 'Marcus Vance',
    role: 'Backend Developer',
    type: 'Sick Leave',
    dates: 'Aug 10 - Aug 12 (3 Days)',
    reason: 'Recovering from viral flu',
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  },
  {
    id: 'LR-502',
    employee: 'Amanda Seyfried',
    role: 'QA Specialist',
    type: 'Casual / PTO',
    dates: 'Aug 15 - Aug 18 (4 Days)',
    reason: 'Family vacation',
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  }
];

export const Attendance = () => {
  const [activeTab, setActiveTab] = useState('logs'); // 'logs' | 'requests'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Filter attendance logs based on search query, status, and department
  const filteredLogs = mockAttendanceLogs.filter((log) => {
    const matchesSearch = 
      log.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || log.status === selectedStatus;
    const matchesDept = selectedDepartment === 'All' || log.department === selectedDepartment;

    return matchesSearch && matchesStatus && matchesDept;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Attendance & Time Logs
              </h1>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="w-3 h-3" /> Real-time Tracking
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Monitor daily punch-in times, work hours, late arrivals, and leave applications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              <Clock className="w-4 h-4" />
              <span>Manual Check In</span>
            </button>
          </div>
        </header>

        {/* --- Metric Cards Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mockAttendanceMetrics.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id}
                className="relative group bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
              >
                <div className={`absolute -right-8 -bottom-8 w-28 h-28 bg-gradient-to-br ${stat.color} rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-300`} />
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm font-medium">{stat.title}</span>
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg ${stat.shadow} transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-3xl font-bold tracking-tight text-white">{stat.value}</span>
                  <span className="text-xs text-slate-400 font-medium">{stat.subtext}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Main Section: Tabbed Content --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          
          {/* Top Bar Navigation Tabs */}
          <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800/80 w-fit">
              <button 
                onClick={() => setActiveTab('logs')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === 'logs' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Daily Logs
              </button>
              <button 
                onClick={() => setActiveTab('requests')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === 'requests' 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Leave Requests</span>
                <span className="bg-amber-500/20 text-amber-400 text-[10px] px-1.5 py-0.5 rounded-full border border-amber-500/30">
                  {mockLeaveRequests.length}
                </span>
              </button>
            </div>

            {/* Date Control */}
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
              <button className="text-slate-400 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold">Today: August 06, 2026</span>
              <button className="text-slate-400 hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {activeTab === 'logs' ? (
            <>
              {/* Filter and Search Bar */}
              <div className="p-4 bg-slate-950/40 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 min-w-[240px] max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by name, ID, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Department Filter Dropdown */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <select 
                      value={selectedDepartment} 
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="All">All Departments</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design & UX">Design & UX</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Human Resources">Human Resources</option>
                    </select>
                  </div>

                  {/* Status Pills */}
                  <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
                    {['All', 'Present', 'Late', 'On Leave', 'Absent'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                          selectedStatus === status 
                            ? 'bg-slate-800 text-white' 
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logs Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800/80 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                      <th className="py-3.5 px-6">Employee</th>
                      <th className="py-3.5 px-6">Check In</th>
                      <th className="py-3.5 px-6">Check Out</th>
                      <th className="py-3.5 px-6">Work Hours</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6">Location</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-800/40 transition-colors duration-150 group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <img 
                                src={log.employee.avatar} 
                                alt={log.employee.name} 
                                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-indigo-500/50 transition-all"
                              />
                              <div>
                                <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                  {log.employee.name}
                                </div>
                                <div className="text-xs text-slate-400">{log.employee.role}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-6 text-xs text-slate-200 font-mono">
                            {log.checkIn}
                          </td>

                          <td className="py-4 px-6 text-xs text-slate-200 font-mono">
                            {log.checkOut}
                          </td>

                          <td className="py-4 px-6 text-xs text-slate-300 font-medium">
                            {log.workHours}
                          </td>

                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                              log.status === 'Present' 
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                : log.status === 'Late'
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                : log.status === 'On Leave'
                                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                log.status === 'Present' ? 'bg-emerald-400' : log.status === 'Late' ? 'bg-amber-400' : log.status === 'On Leave' ? 'bg-indigo-400' : 'bg-rose-400'
                              }`} />
                              {log.status}
                            </span>
                          </td>

                          <td className="py-4 px-6 text-xs text-slate-400">
                            {log.location}
                          </td>

                          <td className="py-4 px-6 text-right">
                            <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-500 text-xs">
                          No attendance logs found matching the selected filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            /* --- Leave Requests View --- */
            <div className="p-6 space-y-4">
              <h3 className="text-base font-bold text-white mb-2">Pending Leave Applications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockLeaveRequests.map((req) => (
                  <div key={req.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img src={req.avatar} alt={req.employee} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <h4 className="text-sm font-bold text-white">{req.employee}</h4>
                            <p className="text-xs text-slate-400">{req.role}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {req.type}
                        </span>
                      </div>

                      <div className="space-y-1 my-3 text-xs">
                        <p className="text-slate-300"><strong>Dates:</strong> {req.dates}</p>
                        <p className="text-slate-400"><strong>Reason:</strong> "{req.reason}"</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80 mt-2">
                      <button className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button className="flex-1 py-2 bg-slate-800 hover:bg-rose-600/20 hover:text-rose-400 border border-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors">
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};