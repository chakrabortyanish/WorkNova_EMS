import React, { useState } from 'react';
import { 
  DollarSign, 
  Download, 
  Eye, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Building, 
  Printer, 
  X, 
  CheckCircle2,
  Briefcase
} from 'lucide-react';

// --- Mock Data ---
const mockPayslips = [
  {
    id: 'PAY-2026-07',
    month: 'July 2026',
    payDate: 'Jul 31, 2026',
    basicSalary: 6500,
    allowances: 1200,
    deductions: 850,
    netPay: 6850,
    status: 'Paid',
    breakdown: {
      hra: 500,
      conveyance: 300,
      medical: 400,
      tax: 650,
      pf: 200
    }
  },
  {
    id: 'PAY-2026-06',
    month: 'June 2026',
    payDate: 'Jun 30, 2026',
    basicSalary: 6500,
    allowances: 1200,
    deductions: 850,
    netPay: 6850,
    status: 'Paid',
    breakdown: {
      hra: 500,
      conveyance: 300,
      medical: 400,
      tax: 650,
      pf: 200
    }
  },
  {
    id: 'PAY-2026-05',
    month: 'May 2026',
    payDate: 'May 31, 2026',
    basicSalary: 6500,
    allowances: 1000,
    deductions: 800,
    netPay: 6700,
    status: 'Paid',
    breakdown: {
      hra: 500,
      conveyance: 200,
      medical: 300,
      tax: 600,
      pf: 200
    }
  },
  {
    id: 'PAY-2026-04',
    month: 'April 2026',
    payDate: 'Apr 30, 2026',
    basicSalary: 6000,
    allowances: 1000,
    deductions: 750,
    netPay: 6250,
    status: 'Paid',
    breakdown: {
      hra: 500,
      conveyance: 200,
      medical: 300,
      tax: 550,
      pf: 200
    }
  }
];

export const EmployeePayslips = () => {
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [yearFilter, setYearFilter] = useState('2026');

  const latestPayslip = mockPayslips[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header --- */}
        <header className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              My Payslips & Payroll
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              View compensation summary, earnings breakdown, and download paystubs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="2026">Financial Year 2026</option>
              <option value="2025">Financial Year 2025</option>
            </select>
          </div>
        </header>

        {/* --- Key Salary Metrics --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>LAST NET SALARY</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">${latestPayslip.netPay.toLocaleString()}</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" /> Credited on {latestPayslip.payDate}
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>YTD GROSS EARNINGS</span>
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">$26,650</div>
            <div className="text-[11px] text-slate-400 mt-1">Jan 2026 – Jul 2026</div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center text-slate-400 text-xs font-semibold mb-2">
              <span>YTD TAX & DEDUCTIONS</span>
              <FileText className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-extrabold text-white">$3,250</div>
            <div className="text-[11px] text-slate-400 mt-1">Total withholdings & benefits</div>
          </div>
        </div>

        {/* --- Payslip History Table --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Salary Statement History</h3>
              <p className="text-xs text-slate-400 mt-0.5">Click any row or view icon to open detailed stub</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-6">Pay Period</th>
                  <th className="py-3.5 px-6">Payment Date</th>
                  <th className="py-3.5 px-6">Basic Salary</th>
                  <th className="py-3.5 px-6">Allowances</th>
                  <th className="py-3.5 px-6">Deductions</th>
                  <th className="py-3.5 px-6">Net Salary</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-sm">
                {mockPayslips.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-6 text-xs text-slate-200 font-semibold">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {pay.month}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-400">
                      {pay.payDate}
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

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedPayslip(pay)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                          title="View Paystub"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- Payslip Details Modal --- */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                    {selectedPayslip.id}
                  </span>
                  <h2 className="text-lg font-bold text-white">Payslip - {selectedPayslip.month}</h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Payment Date: {selectedPayslip.payDate}</p>
              </div>
              <button 
                onClick={() => setSelectedPayslip(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              
              {/* Earnings */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-2">
                <div className="font-bold text-emerald-400 border-b border-slate-800/80 pb-1.5 uppercase tracking-wider text-[10px]">
                  Earnings
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Basic Salary</span>
                  <span className="font-mono">${selectedPayslip.basicSalary}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>HRA</span>
                  <span className="font-mono">${selectedPayslip.breakdown.hra}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Conveyance</span>
                  <span className="font-mono">${selectedPayslip.breakdown.conveyance}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Medical</span>
                  <span className="font-mono">${selectedPayslip.breakdown.medical}</span>
                </div>
              </div>

              {/* Deductions */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-2">
                <div className="font-bold text-rose-400 border-b border-slate-800/80 pb-1.5 uppercase tracking-wider text-[10px]">
                  Deductions
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Income Tax</span>
                  <span className="font-mono">${selectedPayslip.breakdown.tax}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Provident Fund</span>
                  <span className="font-mono">${selectedPayslip.breakdown.pf}</span>
                </div>
              </div>

            </div>

            {/* Total Summary Banner */}
            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-indigo-300 font-semibold block">Total Take Home (Net Pay)</span>
                <span className="text-xs text-slate-400">Credited directly to bank account</span>
              </div>
              <span className="text-2xl font-extrabold text-white font-mono">${selectedPayslip.netPay.toLocaleString()}</span>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
              <button
                onClick={() => setSelectedPayslip(null)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
