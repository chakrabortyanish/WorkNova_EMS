import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  FileText, 
  DollarSign, 
  Bell, 
  Sparkles, 
  User, 
  Briefcase, 
  ChevronRight,
  Play,
  Square
} from 'lucide-react';

// --- Fake / Mock Data for Employee ---
const mockEmployeeInfo = {
  name: 'Alex Rivera',
  role: 'Senior UI/UX Designer',
  employeeId: 'EMP-2041',
  department: 'Design & UX',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  shift: '09:00 AM - 05:00 PM',
  status: 'Punched In'
};

const mockLeaveBalances = [
  { type: 'Paid Time Off (PTO)', used: 6, total: 18, color: 'from-blue-500 to-indigo-600', barColor: 'bg-indigo-500' },
  { type: 'Sick Leave', used: 2, total: 10, color: 'from-emerald-500 to-teal-600', barColor: 'bg-emerald-500' },
  { type: 'Personal Leave', used: 1, total: 5, color: 'from-purple-500 to-pink-600', barColor: 'bg-purple-500' },
];

const mockWeeklyTasks = [
  { id: 1, title: 'Design System Figma Component Update', project: 'Design System', dueDate: 'Today', completed: false, priority: 'High' },
  { id: 2, title: 'Review Mobile Onboarding Flow Wireframes', project: 'EMS Mobile', dueDate: 'Tomorrow', completed: true, priority: 'Medium' },
  { id: 3, title: 'Conduct UX Research Sprint with Frontend Team', project: 'Admin Dashboard', dueDate: 'Aug 10', completed: false, priority: 'High' },
  { id: 4, title: 'Submit Monthly Timesheet', project: 'HR Admin', dueDate: 'Aug 12', completed: false, priority: 'Low' }
];

const mockAnnouncements = [
  {
    id: 1,
    title: 'Q3 All-Hands Townhall Meeting Scheduled',
    author: 'HR Department',
    date: '2 hours ago',
    tag: 'Event',
    color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
  },
  {
    id: 2,
    title: 'New Health Insurance Benefits Policy Update',
    author: 'Benefits Team',
    date: 'Yesterday',
    tag: 'Policy',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
  }
];

export const EmployeeDashboard = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(true);
  const [tasks, setTasks] = useState(mockWeeklyTasks);

  // Toggle task completion state
  const toggleTask = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <img 
              src={mockEmployeeInfo.avatar} 
              alt={mockEmployeeInfo.name} 
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40 p-0.5 shadow-lg shadow-indigo-500/10"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                  Welcome back, {mockEmployeeInfo.name.split(' ')[0]}!
                </h1>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-3 h-3" /> Employee Portal
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-0.5 flex items-center gap-2">
                <span>{mockEmployeeInfo.role}</span> • <span className="text-indigo-400">{mockEmployeeInfo.department}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-all duration-200 group">
              <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full" />
            </button>

            <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              <Calendar className="w-4 h-4" />
              <span>Apply for Leave</span>
            </button>
          </div>
        </header>

        {/* --- Attendance Clock-In & Time Tracker --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Punch In / Out Interactive Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Time Tracker</span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                  isPunchedIn 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isPunchedIn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                  {isPunchedIn ? 'Working Now' : 'Not Punched In'}
                </span>
              </div>

              <div className="text-center my-4">
                <div className="text-4xl font-black text-white tracking-wider font-mono">05:42:18</div>
                <p className="text-xs text-slate-400 mt-1">Shift Hours: {mockEmployeeInfo.shift}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button 
                onClick={() => setIsPunchedIn(!isPunchedIn)}
                className={`w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                  isPunchedIn
                    ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-600/20 hover:scale-[1.01]'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/20 hover:scale-[1.01]'
                }`}
              >
                {isPunchedIn ? (
                  <>
                    <Square className="w-4 h-4 fill-white" /> Clock Out
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" /> Clock In
                  </>
                )}
              </button>
              
              <div className="flex justify-between items-center text-xs text-slate-400 px-1">
                <span>Punched in at: <strong className="text-slate-200">09:02 AM</strong></span>
                <span>Break time: <strong className="text-slate-200">45 mins</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Shortcut Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Request Leave', icon: Calendar, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
              { label: 'View Paystubs', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
              { label: 'Submit Expense', icon: FileText, color: 'text-amber-400', bg: 'bg-amber-500/10' },
              { label: 'Shift Schedule', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
              { label: 'My Profile', icon: User, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
              { label: 'Company Helpdesk', icon: AlertCircle, color: 'text-pink-400', bg: 'bg-pink-500/10' },
            ].map((action, idx) => {
              const Icon = action.icon;
              return (
                <button 
                  key={idx}
                  className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 hover:border-slate-700 hover:-translate-y-1 transition-all duration-300 group shadow-sm"
                >
                  <div className={`p-3 rounded-xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* --- Leave Balances Section --- */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" /> My Leave Balances
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {mockLeaveBalances.map((leave, idx) => {
              const remaining = leave.total - leave.used;
              const percentage = Math.round((remaining / leave.total) * 100);

              return (
                <div 
                  key={idx}
                  className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-200">{leave.type}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{leave.used} days taken</p>
                    </div>
                    <span className="text-2xl font-bold text-white">{remaining} <span className="text-xs text-slate-400 font-normal">left</span></span>
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 mt-2">
                    <div 
                      className={`h-full rounded-full ${leave.barColor} transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Main Dashboard Body (Tasks + Announcements) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Interactive Task / Goal Tracker */}
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">My Weekly Action Items</h3>
                <p className="text-xs text-slate-400 mt-0.5">Track your assigned tasks and progress</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                {tasks.filter(t => t.completed).length}/{tasks.length} Completed
              </span>
            </div>

            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    task.completed 
                      ? 'bg-slate-950/40 border-slate-800/50 opacity-60' 
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button className="text-slate-400 hover:text-indigo-400 transition-colors">
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500" />
                      )}
                    </button>
                    <div>
                      <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500">{task.project}</span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-400">Due {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                    task.priority === 'High' 
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' 
                      : task.priority === 'Medium'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements & Updates Feed */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Announcements</h3>
                <button className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">View All</button>
              </div>

              <div className="space-y-4">
                {mockAnnouncements.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl hover:border-slate-700 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.color}`}>
                        {item.tag}
                      </span>
                      <span className="text-[11px] text-slate-500">{item.date}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2">Posted by {item.author}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-center">
              <a href="#help" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-400 transition-colors">
                Need help or have questions? Contact HR <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
