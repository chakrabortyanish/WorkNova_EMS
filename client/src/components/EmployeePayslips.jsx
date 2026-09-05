import { useState, useEffect } from "react";
import {
  Download,
  Eye,
  Calendar,
} from "lucide-react";

import PayslipModal from "./PayslipModal";

import axios from "axios";
import toast from "react-hot-toast";

export const EmployeePayslips = () => {
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [myPayslips, setMyPayslips] = useState(null);

  const fetchMyPayslips = async () => {
    try {
      toast.loading("Fetching payslips...");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/payslip/my`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ems-token")}`,
          },
        },
      );

      setMyPayslips(response.data.payslips);
      console.log(5, response.data.payslips);
    } catch (error) {
      console.error("Fetch payslips error:", error);

      alert(error.response?.data?.message || "Failed to fetch payslips");
    } finally {
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchMyPayslips();
  }, []);

 /*  const handleDownloadPDF = async () => {
    if (!payslipRef.current) return;

    try {
      const element = payslipRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#0f172a",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      const margin = 10;

      const availableWidth = pdfWidth - margin * 2;

      const imageHeight = (canvas.height * availableWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", margin, margin, availableWidth, imageHeight);

      pdf.save(`Payslip-${selectedPayslip.month}-${selectedPayslip.year}.pdf`);
    } catch (error) {
      console.error("PDF download error:", error);

      alert("Failed to download payslip");
    }
  }; */

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
              View compensation summary, earnings breakdown, and download
              paystubs.
            </p>
          </div>

          {/* <div className="flex items-center gap-2">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="2026">Financial Year 2026</option>
              <option value="2025">Financial Year 2025</option>
            </select>
          </div> */}
        </header>

        {/* --- Key Salary Metrics --- */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
        </div> */}

        {/* --- Payslip History Table --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                Salary Statement History
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any row or view icon to open detailed stub
              </p>
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
                {myPayslips?.map((pay) => (
                  <tr
                    key={pay.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-4 px-6 text-xs text-slate-200 font-semibold">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {pay.month}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-400">
                      {pay.status === "Paid"
                        ? new Date(pay.paidAt).toLocaleDateString()
                        : "Pending"}
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-300 font-mono">
                      ${pay.basicSalary.toLocaleString()}
                    </td>

                    <td className="py-4 px-6 text-xs text-emerald-400 font-mono">
                      +${pay.allowances}
                    </td>

                    <td className="py-4 px-6 text-xs text-rose-400 font-mono">
                      -${pay.deductions}
                    </td>

                    <td className="py-4 px-6 text-xs font-bold text-white font-mono">
                      ${pay.netPayable.toLocaleString()}
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
                          onClick={() => setSelectedPayslip(pay)}
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
      {selectedPayslip && <PayslipModal selectedPayslip={selectedPayslip} setSelectedPayslip={setSelectedPayslip} />}
    </div>
  );
};
