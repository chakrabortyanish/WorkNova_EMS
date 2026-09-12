import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { User, Save } from "lucide-react";

export const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    isActive: true,
  });

  // Fetch admin profile on mount

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("ems-token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        const { name, email, isActive } = response.data.admin;
        setAdminData({
          name,
          email,
          isActive: isActive !== undefined ? isActive : true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile");
      console.log(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("ems-token");
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/update-profile`,
        adminData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        await fetchProfile();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-sm text-slate-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* --- Header --- */}
        <header className="border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Admin Profile Settings
            </h1>
            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              System Admin
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Manage your personal admin account details and credentials.
          </p>
        </header>

        {/* --- Main Content Panel --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="border-b border-slate-800/80 pb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              <div>
                <h3 className="text-sm font-bold text-white">
                  Personal Information
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your account identity details.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={adminData.name}
                  onChange={(e) =>
                    setAdminData({ ...adminData, name: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={adminData.email}
                  onChange={(e) =>
                    setAdminData({ ...adminData, email: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={adminData.isActive}
                  onChange={(e) =>
                    setAdminData({ ...adminData, isActive: e.target.checked })
                  }
                  className="w-4 h-4 bg-slate-950 border border-slate-800 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="isActive"
                  className="text-xs font-semibold text-slate-300 cursor-pointer"
                >
                  Active Status (Account is active)
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800/80">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
