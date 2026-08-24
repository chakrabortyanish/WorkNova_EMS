import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Send, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Briefcase
} from 'lucide-react';

// --- Mock Data ---
const leaveBalances = [
  { type: 'Paid Time Off (PTO)', total: 18, used: 6, remaining: 12, color: 'bg-indigo-500' },
  { type: 'Sick Leave', total: 10, used: 2, remaining: 8, color: 'bg-emerald-500' },
  { type: 'Personal Leave', total: 5, used: 1, remaining: 4, color: 'bg-purple-500' },
];

const initialMyRequests = [
  {
    id: 'LR-101',
    type: 'Sick Leave',
    startDate: 'Aug 10, 2026',
    endDate: 'Aug 12, 2026',
    days: 3,
    reason: 'Medical treatment and rest prescribed by doctor.',
    appliedDate: 'Aug 04, 2026',
    status: 'Pending'
  },
  {
    id: 'LR-089',
    type: 'Paid Time Off (PTO)',
    startDate: 'Jul 14, 2026',
    endDate: 'Jul 16, 2026',
    days: 3,
    reason: 'Summer break with family.',
    appliedDate: 'Jul 01, 2026',
    status: 'Approved'
  },
  {
    id: 'LR-072',
    type: 'Personal Leave',
    startDate: 'Jun 02, 2026',
    endDate: 'Jun 02, 2026',
    days: 1,
    reason: 'Personal urgent errand.',
    appliedDate: 'May 28, 2026',
    status: 'Rejected'
  }
];

export const EmployeeLeave = () => {
  const [requests, setRequests] = useState(initialMyRequests);
  const [formData, setFormData] = useState({
    type: 'Paid Time Off (PTO)',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Calculate days between dates
  const calculateDays = (start, end) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 1;
  };

  // Submit Leave Application
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate || !formData.reason) return;

    const daysCount = calculateDays(formData.startDate, formData.endDate);

    const newRequest = {
      id: `LR-${Math.floor(100 + Math.random() * 900)}`,
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      days: daysCount,
      reason: formData.reason,
      appliedDate: 'Today',
      status: 'Pending'
    };

    setRequests([newRequest, ...requests]);
    setFormData({ type: 'Paid Time Off (PTO)', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header --- */}
        <header className="border-b border-slate-800 pb-5">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            My Leave Portal
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Apply for leave, check available balances, and track application progress.
          </p>
        </header>

        {/* --- Balances Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {leaveBalances.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-200">{item.type}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{item.used} of {item.total} days used</p>
                </div>
                <span className="text-2xl font-bold text-white">{item.remaining} <span className="text-xs text-slate-400 font-normal">left</span></span>
              </div>
              
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5 mt-2">
                <div 
                  className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                  style={{ width: `${(item.remaining / item.total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* --- Apply Form + Request History Grid --- */}
        <div className="flex flex-col gap-5">
          
          {/* Apply Leave Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl h-fit">
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" /> Apply For Leave
            </h3>
            <p className="text-xs text-slate-400 mb-6">Submit a new request for manager approval.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Leave Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Paid Time Off (PTO)">Paid Time Off (PTO)</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Start Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">End Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Reason</label>
                <textarea 
                  rows="3"
                  required
                  placeholder="Provide brief details for your leave request..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Submit Request
              </button>
            </form>
          </div>

          {/* My Requests History Table */}
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
            <div>
              <div className="p-5 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white">Leave History & Status</h3>
                <p className="text-xs text-slate-400 mt-0.5">Track your submitted applications</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800/80 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                      <th className="py-3.5 px-6">Type</th>
                      <th className="py-3.5 px-6">Dates</th>
                      <th className="py-3.5 px-6">Reason</th>
                      <th className="py-3.5 px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-sm">
                    {requests.length > 0 ? (
                      requests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 text-xs text-slate-200 font-medium">
                            <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800">
                              {req.type}
                            </span>
                          </td>

                          <td className="py-4 px-6 text-xs">
                            <div className="text-slate-200 font-medium">{req.startDate} - {req.endDate}</div>
                            <div className="text-slate-500 text-[11px] mt-0.5">{req.days} Day(s)</div>
                          </td>

                          <td className="py-4 px-6 text-xs text-slate-400 max-w-xs truncate" title={req.reason}>
                            "{req.reason}"
                          </td>

                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                              req.status === 'Approved' 
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                : req.status === 'Rejected'
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                req.status === 'Approved' ? 'bg-emerald-400' : req.status === 'Rejected' ? 'bg-rose-400' : 'bg-amber-400'
                              }`} />
                              {req.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-500 text-xs">
                          No leave applications submitted yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
