import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  KeyRound,
} from "lucide-react";
import logo from "../assets/logo.png"; // Adjust the path as necessary

import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {

  const navigate = useNavigate();

  //use auth context
  const { login } = useAuth();
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/${isAdmin ? "admin" : "employee"}/login`, formData);
       
       console.log(response.data)
       if(response.data.success){
          toast.success(response.data.message);
          // Store token in localStorage or cookies
          login(response.data.token);

          // Redirect based on user type
         setTimeout(() => {
            navigate("/dashboard");
         }, 1500);
       }
      }
    catch(error){
       console.error("Login failed:", error);
       toast.error("Login failed. Please try again.");
    }
  };

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-auto max-w-md m-4  p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl relative z-10"
      >
        {/* Header Logo & Title */}
        <div className="text-center mb-8">
          <motion.div
            transition={{ duration: 0.8 }}
            className="flex justify-center align-center gap-2 rounded-2xl mb-1.5"
          >
            <img src={logo} alt="WorkNova Logo" className="w-10 h-10" />
            <div className="my-auto text-xl font-bold text-white tracking-wide">
              WorkNova
            </div>
          </motion.div>
          <p className="text-slate-400 text-sm mt-1">
            Manage your workforce with precision
          </p>
        </div>

        {/* Admin / Employee Toggle Switch */}
        <div className="relative p-1 bg-slate-800/80 rounded-2xl flex items-center mb-8 border border-slate-700/50">
          <motion.div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-purple-600 to-indigo-500 rounded-xl shadow-md"
            animate={{ x: isAdmin ? "100%" : "0%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button
            type="button"
            onClick={() => setIsAdmin(false)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 relative z-10 transition-colors duration-200 ${
              !isAdmin ? "text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <User className="w-4 h-4" />
            Employee
          </button>
          <button
            type="button"
            onClick={() => setIsAdmin(true)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 relative z-10 transition-colors duration-200 ${
              isAdmin ? "text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Admin
          </button>
        </div>

        {/* Dynamic Context Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isAdmin ? "admin" : "employee"}
            initial={{ opacity: 0, x: isAdmin ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isAdmin ? -20 : 20 }}
            transition={{ duration: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-lg font-semibold text-white">
              {isAdmin ? "Admin Portal" : "Employee Access"}
            </h2>
            <p className="text-xs text-slate-400">
              {isAdmin
                ? "Sign in to access system control & analytics"
                : "Sign in to access your portal & dashboard"}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={
                  isAdmin ? "admin@company.com" : "employee@company.com"
                }
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-slate-300">
                Password
              </label>
              <a
                href="#forgot"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot?
              </a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-11 pr-11 py-3 bg-slate-800/50 border border-slate-700/60 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="mx-auto text-white font-semibold flex items-center justify-center group cursor-pointer"
          >
            <span className="py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:from-indigo-600 group-hover:to-purple-700 rounded-[30px] transition-all duration-200">
              Sign In as {isAdmin ? "Admin" : "Employee"}
            </span>
            <span className="py-3.5 px-4 ml-2 group-hover:-ml-2 bg-gradient-to-r from-purple-600 to-indigo-500 group-hover:from-purple-700 group-hover:to-indigo-600 rounded-[30px] transition-all duration-200">
              <KeyRound />
            </span>
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-8">
          Protected by enterprise-grade encryption.
        </p>
      </motion.div>
  );
}