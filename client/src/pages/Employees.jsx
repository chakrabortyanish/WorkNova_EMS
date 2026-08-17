import React, { useState } from 'react';
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
  Briefcase,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CreateEmployee } from '../components';

// --- Fake / Mock Data ---
const mockEmployeesList = [
  {
    id: 'EMP-1092',
    name: 'Sarah Jenkins',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    type: 'Full-Time',
    email: 'sarah.j@company.com',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    status: 'Active',
    joinDate: 'Jan 12, 2024',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'
  },
  {
    id: 'EMP-1093',
    name: 'Michael Chen',
    role: 'Product Designer',
    department: 'Design & UX',
    type: 'Full-Time',
    email: 'michael.c@company.com',
    phone: '+1 (555) 014-4921',
    location: 'New York, NY',
    status: 'Active',
    joinDate: 'Feb 01, 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 'EMP-1094',
    name: 'Elena Rostova',
    role: 'Marketing Lead',
    department: 'Marketing',
    type: 'Full-Time',
    email: 'elena.r@company.com',
    phone: '+1 (555) 018-9920',
    location: 'London, UK',
    status: 'On Leave',
    joinDate: 'Nov 18, 2023',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  {
    id: 'EMP-1095',
    name: 'David Kim',
    role: 'DevOps Specialist',
    department: 'Engineering',
    type: 'Contract',
    email: 'david.k@company.com',
    phone: '+1 (555) 012-3811',
    location: 'Seattle, WA',
    status: 'Active',
    joinDate: 'Jan 28, 2024',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  },
  {
    id: 'EMP-1096',
    name: 'Jessica Taylor',
    role: 'HR Business Partner',
    department: 'Human Resources',
    type: 'Full-Time',
    email: 'jessica.t@company.com',
    phone: '+1 (555) 017-7422',
    location: 'Austin, TX',
    status: 'Onboarding',
    joinDate: 'Feb 05, 2024',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'
  },
  {
    id: 'EMP-1097',
    name: 'Marcus Vance',
    role: 'Backend Architect',
    department: 'Engineering',
    type: 'Remote',
    email: 'marcus.v@company.com',
    phone: '+1 (555) 015-8833',
    location: 'Chicago, IL',
    status: 'Active',
    joinDate: 'Mar 15, 2023',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150'
  }
];

export const Employees = () => {
  const [employees, setEmployees] = useState(mockEmployeesList);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Employee Form State
  const [newEmp, setNewEmp] = useState({
    name: '',
    role: '',
    department: 'Engineering',
    type: 'Full-Time',
    email: '',
    phone: '',
    location: ''
  });

  // Filter Employees Logic
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
    const matchesType = selectedType === 'All' || emp.type === selectedType;

    return matchesSearch && matchesDept && matchesType;
  });

  // Handle Adding Employee
 /*  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.email) return;

    const createdEmployee = {
      ...newEmp,
      id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Onboarding',
      joinDate: 'Today',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    };

    setEmployees([createdEmployee, ...employees]);
    setIsModalOpen(false);
    setNewEmp({ name: '', role: '', department: 'Engineering', type: 'Full-Time', email: '', phone: '', location: '' });
  }; */

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
            </select>

            {/* Employment Type Filter */}
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>

            {/* Layout Toggle (Table vs Grid) */}
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
              <button 
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* --- Main Content Section --- */}
        {viewMode === 'table' ? (
          /* Table View */
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-6">Employee</th>
                    <th className="py-3.5 px-6">Department</th>
                    <th className="py-3.5 px-6">Type</th>
                    <th className="py-3.5 px-6">Location</th>
                    <th className="py-3.5 px-6">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors duration-150 group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img 
                              src={emp.avatar} 
                              alt={emp.name} 
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-indigo-500/50 transition-all"
                            />
                            <div>
                              <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                                {emp.name}
                                <span className="text-[10px] text-slate-500 font-normal">({emp.id})</span>
                              </div>
                              <div className="text-xs text-slate-400">{emp.role}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6 text-xs text-slate-300 font-medium">
                          {emp.department}
                        </td>

                        <td className="py-4 px-6 text-xs text-slate-400">
                          <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 font-mono">
                            {emp.type}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            {emp.location}
                          </div>
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

                        <td className="py-4 px-6 text-right">
                          <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
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
                key={emp.id} 
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 shadow-lg relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={emp.avatar} 
                        alt={emp.name} 
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/30"
                      />
                      <div>
                        <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors text-base">{emp.name}</h3>
                        <p className="text-xs text-slate-400">{emp.role}</p>
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
                      <span>{emp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                    emp.status === 'Active' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {emp.status}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{emp.type}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* --- Add Employee Modal --- */}
      {isModalOpen && (
        <CreateEmployee setIsModalOpen={setIsModalOpen}/>
      )}

    </div>
  );
};
