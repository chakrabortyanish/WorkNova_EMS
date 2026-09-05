import { useEffect, useState } from "react";
import axios from "axios";
import { Clock, LogIn, LogOut, CalendarDays } from "lucide-react";
import { toast } from "react-hot-toast";

export const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const token = localStorage.getItem("ems-token");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  // =====================================================
  // GET MY ATTENDANCE
  // =====================================================

  const fetchMyAttendance = async () => {
    try {
      toast.loading("Loading attendance...");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/attendance/my-attendance`,
        authConfig
      );

      const data = response.data.attendance || [];

      setAttendance(data);

      // Find today's attendance
      const today = new Date();

      const todayRecord = data.find((record) => {
        const recordDate = new Date(record.date);

        return (
          recordDate.getDate() === today.getDate() &&
          recordDate.getMonth() === today.getMonth() &&
          recordDate.getFullYear() === today.getFullYear()
        );
      });

      setTodayAttendance(todayRecord || null);
    } catch (error) {
      console.error("Failed to fetch attendance:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load attendance"
      );
    } finally {
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchMyAttendance();
  }, []);

  // =====================================================
  // CHECK IN
  // =====================================================

  const handleCheckIn = async () => {
    try {
      toast.loading("Checking in...");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/attendance/check-in`,
        {}, // body
        authConfig // config
      );

      console.log(response.data);

      toast.success("Check-in successful!");

      // Refresh attendance
      await fetchMyAttendance();
    } catch (error) {
      console.error("Check-in failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Check-in failed. Please try again."
      );
    } finally {
      toast.dismiss();
    }
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (time) => {
    if (!time) return "--";

    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-full bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold text-white">
            My Attendance
          </h1>

          <p className="text-slate-400 mt-1">
            Manage your daily attendance.
          </p>
        </div>

        {/* Today's Attendance */}

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>
              <p className="text-sm text-slate-400">
                Today's Attendance
              </p>

              <h2 className="text-2xl font-bold text-white mt-1">
                {new Date().toLocaleDateString([], {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h2>
            </div>

            {/* Status */}

            <div>
              {todayAttendance ? (
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    todayAttendance.status === "Late"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : todayAttendance.status === "Half Day"
                      ? "bg-orange-500/10 text-orange-400"
                      : "bg-green-500/10 text-green-400"
                  }`}
                >
                  {todayAttendance.status}
                </span>
              ) : (
                <span className="px-4 py-2 rounded-full bg-slate-800 text-slate-400 text-sm">
                  No attendance record
                </span>
              )}
            </div>
          </div>

          {/* Today's Details */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

            {/* Check In */}

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <LogIn className="w-5 h-5 text-green-400" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Check In
                  </p>

                  <p className="text-xl font-semibold text-white">
                    10 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Check Out */}

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-red-500/10">
                  <LogOut className="w-5 h-5 text-red-400" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Check Out
                  </p>

                  <p className="text-xl font-semibold text-white">
                    7 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours */}

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/10">
                  <Clock className="w-5 h-5 text-indigo-400" />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Work Hours
                  </p>

                  <p className="text-xl font-semibold text-white">
                    9 hrs
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">

            {!todayAttendance && (
              <button
                onClick={handleCheckIn}
                disabled={actionLoading}
                className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition"
              >
                <LogIn className="w-5 h-5" />

                {actionLoading
                  ? "Checking In..."
                  : "Check In"}
              </button>
            )}

            {todayAttendance && !todayAttendance.checkOut && (
              <button
                disabled={true}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white py-3 rounded-xl font-semibold transition cursor-not-allowed"
              > Already Checked In
              </button>
            )}

          </div>
        </div>


      </div>
    </div>
  );
};