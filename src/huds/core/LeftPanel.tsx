import React, { useState } from 'react';
import NeonCard from '../elements/NeonCard';
import { useCoreData } from '../../state/useCoreData';

export default function LeftPanel() {
  const { metrics, openCheckout, addLogNode } = useCoreData();
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessType, setBusinessType] = useState('Cafe / Eatery');
  const [tier, setTier] = useState('Standard Tier (Free)');

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;

    if (tier === 'Standard Tier (Free)') {
      addLogNode(businessName, businessType);
      setBusinessName('');
      setBusinessEmail('');
    } else {
      openCheckout(businessName, businessType, businessEmail, tier);
      setBusinessName('');
      setBusinessEmail('');
    }
  };

  return (
    // Kontainer utama luar penyesuai tinggi layar dashboard
    <div className="w-80 h-[calc(100vh-140px)] pointer-events-auto z-20">
      
      {/* SATU NEONCARD BESAR UNTUK SEMUA FITUR AGAR BISA DI-SCROLL SECARA LELUASA */}
      <NeonCard className="w-full h-full flex flex-col gap-4 p-3 bg-slate-900/40 border border-white/10 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        
        {/* SECTION 1: DYNAMICS FLOW (METRICS) */}
        <div className="flex flex-col gap-1.5 shrink-0">
          <div className="flex justify-between items-center border-b border-white/5 pb-1">
            <h2 className="text-[10px] font-bold text-cyan-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Dynamics Flow
            </h2>
            <span className="text-[8px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
              LIVE
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
            <div className="bg-black/20 p-1.5 rounded border border-white/5">
              <div className="text-[7.5px] text-slate-500 uppercase">Uptime</div>
              <div className="text-emerald-400 font-bold mt-0.5">{metrics.uptime}</div>
            </div>
            <div className="bg-black/20 p-1.5 rounded border border-white/5">
              <div className="text-[7.5px] text-slate-500 uppercase">Sectors</div>
              <div className="text-cyan-400 font-bold mt-0.5">{metrics.sectors}</div>
            </div>
            <div className="bg-black/20 p-1.5 rounded border border-white/5">
              <div className="text-[7.5px] text-slate-500 uppercase">Secure</div>
              <div className="text-teal-400 font-bold mt-0.5">{metrics.secureCluster}</div>
            </div>
            <div className="bg-black/20 p-1.5 rounded border border-white/5">
              <div className="text-[7.5px] text-slate-500 uppercase">Routing</div>
              <div className="text-sky-400 font-bold mt-0.5">{metrics.routingMatrix}</div>
            </div>
          </div>
        </div>

        {/* SECTION 2: REGISTER NEW BUSINESS NODE (FORM) */}
        <div className="flex flex-col gap-2 shrink-0">
          <h2 className="text-[10px] font-bold text-cyan-400 font-mono tracking-widest uppercase border-b border-white/5 pb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            Register New Business Node
          </h2>

          <form onSubmit={handleDeploy} className="flex flex-col gap-2.5 font-mono text-[11px]">
            <div className="flex flex-col gap-1">
              <label className="text-[8px] text-slate-400 uppercase tracking-wider">Nama Perusahaan</label>
              <input
                type="text"
                required
                placeholder="e.g. Sesa Global Coffee"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-black/40 border border-slate-800 rounded p-2 text-white placeholder-slate-700 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[8px] text-slate-400 uppercase tracking-wider">Email Resmi</label>
              <input
                type="email"
                required
                placeholder="official@company.com"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className="w-full bg-black/40 border border-slate-800 rounded p-2 text-white placeholder-slate-700 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[8px] text-slate-400 uppercase tracking-wider">Kategori Bisnis</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-black/80 border border-slate-800 rounded p-2 text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="Cafe / Eatery">Cafe / Eatery</option>
                <option value="Quantum Lab">Quantum Lab</option>
                <option value="Enterprise Branch">Enterprise Branch</option>
                <option value="Crypto Hub">Crypto Hub</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[8px] text-slate-400 uppercase tracking-wider">SaaS Pricing Tier</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full bg-black/80 border border-slate-800 rounded p-2 text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                <option value="Standard Tier (Free)">Standard Tier (Free)</option>
                <option value="Premium Core ($49/mo)">Premium Core ($49/mo)</option>
                <option value="Enterprise Ultimate ($199/mo)">Enterprise Ultimate ($199/mo)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-1 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-400 text-white font-bold py-2.5 px-4 rounded transition-all duration-300 active:scale-[0.97] uppercase tracking-widest text-center text-[10px]"
            >
              DEPLOY NODE
            </button>
          </form>
        </div>

        {/* SECTION 3: TELEMETRY WAVE */}
        <div className="flex flex-col gap-1.5 shrink-0 border-t border-white/5 pt-2">
          <span className="text-[8px] font-bold text-slate-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            Telemetry Wave
          </span>
          <div className="h-8 flex items-end gap-1 px-1 pt-1 bg-black/10 border border-white/5 rounded">
            {useCoreData((state) => state.aiAnalysis.waveData).map((val, idx) => (
              <div 
                key={idx} 
                style={{ height: `${val}%` }} 
                className="flex-1 bg-gradient-to-t from-cyan-600 to-teal-400 rounded-t-sm transition-all duration-500"
              />
            ))}
          </div>
        </div>

      </NeonCard>
    </div>
  );
}