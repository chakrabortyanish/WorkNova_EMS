import { useEffect, useState } from "react";
import { User, Lock, Save, Camera } from "lucide-react";

import default_pic from "../assets/default-picture.png";

import axios from "axios";
import { toast } from "react-hot-toast";

export const EmployeeSettings = () => {
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setImage(selectedFile);

    // Only for temporary preview
    setPreview(URL.createObjectURL(selectedFile));
  };

  const [activeTab, setActiveTab] = useState("profile");
  const disabled = true;

  // Password Form State
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    try {
      toast.loading("Updating password...");

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/employee/password`,
        {
          currentPassword: security.currentPassword,
          newPassword: security.newPassword,
          confirmPassword: security.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ems-token")}`,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
         await fetchProfile();
      }
    } catch (error) {
      console.error("Update password error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally{
      toast.dismiss();
    }
  };

  // Notifications State
  /* const [notifications, setNotifications] = useState({
    emailAlerts: true,
    leaveUpdates: true,
    companyNews: false,
  }); */

  const handleSave = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image first.");
      return;
    }

    try {
      toast.loading("Updating profile image...");

      const formData = new FormData();

      formData.append("profileImage", image);

      // console.log("File:", image);
      // console.log("FormData:", formData.get("profileImage"));

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/employee/profile-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ems-token")}`,
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);

        await fetchProfile();

        setImage(null);

        if (preview) {
          URL.revokeObjectURL(preview);
        }

        setPreview("");
      }
    } catch (error) {
      console.error(
        "Update profile image error:",
        error.response?.data || error,
      );

      toast.error(
        error.response?.data?.message || "Failed to update profile image",
      );
    } finally{
      toast.dismiss();
    }
  };

  const fetchProfile = async () => {
    try {
      if(loading){
        toast.loading("Fetching profile...");
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/employee/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ems-token")}`,
          },
        },
      );
      // console.log("profile", response.data.employee);
      setProfile(response.data.employee);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally { 
      setLoading(false);
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* --- Header --- */}
        <header className="border-b border-slate-800 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Account Settings
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your personal profile, security credentials, and preferences.
          </p>
        </header>

        {/* --- Tabs & Success Notification --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800/80 w-fit">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "security", label: "Security", icon: Lock },
              // { id: "notifications", label: "Notifications", icon: Bell },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs">
            {!profile?.isImageUpdate && (
              <span className=" bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl">
                Update Image
              </span>
            )}
            {!profile?.isPasswordUpdate && (
              <span className=" bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl">
                Update Password
              </span>
            )}
          </div>
        </div>

        {/* --- Tab Content Cards --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
          <div
    className="
      absolute
      top-7
      right-5
      translate-x-1/2
      rotate-90
      origin-center
      flex items-center justify-center
      px-4
      py-1.5
      bg-green-800
      rounded
      backdrop-blur-md
      text-[10px]
      sm:text-xs
      font-semibold
      tracking-wide
      text-white
      shadow-lg
      whitespace-nowrap
    "
  >
    Employee
  </div>
          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-5 border-b border-slate-800/80 pb-6">
                <div className="relative w-20 h-20 group">
                  {/* Profile Image */}
                  <img
                    src={
                      preview ||
                      profile?.profileImage || default_pic
                    }
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-indigo-500/50"
                  />

                  {/* Hidden File Input */}
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  {/* Camera Overlay */}
                  <label
                    htmlFor="profile-image"
                    className="absolute inset-0 bg-slate-950/60 rounded-full 
                   flex items-center justify-center 
                   opacity-0 group-hover:opacity-100 
                   transition-opacity cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </label>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {profile?.fullName}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {profile?.designation} • {profile?.department}
                  </p>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Full Name
                  </label>
                  <input
                    disabled
                    type="text"
                    value={profile?.fullName}
                    className={`w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Email Address
                  </label>
                  <input
                    disabled
                    type="email"
                    value={profile?.email}
                    className={`w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Phone Number
                  </label>
                  <input
                    disabled
                    type="text"
                    value={profile?.phone}
                    className={`w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Location
                  </label>
                  <p
                    className={`w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500  ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    {profile?.address.city}, {profile?.address.country},{" "}
                    {profile?.address.pinCode}
                  </p>
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
          )}

          {/* SECURITY TAB */}
          {activeTab === "security" && (
            <form
              onSubmit={handlePasswordUpdate}
              className="space-y-4 max-w-md"
            >
              <h3 className="text-sm font-bold text-white mb-2">
                Change Password
              </h3>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={security.currentPassword}
                  required
                  onChange={(e) =>
                    setSecurity({
                      ...security,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={security.newPassword}
                  required
                  onChange={(e) =>
                    setSecurity({ ...security, newPassword: e.target.value })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={security.confirmPassword}
                  required
                  onChange={(e) =>
                    setSecurity({
                      ...security,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
                >
                  <Save className="w-3.5 h-3.5" /> Update Password
                </button>
              </div>
            </form>
          )}

          {/* NOTIFICATIONS TAB */}
          {/* {activeTab === "notifications" && (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    id: "emailAlerts",
                    title: "Email Notifications",
                    desc: "Receive email updates regarding your account activities.",
                  },
                  {
                    id: "leaveUpdates",
                    title: "Leave Application Status",
                    desc: "Get notified immediately when your leave request is approved or rejected.",
                  },
                  {
                    id: "companyNews",
                    title: "Company Announcements",
                    desc: "Receive periodic newsletters and department announcements.",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800/80 rounded-xl"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[item.id]}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            [item.id]: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800/80">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
                >
                  <Save className="w-3.5 h-3.5" /> Save Preferences
                </button>
              </div>
            </form>
          )} */}
        </div>
      </div>
    </div>
  );
};
