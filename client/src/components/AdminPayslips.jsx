import React, { useState } from 'react';
import { 
  DollarSign, 
  Search, 
  Download, 
  Send, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Users, 
  Filter, 
  Eye, 
  X,
  CreditCard
} from 'lucide-react';

// --- Mock Data ---
const initialPayrollList = [
  {
    id: 'PAY-2026-07-01',
    employee: 'Sarah Jenkins',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    basicSalary: 6500,
    allowances: 1200,
    deductions: 850,
    netPay: 6850,
    month: 'July 2026',
    status: 'Paid',
    payDate: 'Jul 31, 2026'
  },
  {
    id: 'PAY-2026-07-02',
    employee: 'Michael Chen',
    role: 'Product Designer',
    department: 'Design & UX',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    basicSalary: 5800,
    allowances: 900,
    deductions: 700,
    netPay: 6000,
    status: 'Paid',
    payDate: 'Jul 31, 2026'
  },
  {
    id: 'PAY-2026-08-01',
    employee: 'Elena Rostova',
    role: 'Marketing Lead',
    department: 'Marketing',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    basicSalary: 6200,
    allowances: 1000,
    deductions: 800,
    netPay: 6400,
    status: 'Pending',
    payDate: 'Aug 31, 2026'
  },
  {
    id: 'PAY-2026-08-02',
    employee: 'David Kim',
    role: 'DevOps Specialist',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    basicSalary: 6000,
    allowances: 800,
    deductions: 750,
    netPay: 6050,
    status: 'Pending',
    payDate: 'Aug 31, 2026'
  }
];

export const AdminPayslips = () => {
  const [payrolls, setPayrolls] = useState(initialPayrollList);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  // Handle Mark as Paid / Release Action
  const handleMarkAsPaid = (id) => {
    setPayrolls(prev =>
      prev.map(item => (item.id === id ? { ...item, status: 'Paid' } : item))
    );
    if (selectedPayroll && selectedPayroll.id === id) {
      setSelectedPayroll(prev => ({ ...prev, status: 'Paid' }));
    }
  };

  // Filter List
  const filteredPayrolls = payrolls.filter(item => {
    const matchesSearch =
      item.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header --- */}
        <header className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Payroll & Payslip Management
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Admin View
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Process monthly employee salaries, review breakdowns, and dispatch digital paystubs.
            </p>
          </div>

          <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg shadow-indigo-600/25 transition-all text-xs w-fit">
            <Send className="w-4 h-4" /> Run Monthly Payroll
          </button>
        </header>

        {/* --- Executive Metrics --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL DISBURSED THIS MONTH</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">$12,850</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" /> 2 Staff Disbursed
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>PENDING PAYMENTS</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">$12,450</div>
            <div className="text-[11px] text-amber-400 mt-1 font-medium">
              2 Staff Awaiting Processing
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>TOTAL ACTIVE PAYROLL STAFF</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">{payrolls.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">Across 4 Departments</div>
          </div>
        </div>

        {/* --- Controls Bar --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search employee, dept, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1">
            {['All', 'Paid', 'Pending'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === status 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* --- Payroll Records Table --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-6">Employee</th>
                  <th className="py-3.5 px-6">Basic Salary</th>
                  <th className="py-3.5 px-6">Allowances</th>
                  <th className="py-3.5 px-6">Deductions</th>
                  <th className="py-3.5 px-6">Net Payable</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {filteredPayrolls.length > 0 ? (
                  filteredPayrolls.map((pay) => (
                    <tr key={pay.id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Employee Profile */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={pay.avatar} 
                            alt={pay.employee} 
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-800"
                          />
                          <div>
                            <div className="font-semibold text-white">{pay.employee}</div>
                            <div className="text-xs text-slate-400">{pay.role}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-xs text-slate-300 font-mono">
                        ${pay.basicSalary.toLocaleString()}
                      </td>

                      <td className="py-4 px-6 text-xs text-emerald-400 font-mono">
                        +${pay.allowances.toLocaleString()}
                      </td>

                      <td className="py-4 px-6 text-xs text-rose-400 font-mono">
                        -${pay.deductions.toLocaleString()}
                      </td>

                      <td className="py-4 px-6 text-xs font-bold text-white font-mono">
                        ${pay.netPay.toLocaleString()}
                      </td>

                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
                          pay.status === 'Paid' 
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            pay.status === 'Paid' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`} />
                          {pay.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedPayroll(pay)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                            title="Inspect Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {pay.status === 'Pending' && (
                            <button
                              onClick={() => handleMarkAsPaid(pay.id)}
                              className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg transition-colors text-xs font-semibold border border-emerald-500/30 flex items-center gap-1"
                            >
                              <CreditCard className="w-3.5 h-3.5" /> Disburse
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500 text-xs">
                      No payroll records match the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- Admin Payroll Detail Modal --- */}
      {selectedPayroll && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                  {selectedPayroll.id}
                </span>
                <h2 className="text-lg font-bold text-white mt-1">Payroll Breakdown</h2>
                <p className="text-xs text-slate-400">{selectedPayroll.employee} • {selectedPayroll.department}</p>
              </div>
              <button 
                onClick={() => setSelectedPayroll(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800/60 text-slate-300">
                <span>Basic Fixed Salary</span>
                <span className="font-mono text-white">${selectedPayroll.basicSalary}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60 text-slate-300">
                <span>Total Allowances (HRA + Benefits)</span>
                <span className="font-mono text-emerald-400">+${selectedPayroll.allowances}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60 text-slate-300">
                <span>Deductions (Tax + PF)</span>
                <span className="font-mono text-rose-400">-${selectedPayroll.deductions}</span>
              </div>
              <div className="flex justify-between py-2 pt-3 text-sm font-bold text-white">
                <span>Net Payable Amount</span>
                <span className="font-mono">${selectedPayroll.netPay}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedPayroll(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
              {selectedPayroll.status === 'Pending' && (
                <button
                  onClick={() => handleMarkAsPaid(selectedPayroll.id)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 flex items-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" /> Confirm Disbursement
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
