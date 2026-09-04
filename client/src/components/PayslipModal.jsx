import React, { useRef } from 'react';
import { X, Printer, Download } from 'lucide-react';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

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
        backgroundColor: '#0f172a', // Matches bg-slate-900
      });

      const imgData = canvas.toDataURL('image/png');

      // 2. Initialize jsPDF (A4 size, portrait)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // 3. Add image to PDF and trigger download
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save(`Payslip-${selectedPayslip.month}-${selectedPayslip._id.slice(0, 5)}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    }
  };

  if (!selectedPayslip) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Content / Target for PDF Download */}
        <div ref={payslipRef} className="bg-slate-900 border border-slate-800 rounded-2xl w-full p-6 relative space-y-6">
          
          {/* Modal Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                  {selectedPayslip._id.slice(0, 5)}
                </span>
                <h2 className="text-lg font-bold text-white">
                  Payslip - {selectedPayslip.month}
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Payment Status:{" "}
                <span className="font-mono text-green-500">
                  {selectedPayslip.status}
                </span>
              </p>
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
                <span className="font-mono">₹{selectedPayslip.basicSalary}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Allowances</span>
                <span className="font-mono text-emerald-400">+₹{selectedPayslip.allowances}</span>
              </div>
              <div className="flex justify-between text-white font-semibold border-t border-slate-800/80 pt-2">
                <span>Gross Salary</span>
                <span className="font-mono">
                  ₹{(Number(selectedPayslip.basicSalary || 0) + Number(selectedPayslip.allowances || 0)).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Deductions */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-2">
              <div className="font-bold text-rose-400 border-b border-slate-800/80 pb-1.5 uppercase tracking-wider text-[10px]">
                Deductions
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Deductions</span>
                <span className="font-mono text-rose-400">-₹{selectedPayslip.deductions}</span>
              </div>
              <div className="flex justify-between text-white font-semibold border-t border-slate-800/80 pt-2">
                <span>Net Payable</span>
                <span className="font-mono text-emerald-400">
                  ₹{Number(selectedPayslip.netPayable).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Total Summary Banner */}
          <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-indigo-300 font-semibold block">
                Total Take Home (Net Pay)
              </span>
              <span className="text-xs text-slate-400">
                Credited directly to bank account
              </span>
            </div>
            <span className="text-2xl font-extrabold text-white font-mono">
              ₹{selectedPayslip.netPayable.toLocaleString()}
            </span>
          </div>

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