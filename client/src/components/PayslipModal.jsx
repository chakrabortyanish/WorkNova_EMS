import React, { useRef } from "react";
import { X, Printer, Download } from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import logo from "../assets/logo.png";
// Inside your component:
const PayslipModal = ({ selectedPayslip, setSelectedPayslip }) => {
  // Reference for the element you want to download
  const payslipRef = useRef(null);

  const handleDownloadPDF = async () => {
    const element = payslipRef.current;
    if (!element) return;

    try {
      // 1. Capture the DOM element as a canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Increases quality/sharpness
        useCORS: true,
        backgroundColor: "#0f172a", // Matches bg-slate-900
      });

      const imgData = canvas.toDataURL("image/png");

      // 2. Initialize jsPDF (A4 size, portrait)
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // 3. Add image to PDF and trigger download
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save(
        `Payslip-${selectedPayslip.month}-${selectedPayslip._id.slice(0, 5)}.pdf`,
      );
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  if (!selectedPayslip) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm overflow-y-auto flex items-start justify-center p-4 py-10">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <button>
          <X
            onClick={() => setSelectedPayslip(null)}
            className="absolute top-4 right-4 w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          />
        </button>
        
        {/* Modal Content / Target for PDF Download */}
        <div
          ref={payslipRef}
          className="bg-slate-900 border border-slate-800 rounded-2xl w-full p-8 relative space-y-6 text-slate-100"
        >
          {/* Official Document Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-3">
                {/* Company Logo / Name Placeholder */}
                <div className="w-8 h-8 rounded-lg bg-white shadow-md">
                  <img src={logo} alt="Company Logo" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-white">
                    Payslip Statement
                  </h2>
                  <p className="text-xs text-slate-400">
                    Official Salary Record & Earnings Breakdown
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                Period: {selectedPayslip.month}
              </span>
            </div>
          </div>

          {/* Employee Details Bar (Name, Role, Designation) */}
          <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-4 grid grid-cols-3 gap-4 text-xs">
            <div className="min-w-0">
              <span className="text-slate-400 block mb-0.5">Employee Name</span>
              <span
                className="font-semibold text-slate-200 block truncate"
                title={selectedPayslip.employee?.fullName}
              >
                {selectedPayslip.employee?.fullName || "N/A"}
              </span>
            </div>
            <div className="min-w-0">
              <span className="text-slate-400 block mb-0.5">Email</span>
              <span
                className="font-semibold text-slate-200 block truncate"
                title={selectedPayslip.employee?.email}
              >
                {selectedPayslip.employee?.email || "N/A"}
              </span>
            </div>
            <div className="min-w-0">
              <span className="text-slate-400 block mb-0.5">Designation</span>
              <span
                className="font-semibold text-slate-200 block truncate"
                title={selectedPayslip.employee?.designation}
              >
                {selectedPayslip.employee?.designation || "N/A"}
              </span>
            </div>
          </div>

          {/* Status & Details Bar */}
          <div className="bg-slate-950/60 border border-slate-800/60 rounded-xl p-4 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block mb-0.5">
                Payment Status
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {selectedPayslip.status}
              </span>
            </div>
            <div className="text-right">
              <span className="text-slate-400 block mb-0.5">
                Generation Date
              </span>
              <span className="font-mono text-slate-300">
                {new Date().toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Breakdown Cards Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            {/* Earnings Column */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-3">
              <div className="font-bold text-emerald-400 border-b border-slate-800/80 pb-2 uppercase tracking-wider text-[11px] flex items-center justify-between">
                <span>Earnings</span>
                <span>Amount</span>
              </div>

              <div className="flex justify-between text-slate-300 py-1">
                <span>Basic Salary</span>
                <span className="font-mono text-slate-200">
                  ₹{Number(selectedPayslip.basicSalary || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-slate-300 py-1">
                <span>Allowances & Bonus</span>
                <span className="font-mono text-emerald-400">
                  +₹{Number(selectedPayslip.allowances || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-white font-semibold border-t border-slate-800/80 pt-2.5">
                <span>Gross Salary</span>
                <span className="font-mono text-emerald-400">
                  ₹
                  {(
                    Number(selectedPayslip.basicSalary || 0) +
                    Number(selectedPayslip.allowances || 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Deductions Column */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-3">
              <div className="font-bold text-rose-400 border-b border-slate-800/80 pb-2 uppercase tracking-wider text-[11px] flex items-center justify-between">
                <span>Deductions</span>
                <span>Amount</span>
              </div>

              <div className="flex justify-between text-slate-300 py-1">
                <span>Total Deductions (Tax/PF)</span>
                <span className="font-mono text-rose-400">
                  -₹{Number(selectedPayslip.deductions || 0).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-slate-500 py-1 opacity-40">
                <span>Other Adjustments</span>
                <span className="font-mono">₹0</span>
              </div>

              <div className="flex justify-between text-white font-semibold border-t border-slate-800/80 pt-2.5">
                <span>Total Deductions</span>
                <span className="font-mono text-rose-400">
                  -₹{Number(selectedPayslip.deductions || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Total Summary Banner */}
          <div className="bg-gradient-to-r from-indigo-950/60 to-slate-950 border border-indigo-500/30 rounded-xl p-5 flex items-center justify-between shadow-inner">
            <div>
              <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider block">
                Net Payable Amount
              </span>
              <span className="text-xs text-slate-400 mt-0.5 block">
                Credited directly to registered bank account
              </span>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-white font-mono tracking-tight text-emerald-400">
                ₹{Number(selectedPayslip.netPayable || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center border-t border-slate-800/60 pt-4">
            <p className="text-[10px] text-slate-500">
              This is a system-generated computer document and does not require
              a physical signature.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayslipModal;
