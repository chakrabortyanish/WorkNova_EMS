import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  UserPlus, 
  Briefcase, 
  Bell,
  Sparkles,
} from 'lucide-react';
import axios from "axios";
import { toast } from "react-hot-toast";

const mockDepartmentStats = [
  { name: 'Engineering', count: 420, percentage: 85, color: 'bg-indigo-500' },
  { name: 'Design & UX', count: 180, percentage: 65, color: 'bg-pink-500' },
  { name: 'Marketing', count: 210, percentage: 72, color: 'bg-amber-500' },
  { name: 'Sales & BD', count: 310, percentage: 90, color: 'bg-emerald-500' },
  { name: 'Human Resources', count: 128, percentage: 50, color: 'bg-cyan-500' }
];

export const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      toast.loading("Loading Employees...", { id: "loading-emp" });

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/employee/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ems-token")}`,
          },
        },
      );
      if (res.data.success) {
        setEmployees(res.data.employees || []);
        console.log("Employees:", res.data.employees);
      }
    } catch (error) {
      console.error("Error fetching employee profile:", error);
      toast.error(error.response?.data?.message || "Failed to fetch employees");
    } finally {
      toast.dismiss("loading-emp");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Compute dynamic stats from fetched employees if available, or fall back to defaults
  const totalEmployees = employees.length > 0 ? employees.length : 1248;
  const activeEmployees = employees.length > 0 ? employees.filter(emp => emp.isActive !== false).length : 1084;
  const onLeaveEmployees = employees.length > 0 ? employees.filter(emp => emp.status === 'On Leave').length : 42;
  const newHires = employees.length > 0 ? employees.filter(emp => {
    const joinDate = new Date(emp.createdAt);
    const now = new Date();
    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear();
  }).length : 28;

  const mockStats = [
    {
      id: 1,
      title: 'Total Employees',
      value: totalEmployees.toLocaleString(),
      change: '+12.5%',
      isPositive: true,
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/20'
    },
    {
      id: 2,
      title: 'Active Now',
      value: activeEmployees.toLocaleString(),
      change: '+4.2%',
      isPositive: true,
      icon: UserCheck,
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20'
    },
    {
      id: 3,
      title: 'On Leave',
      value: onLeaveEmployees.toLocaleString(),
      change: '-2.1%',
      isPositive: true,
      icon: Clock,
      color: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/20'
    },
    {
      id: 4,
      title: 'New Hires (This Month)',
      value: newHires.toLocaleString(),
      change: '+18.2%',
      isPositive: true,
      icon: UserPlus,
      color: 'from-purple-500 to-pink-600',
      shadow: 'shadow-purple-500/20'
    }
  ];

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
                  <span className="text-3xl font-bold tracking-tight text-white">
                    {loading ? "..." : stat.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- Middle Analytics & Quick Overview Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          
          {/* Department Breakdown */}
          <div className="lg:col-span-2 w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-sm">
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

        </div>

      </div>
    </div>
  );
};