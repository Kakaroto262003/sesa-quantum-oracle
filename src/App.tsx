import React, { useState } from 'react';
import { Shield, Cpu, Terminal, Globe, Activity, PlusCircle, TrendingUp, Download, MapPin } from 'lucide-react';

function App() {
  // Form States
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [emailResmi, setEmailResmi] = useState('');
  const [kategori, setKategori] = useState('Cafe / Eatery');
  const [tier, setTier] = useState('Standard Tier (Free)');

  // Hardcoded initial data from your screenshot
  const [logs, setLogs] = useState([
    { time: '22:20:47', label: 'sesa', coord: '[-8.653537429181974, 115.21422685277764] - Cafe / Eatery Node Cluster', integrity: '96.3%' },
    { time: '12:04:15', label: 'Sesa Quantum Lab', coord: '[-8.6705, 115.2126] - Denpasar, Bali', integrity: '98.2%' },
    { time: '12:05:32', label: 'Wamena Music Base', coord: '[-8.6823, 115.2625] - Sanur, Bali', integrity: '92.4%' }
  ]);

  const handleDeployNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaPerusahaan || !emailResmi) return alert('Mohon isi semua data node!');
    
    const newLog = {
      time: new Date().toLocaleTimeString(),
      label: namaPerusahaan,
      coord: `[-8.6740, 115.2140] - ${kategori} Node Cluster`,
      integrity: '99.1%'
    };

    setLogs([newLog, ...logs]);
    setNamaPerusahaan('');
    setEmailResmi('');
    alert('🎯 Node Sukses Di-deploy ke Koordinat Global!');
  };

  return (
    <div className="min-h-screen bg-[#1c2331] text-slate-300 font-mono p-4 flex flex-col justify-between relative text-[12px]">
      
      {/* HEADER SECTION */}
      <header className="bg-[#2a3243]/80 border border-slate-700/50 rounded-lg p-3 flex justify-between items-center mb-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h1 className="font-bold tracking-widest text-slate-100 uppercase text-sm">SESA CORE ENGINE V7.0 LIVE</h1>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-bold">
          <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded text-[10px]">SYS: OPERATIONAL</span>
          <span className="text-slate-400 bg-slate-950 px-2 py-0.5 border border-slate-800 rounded flex items-center gap-1">
            <MapPin className="w-3 h-3 text-rose-500" /> LOCATION: BALI
          </span>
        </div>
      </header>

      {/* MIDDLE LAYOUT: FORMS, MAP, AND SIDEBAR PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-grow mb-3">
        
        {/* LEFT PANEL: REGISTER BUSINESS NODE */}
        <div className="lg:col-span-3 bg-[#2a3243]/70 border border-slate-700/50 rounded-lg p-4 flex flex-col justify-between backdrop-blur-md">
          <div className="flex justify-between text-[11px] font-bold text-slate-400 mb-4">
            <span className="text-emerald-400">SCORE:<br/>99.4%</span>
            <span className="text-right">EDIT/TSC:<br/>X-7</span>
          </div>

          <h2 className="font-bold text-cyan-400 mb-3 flex items-center gap-1.5 tracking-wider uppercase text-[11px]">
            <PlusCircle className="w-4 h-4" /> REGISTER NEW BUSINESS NODE
          </h2>

          <form onSubmit={handleDeployNode} className="space-y-4 flex-grow flex flex-col justify-start">
            <div>
              <label className="block text-[10px] uppercase text-slate-400 mb-1 font-bold">Nama Perusahaan</label>
              <input 
                type="text"
                value={namaPerusahaan}
                onChange={(e) => setNamaPerusahaan(e.target.value)}
                placeholder="e.g. Sesa Cyber Tech" 
                className="w-full bg-[#1c2331] border border-slate-700 rounded p-2 text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase text-slate-400 mb-1 font-bold">Email Resmi</label>
              <input 
                type="email"
                value={emailResmi}
                onChange={(e) => setEmailResmi(e.target.value)}
                placeholder="admin@sesa-cluster.com" 
                className="w-full bg-[#1c2331] border border-slate-700 rounded p-2 text-cyan-300 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase text-slate-400 mb-1 font-bold">Kategori Bisnis</label>
              <select 
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full bg-[#1c2331] border border-slate-700 rounded p-2 text-slate-200 focus:outline-none"
              >
                <option>Cafe / Eatery</option>
                <option>Tech Startup</option>
                <option>Music Studio</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase text-slate-400 mb-1 font-bold">SaaS Pricing Tier</label>
              <select 
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full bg-[#1c2331] border border-slate-700 rounded p-2 text-slate-200 focus:outline-none"
              >
                <option>Standard Tier (Free)</option>
                <option>Premium Cluster Tier</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black tracking-widest py-2.5 rounded transition-colors uppercase mt-auto text-[11px]"
            >
              DEPLOY NODE
            </button>
          </form>
        </div>

        {/* CENTER PANEL: THE MAP LAYOUT */}
        <div className="lg:col-span-6 bg-[#2a3243]/40 border border-slate-700/50 rounded-lg overflow-hidden relative min-h-[350px]">
          {/* Mock OpenStreetMap Vector Container */}
          <iframe 
            title="OpenStreetMap Denpasar Cluster"
            src="https://www.openstreetmap.org/export/embed.html?bbox=115.1500%2C-8.7200%2C115.2800%2C-8.6200&amp;layer=mapnik&amp;marker=-8.6535%2C115.2142"
            className="w-full h-full absolute inset-0 border-none opacity-80 filter invert-[90%] hue-rotate-[180deg] saturate-[150%]"
          ></iframe>
          
          {/* Center Coordinates HUD Overlay */}
          <div className="absolute top-3 left-3 bg-[#1c2331]/90 border border-slate-700 text-cyan-400 px-3 py-1.5 rounded font-bold text-[10px] pointer-events-none shadow-md">
            📡 GPS CLUSTER LINK: ACTIVE
          </div>
        </div>

        {/* RIGHT PANEL: FINANCIAL & PREDICTOR TERMINALS */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          
          {/* BINANCE HUB TERMINAL */}
          <div className="bg-[#2a3243]/70 border border-slate-700/50 rounded-lg p-4 backdrop-blur-md">
            <h3 className="text-[11px] font-bold text-amber-500 mb-3 flex items-center gap-1 tracking-wider uppercase">
              ● BINANCE HUB TERMINAL
            </h3>
            <div className="flex justify-between items-baseline">
              <span className="text-slate-400 font-bold">SOL / USDT</span>
              <span className="text-xl font-black text-amber-400">$141.76</span>
            </div>
            <div className="w-full bg-slate-950 h-1 rounded mt-3 overflow-hidden">
              <div className="bg-amber-500 h-full w-[70%]"></div>
            </div>
          </div>

          {/* ORACLE PREDICTOR */}
          <div className="bg-[#2a3243]/70 border border-slate-700/50 rounded-lg p-4 flex-grow backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase">● ORACLE PREDICTOR</h3>
                <span className="text-[9px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-1 rounded font-bold">ACTIVE</span>
              </div>
              <div className="bg-[#1c2331] border border-slate-800 rounded p-3 font-mono text-[11px] space-y-1.5">
                <p className="text-slate-500">// AI CORE STREAM STATUS</p>
                <p className="text-emerald-400 font-bold">Target: sesa</p>
                <p className="text-slate-400 leading-relaxed text-[10px]">Successfully scanned region coordinates cluster. Parsing metadata...</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700/40 grid grid-cols-2 gap-2 text-[10px] font-bold">
              <div>
                <span className="text-slate-500 block">ANALYZED SENTIMENT</span>
                <span className="text-emerald-400 uppercase">POSITIVE</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">AI ACCURACY RATE</span>
                <span className="text-cyan-400">99.12%</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM LAYOUT: ENTERPRISE DATABASE LIVE LOG VIEWER */}
      <footer className="bg-[#2a3243]/80 border border-slate-700/50 rounded-lg p-4 backdrop-blur-md z-10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[11px] font-bold text-cyan-400 tracking-wider uppercase flex items-center gap-1.5">
            <Terminal className="w-4 h-4" /> ENTERPRISE DATABASE LIVE LOG VIEWER (SAAS GLOBAL)
          </h3>
          <button className="bg-[#1c2331] hover:bg-slate-800 text-[10px] font-bold border border-slate-700 px-3 py-1 rounded flex items-center gap-1 text-slate-400 transition-colors">
            <Download className="w-3 h-3" /> EXPORT DATA
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-slate-700/60 text-slate-500 font-bold uppercase tracking-wider">
                <th className="pb-2 pl-2">Timestamp</th>
                <th className="pb-2">Node Label</th>
                <th className="pb-2">Coordinates Location (Click to Target)</th>
                <th className="pb-2 text-right pr-2">Data Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-bold text-slate-300">
              {logs.map((log, index) => (
                <tr key={index} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-2.5 pl-2 text-slate-500">{log.time}</td>
                  <td className="text-cyan-400">{log.label}</td>
                  <td className="text-slate-400 font-mono flex items-center gap-1">
                    <span className="text-cyan-500 text-[12px]">🌐</span> {log.coord}
                  </td>
                  <td className="py-2.5 text-right pr-2 text-emerald-400">{log.integrity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </footer>

    </div>
  );
}

export default App;