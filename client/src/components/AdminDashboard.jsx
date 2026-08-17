import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  UserPlus, 
  TrendingUp, 
  Search, 
  Filter, 
  MoreVertical, 
  Briefcase, 
  Award,
  Bell,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// --- Fake / Mock Data ---
const mockStats = [
  {
    id: 1,
    title: 'Total Employees',
    value: '1,248',
    change: '+12.5%',
    isPositive: true,
    icon: Users,
    color: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/20'
  },
  {
    id: 2,
    title: 'Active Now',
    value: '1,084',
    change: '+4.2%',
    isPositive: true,
    icon: UserCheck,
    color: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20'
  },
  {
    id: 3,
    title: 'On Leave',
    value: '42',
    change: '-2.1%',
    isPositive: true,
    icon: Clock,
    color: 'from-amber-500 to-orange-600',
    shadow: 'shadow-amber-500/20'
  },
  {
    id: 4,
    title: 'New Hires (This Month)',
    value: '28',
    change: '+18.2%',
    isPositive: true,
    icon: UserPlus,
    color: 'from-purple-500 to-pink-600',
    shadow: 'shadow-purple-500/20'
  }
];

const mockDepartmentStats = [
  { name: 'Engineering', count: 420, percentage: 85, color: 'bg-indigo-500' },
  { name: 'Design & UX', count: 180, percentage: 65, color: 'bg-pink-500' },
  { name: 'Marketing', count: 210, percentage: 72, color: 'bg-amber-500' },
  { name: 'Sales & BD', count: 310, percentage: 90, color: 'bg-emerald-500' },
  { name: 'Human Resources', count: 128, percentage: 50, color: 'bg-cyan-500' }
];

const mockRecentEmployees = [
  {
    id: 'EMP-1092',
    name: 'Sarah Jenkins',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    status: 'Active',
    joinDate: 'Jan 12, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  {
    id: 'EMP-1093',
    name: 'Michael Chen',
    role: 'Product Designer',
    department: 'Design & UX',
    status: 'Active',
    joinDate: 'Feb 01, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 'EMP-1094',
    name: 'Elena Rostova',
    role: 'Marketing Lead',
    department: 'Marketing',
    status: 'On Leave',
    joinDate: 'Nov 18, 2025',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  {
    id: 'EMP-1095',
    name: 'David Kim',
    role: 'DevOps Specialist',
    department: 'Engineering',
    status: 'Active',
    joinDate: 'Jan 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  },
  {
    id: 'EMP-1096',
    name: 'Jessica Taylor',
    role: 'HR Business Partner',
    department: 'Human Resources',
    status: 'Onboarding',
    joinDate: 'Feb 05, 2026',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'
  }
];

export const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filter employees based on search query and status filter
  const filteredEmployees = mockRecentEmployees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="w-3 h-3" /> Live EMS
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Welcome back! Here's what's happening across your workforce today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
              <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>

            <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              <UserPlus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>
        </header>

        {/* --- Metric Cards Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mockStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id}
                className="relative group bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
              >
                {/* Glow Overlay */}
                <div className={`absolute -right-8 -bottom-8 w-28 h-28 bg-gradient-to-br ${stat.color} rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity duration-300`} />
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm font-medium">{stat.title}</span>
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg ${stat.shadow} transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-3xl font-bold tracking-tight text-white">{stat.value}</span>
                  
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Middle Analytics & Quick Overview Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          
          {/* Department Breakdown */}
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-400" />
                  Department Capacity
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Headcount allocation and utilization rate</p>
              </div>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                View Details
              </button>
            </div>

            <div className="space-y-4">
              {mockDepartmentStats.map((dept, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center text-sm mb-1.5">
                    <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{dept.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-xs">{dept.count} members</span>
                      <span className="text-white font-semibold text-xs w-8 text-right">{dept.percentage}%</span>
                    </div>
                  </div>
                  {/* Animated Progress Bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
                    <div 
                      className={`h-full rounded-full ${dept.color} transition-all duration-1000 ease-out group-hover:brightness-125`}
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Spotlight */}
          {/* <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Employee Spotlight</h3>
              </div>
              
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-xl p-4 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all duration-300" />
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" 
                  alt="Spotlight Employee" 
                  className="w-16 h-16 rounded-full mx-auto ring-2 ring-amber-400/50 p-0.5 object-cover mb-3 group-hover:scale-105 transition-transform duration-300"
                />
                <h4 className="text-base font-bold text-white">Elena Rostova</h4>
                <p className="text-xs text-amber-400 font-medium">Top Performer - Q1</p>
                <p className="text-xs text-slate-400 mt-2">"Led the international marketing campaign exceeding target growth by 45%."</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">Quick Actions</span>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all duration-200 text-center">
                  Request Leave
                </button>
                <button className="p-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-all duration-200 text-center">
                  Run Payroll
                </button>
              </div>
            </div>
          </div> */}

        </div>

        {/* --- Recent Employees Table --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          
          {/* Table Toolbar */}
          <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">Recent Team Members</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manage workforce records and status updates</p>
            </div>

            {/* Filter and Search Inputs */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search name, role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl p-1">
                {['All', 'Active', 'On Leave', 'Onboarding'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all duration-200 ${
                      selectedStatus === status 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-950/40 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-6">Employee</th>
                  <th className="py-3.5 px-6">Department</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Join Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr 
                      key={emp.id} 
                      className="hover:bg-slate-800/40 transition-colors duration-150 group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={emp.avatar} 
                            alt={emp.name} 
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-indigo-500/50 transition-all"
                          />
                          <div>
                            <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                              {emp.name}
                            </div>
                            <div className="text-xs text-slate-400">{emp.role}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-slate-300 font-medium text-xs">
                        {emp.department}
                      </td>

                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                          emp.status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : emp.status === 'On Leave'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            emp.status === 'Active' ? 'bg-emerald-400' : emp.status === 'On Leave' ? 'bg-amber-400' : 'bg-indigo-400'
                          }`} />
                          {emp.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-xs text-slate-400">
                        {emp.joinDate}
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
                    <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                      No team members found matching your criteria.
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