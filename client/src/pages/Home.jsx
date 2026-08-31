import { motion,  } from "framer-motion";
import {
  User,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  Users,
  Clock,
  CalendarCheck,
  BarChart3,
  CheckCircle2,
  Building2,
} from "lucide-react";
import LoginPage from "../components/LoginPage";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-x-hidden font-sans flex flex-col justify-between">
      {/* Background Glow Blobs for the entire page */}
      <div className="absolute top-10 -left-32 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Top Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="w-15" />
          <span className="text-xl font-bold text-white tracking-wide">
            WorkNova
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            v2.4 Enterprise
          </span>
          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            System Operational
          </div>
        </div>
      </header>

      {/* Main Split Section: Marketing Hero (Left) + Login Form (Right) */}
      <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 px-6 py-8 items-center relative z-10 my-auto">
        {/* LEFT COLUMN */}
        <div className="w-full space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >

            <h1 className="font-[Plus_Jakarta_Sans] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Manage your workforce with{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                precision & speed.
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              Streamline daily attendance, automate payroll operations, monitor
              real-time department analytics, and empower your team securely in
              one unified hub.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
          >
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                <Clock className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Smart Attendance
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated time logs and shift management.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                <CalendarCheck className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Leave & Payslips
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Instant requests and downloadable statements.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Admin Analytics
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Deep insights into organizational productivity.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Users className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  Role-Based Access
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Granular security for admin and staff portals.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-xs text-slate-500 border-t border-slate-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Secure Authentication</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Encrypted Data</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Reliable Performance</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full flex justify-center lg:justify-end">
          <LoginPage />
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 relative z-20">
        <p>© 2026 WorkNova Inc. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-3 sm:mt-0">
          <a href="#privacy" className="hover:text-slate-400 transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-slate-400 transition-colors">
            Terms of Service
          </a>
          <a href="#support" className="hover:text-slate-400 transition-colors">
            Enterprise Support
          </a>
        </div>
      </footer>
    </div>
  );
}
