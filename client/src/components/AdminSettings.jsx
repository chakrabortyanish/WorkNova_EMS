import React, { useState } from 'react';
import { 
  Building2, 
  Sliders, 
  ShieldAlert, 
  Lock, 
  Save, 
  CheckCircle2, 
  Globe, 
  Mail, 
  Users, 
  Shield, 
  Database 
} from 'lucide-react';

export const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // General Company Settings State
  const [company, setCompany] = useState({
    name: 'Acme Corporation',
    domain: 'company.com',
    supportEmail: 'hr@company.com',
    timezone: '(GMT-08:00) Pacific Time',
    currency: 'USD ($)',
  });

  // System Control Settings State
  const [system, setSystem] = useState({
    autoApproveLeave: false,
    maxLeaveDaysPerRequest: 14,
    allowRemoteAttendance: true,
    maintenanceMode: false,
  });

  // Roles & Permissions State
  const [permissions, setPermissions] = useState({
    managersCanApproveLeave: true,
    employeesCanViewDirectory: true,
    allowProfileSelfEdit: true,
    requireMFA: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* --- Header --- */}
        <header className="border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Admin Console Settings
            </h1>
            <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              System Admin
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Configure organization details, global policies, system controls, and access permissions.
          </p>
        </header>

        {/* --- Navigation Tabs & Success Banner --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800/80 w-fit">
            {[
              { id: 'company', label: 'Company Profile', icon: Building2 },
              { id: 'system', label: 'System Policy', icon: Sliders },
              { id: 'permissions', label: 'Access & Security', icon: ShieldAlert },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-xs font-medium animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4" />
              System configurations saved!
            </div>
          )}
        </div>

        {/* --- Main Content Panel --- */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
          
          {/* TAB 1: COMPANY PROFILE */}
          {activeTab === 'company' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="border-b border-slate-800/80 pb-4">
                <h3 className="text-sm font-bold text-white">Organization Identity</h3>
                <p className="text-xs text-slate-400 mt-0.5">Global organization parameters applied across the system.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Company Name</label>
                  <input
                    type="text"
                    value={company.name}
                    onChange={(e) => setCompany({ ...company, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Company Domain</label>
                  <input
                    type="text"
                    value={company.domain}
                    onChange={(e) => setCompany({ ...company, domain: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">HR Support Email</label>
                  <input
                    type="email"
                    value={company.supportEmail}
                    onChange={(e) => setCompany({ ...company, supportEmail: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Default Timezone</label>
                  <select
                    value={company.timezone}
                    onChange={(e) => setCompany({ ...company, timezone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="(GMT-08:00) Pacific Time">(GMT-08:00) Pacific Time</option>
                    <option value="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</option>
                    <option value="(GMT+00:00) UTC">(GMT+00:00) UTC</option>
                    <option value="(GMT+05:30) India Standard Time">(GMT+05:30) India Standard Time</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800/80">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
                >
                  <Save className="w-3.5 h-3.5" /> Save Company Details
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SYSTEM POLICY */}
          {activeTab === 'system' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="border-b border-slate-800/80 pb-4">
                <h3 className="text-sm font-bold text-white">Global Rules & Automation</h3>
                <p className="text-xs text-slate-400 mt-0.5">Automated leave workflows and operational constraints.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800/80 rounded-xl">
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Auto-Approve Short Leaves</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Automatically grant leave requests under 2 days without requiring manual approval.</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={system.autoApproveLeave}
                      onChange={(e) => setSystem({ ...system, autoApproveLeave: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800/80 rounded-xl">
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Remote Attendance Check-In</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Allow remote employees to log attendance directly from the portal.</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={system.allowRemoteAttendance}
                      onChange={(e) => setSystem({ ...system, allowRemoteAttendance: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-xl">
                  <label className="text-xs font-semibold text-slate-200 block mb-1">Max Consecutive Leave Days Allowed</label>
                  <p className="text-[11px] text-slate-400 mb-3">Maximum duration an employee can select in a single request.</p>
                  <input
                    type="number"
                    value={system.maxLeaveDaysPerRequest}
                    onChange={(e) => setSystem({ ...system, maxLeaveDaysPerRequest: Number(e.target.value) })}
                    className="w-48 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800/80">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
                >
                  <Save className="w-3.5 h-3.5" /> Save Policies
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: ACCESS & SECURITY */}
          {activeTab === 'permissions' && (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="border-b border-slate-800/80 pb-4">
                <h3 className="text-sm font-bold text-white">Role Privileges & Security Enforcement</h3>
                <p className="text-xs text-slate-400 mt-0.5">Control data visibility and login authentication policies.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800/80 rounded-xl">
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Department Manager Approvals</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Allow department leads to review and approve leave applications.</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.managersCanApproveLeave}
                      onChange={(e) => setPermissions({ ...permissions, managersCanApproveLeave: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800/80 rounded-xl">
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Employee Directory Visibility</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Allow staff to search and view peer contact info in the directory.</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.employeesCanViewDirectory}
                      onChange={(e) => setPermissions({ ...permissions, employeesCanViewDirectory: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800/80 rounded-xl">
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Enforce Multi-Factor Authentication (MFA)</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Require mandatory 2FA security codes for all staff accounts upon login.</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={permissions.requireMFA}
                      onChange={(e) => setPermissions({ ...permissions, requireMFA: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800/80">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
                >
                  <Save className="w-3.5 h-3.5" /> Save Permissions
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
