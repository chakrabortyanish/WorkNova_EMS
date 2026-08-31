import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Clock,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  UserCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import logo from "../assets/logo.png";
import { jwtDecode } from "jwt-decode";

import {useAuth} from "../context/AuthContext.jsx";

export const Layout = () => {
  const {user, logout, employeeInfo} = useAuth();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

   if (!localStorage.getItem("ems-token")) {
    navigate("/");
  }

  // Mock User State (In a real app, grab this from AuthContext or Redux)
  // Options: 'admin' | 'employee'

  // Define menu items for each role
  const menuConfig = {
    admin: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Employees", path: "/dashboard/employees", icon: Users },
      { name: "Leave", path: "/dashboard/leave", icon: Calendar },
      { name: "Payslips", path: "/dashboard/payslips", icon: FileText },
      { name: "Settings", path: "/dashboard/settings", icon: Settings },
    ],

    employee: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      { name: "Attendance", path: "/dashboard/attendance", icon: Clock },
      { name: "Leave", path: "/dashboard/leave", icon: Calendar },
      { name: "Payslips", path: "/dashboard/payslips", icon: FileText },
      { name: "Settings", path: "/dashboard/settings", icon: Settings },
    ],
  };

  const currentNavItems = menuConfig[user?.role] || menuConfig.employee;

 

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans antialiased overflow-hidden">
      {/* Mobile Backdrop */}
      {/* {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-md lg:hidden transition-opacity duration-300"
        />
      )} */}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-950 border-r border-slate-800/80 transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0 relative" : "-translate-x-full"
        } overflow-hidden`}
      >
        {/* Animated Background Gradients & Glow Effects */}
        <div className="absolute -top-24 -left-20 w-56 h-56 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 -right-20 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-52 h-52 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center justify-between h-20 px-6 border-b border-slate-800/60 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/25">
              <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center p-1.5">
                <img
                  src={logo}
                  alt="WorkNova"
                  className="h-full w-full object-contain filter drop-shadow"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent tracking-tight">
                WorkNova
              </span>
              <span className="text-[10px] font-medium tracking-wider uppercase text-indigo-400/90 -mt-1 flex items-center gap-1">
                <Sparkles size={10} /> Enterprise
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Badge Profile Section */}
        <div className="relative z-10 p-4 mx-4 mt-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-inner">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-indigo-500/20">
                {user?.role === "admin" ? "AD" : <img className="w-full h-full" src={employeeInfo?.profileImage} alt=""/>}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="capitalize text-sm font-semibold text-slate-100 truncate">
                {user?.fullName}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                {user?.role === "admin" ? (
                  <Shield size={13} className="text-indigo-400" />
                ) : (
                  <UserCheck size={13} className="text-emerald-400" />
                )}
                <span className="capitalize font-medium text-slate-300">
                  {user?.role} Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="relative z-10 flex-1 px-4 space-y-1.5 mt-6 overflow-y-auto custom-scrollbar">
          <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase mb-2">
            Main Menu
          </p>

          {currentNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                end
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 border border-transparent hover:border-slate-800/50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        size={19}
                        className={`transition-transform duration-200 group-hover:scale-110 ${
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-indigo-400"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    {isActive && (
                      <ChevronRight
                        size={16}
                        className="text-white/80 animate-pulse"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="relative z-10 p-4 border-t border-slate-800/60 bg-slate-950/60 backdrop-blur-md">
          <button
            onClick={()=> logout()}
            className="w-full cursor-pointer flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all duration-200 shadow-sm"
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-900">
        {/* Top Navbar for Mobile Toggle */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-md lg:hidden">
          <button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="p-2 cursor-pointer rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-100">WorkNova</span>
          </div>
          <div className="w-9" />
        </header>

        {/* Dynamic Page Content Outlet */}
        <main className="flex-1 overflow-y-auto p-2 sm:p-5 lg:p-6 bg-slate-950 text-slate-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
