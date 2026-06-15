import React, { useState } from 'react';
import { Shield, Cpu, Terminal, Globe, Activity, PlusCircle, Download, Radio, Zap, Target, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NodeLog {
  id: string;
  time: string;
  label: string;
  coord: string;
  kategori: string;
  integrity: string;
  confidence: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  potential: number;
  embedUrl: string; // URL Navigasi Google Earth Satelit khusus tiap node
}

export default function App() {
  // States Manager
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [emailResmi, setEmailResmi] = useState('');
  const [kategori, setKategori] = useState('Tech Startup');
  
  // Data Link Telemetry berbasis Google Maps Satellite asli sesuai pin screenshot kamu!
  const [logs, setLogs] = useState<NodeLog[]>([
    { 
      id: '1', 
      time: '20:52:12', 
      label: 'Sesa Core AI Hub', 
      coord: '[-8.6740, 115.2460]', 
      kategori: 'Tech Startup', 
      integrity: '99.8%', 
      confidence: 99.12, 
      risk: 'LOW', 
      potential: 98.4,
      embedUrl: "https://maps.google.com/maps?q=-8.6740,115.2460&t=k&z=14&output=embed" // Fokus Renon Bali Satelit
    },
    { 
      id: '2', 
      time: '20:48:05', 
      label: 'Malaysia Edge Node', 
      coord: '[3.1390, 101.6869]', 
      kategori: 'Cyber Security', 
      integrity: '98.2%', 
      confidence: 97.50, 
      risk: 'MEDIUM', 
      potential: 88.7,
      embedUrl: "https://maps.google.com/maps?q=3.1390,101.6869&t=k&z=12&output=embed" // Fokus Kuala Lumpur Satelit
    },
    { 
      id: '3', 
      time: '20:41:19', 
      label: 'Papua Cluster Node', 
      coord: '[-6.3149, 143.9555]', 
      kategori: 'Data Storage', 
      integrity: '92.4%', 
      confidence: 89.10, 
      risk: 'HIGH', 
      potential: 94.5,
      embedUrl: "https://maps.google.com/maps?q=-6.3149,143.9555&t=k&z=11&output=embed" // Fokus Papua Satelit
    }
  ]);

  // Default Map View diatur langsung ke Sesa Core AI Hub (Bali)
  const [currentMapUrl, setCurrentMapUrl] = useState<string>(logs[0].embedUrl);
  const [selectedNode, setSelectedNode] = useState<NodeLog | null>(logs[0]);

  // Interaksi Kamera Taktis saat baris tabel atau lokasi diklik
  const handleFocusNode = (node: NodeLog) => {
    setSelectedNode(node);
    setCurrentMapUrl(node.embedUrl);
  };

  const handleDeployNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaPerusahaan || !emailResmi) return alert('🚨 Otorisasi Node Gagal: Parameter tidak lengkap!');

    // Penempatan koordinat acak pintar di wilayah Indonesia
    const randomLat = (-2.6617 + (Math.random() - 0.5) * 4).toFixed(4);
    const randomLng = (115.2460 + (Math.random() - 0.5) * 8).toFixed(4);

    const newLog: NodeLog = {
      id: String(logs.length + 1),
      time: new Date().toLocaleTimeString(),
      label: namaPerusahaan,
      coord: `[${randomLat}, ${randomLng}]`,
      kategori: kategori,
      integrity: '99.5%',
      confidence: parseFloat((92 + Math.random() * 7).toFixed(2)),
      risk: Math.random() > 0.6 ? 'MEDIUM' : 'LOW',
      potential: parseFloat((88 + Math.random() * 11).toFixed(2)),
      embedUrl: `https://maps.google.com/maps?q=${randomLat},${randomLng}&t=k&z=13&output=embed`
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    setCurrentMapUrl(newLog.embedUrl);
    setSelectedNode(newLog);
    setNamaPerusahaan('');
    setEmailResmi('');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-300 font-mono p-4 flex flex-col justify-between relative overflow-hidden select-none text-[12px]">
      
      {/* ================= HEADER CONTROL PANEL ================= */}
      <header className="bg-[#18181b]/90 border border-slate-800 rounded-xl p-4 flex justify-between items-center mb-3 backdrop-blur-xl shadow-2xl z-20 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#6366f1]/10 rounded-lg border border-[#6366f1]/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Radio className="w-5 h-5 text-[#6366f1] animate-pulse" />
          </div>
          <div>
            <h1 className="font-black tracking-widest text-slate-100 uppercase text-sm bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">QUANTUM AI GEOSPATIAL COMMAND CENTER</h1>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">Sesa Infrastructure Node // Global Multi-Spectral Tracking System</p>
          </div>
        </div>
        <div className="flex items-center gap-3 font-bold">
          <span className="text-emerald-400 bg-emerald-950/30 border border-emerald-900 px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> GOOGLE EARTH SATELLITE ENGINE ACTIVE
          </span>
        </div>
      </header>

      {/* ================= MIDDLE MATRIX LAYOUT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-grow mb-3 z-20 relative">
        
        {/* PANEL CONSOLE KIRI */}
        <div className="lg:col-span-3 bg-[#18181b]/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between backdrop-blur-xl shadow-2xl">
          <div>
            <div className="flex justify-between text-[11px] font-bold text-slate-500 border-b border-slate-800/60 pb-3 mb-4">
              <span className="text-cyan-400">PROJECTION:<br/>REALTIME SAT</span>
              <span className="text-right">ACCELERATION:<br/>HARDWARE 60FPS</span>
            </div>

            <h2 className="font-bold text-slate-200 mb-4 flex items-center gap-2 tracking-wider text-xs">
              <PlusCircle className="w-4 h-4 text-[#6366f1]" /> CONSOLE NODE REGISTRATION
            </h2>

            <form onSubmit={handleDeployNode} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1.5 font-bold tracking-widest">Nama Node Korporasi</label>
                <input 
                  type="text"
                  value={namaPerusahaan}
                  onChange={(e) => setNamaPerusahaan(e.target.value)}
                  placeholder="e.g. Sesa Global Data" 
                  className="w-full bg-[#09090b] border border-slate-800 rounded-lg p-2.5 text-cyan-300 font-bold focus:outline-none focus:border-[#6366f1] shadow-inner"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1.5 font-bold tracking-widest">Secure Link Email</label>
                <input 
                  type="email"
                  value={emailResmi}
                  onChange={(e) => setEmailResmi(e.target.value)}
                  placeholder="operator@quantum-node.com" 
                  className="w-full bg-[#09090b] border border-slate-800 rounded-lg p-2.5 text-cyan-300 font-bold focus:outline-none focus:border-[#6366f1] shadow-inner"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1.5 font-bold tracking-widest">Architecture Category</label>
                <select 
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full bg-[#09090b] border border-slate-800 rounded-lg p-2.5 text-slate-300 font-bold focus:outline-none focus:border-[#6366f1]"
                >
                  <option>Tech Startup</option>
                  <option>Cyber Security</option>
                  <option>Cafe / Eatery</option>
                  <option>Data Storage</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#6366f1] to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-slate-950 font-black tracking-widest py-3 rounded-lg transition-all active:scale-[0.97] uppercase text-[11px] border border-[#6366f1]/40 shadow-lg"
              >
                DEPLOY VOLUMETRIC NODE
              </button>
            </form>
          </div>
        </div>

        {/* ================= HIGH-FIDELITY INTERACTIVE GOOGLE SATELLITE MAP CONTAINER ================= */}
        <div className="lg:col-span-6 bg-[#18181b]/40 border border-slate-800 rounded-xl overflow-hidden relative min-h-[420px] shadow-2xl">
          
          {/* Google Earth Photorealistic Satellite View Link */}
          <iframe 
            title="Google Earth Enterprise Live Satellite Feed"
            src={currentMapUrl}
            className="w-full h-full absolute inset-0 border-none opacity-90 shadow-2xl"
            allowFullScreen
            loading="lazy"
          ></iframe>

          {/* HI-TECH COMMAND CENTER HUD OVERLAYS */}
          <div className="absolute top-4 left-4 bg-[#09090b]/95 border border-[#6366f1]/40 text-[#6366f1] px-3 py-2 rounded-lg font-black text-[10px] pointer-events-none shadow-xl backdrop-blur-md flex items-center gap-2 tracking-widest z-10 animate-pulse">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> 🛰️ SPECTRAL GOOGLE EARTH HUD: LIVE STREAM
          </div>
          <div className="absolute bottom-4 right-4 bg-[#09090b]/90 border border-slate-800 text-slate-500 px-3 py-1.5 rounded-md font-mono text-[9px] pointer-events-none backdrop-blur-sm tracking-widest z-10">
            FREE ACCESS KEY ACTIVE // ZERO RATE-LIMIT
          </div>
        </div>

        {/* PANEL METRIKS KANAN */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="bg-[#18181b]/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
            <h3 className="text-[11px] font-black text-amber-500 mb-3 flex items-center gap-1.5 tracking-widest uppercase">
              <TrendingUp className="w-4 h-4" /> ● BINANCE HUB REALTIME VALUE
            </h3>
            <div className="flex justify-between items-baseline bg-[#09090b] border border-slate-800 p-3 rounded-lg">
              <span className="text-slate-500 font-black tracking-wider text-[11px]">SOL / USDT</span>
              <span className="text-xl font-black text-amber-400 bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">$141.76</span>
            </div>
          </div>

          <div className="bg-[#18181b]/90 border border-slate-800 rounded-xl p-4 flex-grow shadow-2xl backdrop-blur-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                <h3 className="text-[11px] font-black text-[#6366f1] tracking-widest uppercase flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> ● NODE MONITORING TARGET
                </h3>
                <span className="text-[9px] bg-indigo-950 text-[#6366f1] border border-indigo-800 px-2 py-0.5 rounded font-black tracking-widest">ACTIVE</span>
              </div>
              
              <AnimatePresence mode="wait">
                {selectedNode && (
                  <motion.div 
                    key={selectedNode.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-3 text-[11px]"
                  >
                    <div className="bg-[#09090b] border border-slate-800 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between"><span className="text-slate-500 font-bold">NODE LABELS:</span><span className="text-slate-100 font-black">{selectedNode.label}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500 font-bold">COORDINATES:</span><span className="text-cyan-400 font-bold font-mono">{selectedNode.coord}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500 font-bold">INFRASTRUCTURE:</span><span className="text-slate-300 font-bold uppercase">{selectedNode.kategori}</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                      <div className="bg-[#09090b] border border-slate-800 p-2 rounded-md">
                        <span className="text-slate-500 block mb-0.5">AI CONFIDENCE SCORE</span>
                        <span className="text-emerald-400 text-xs font-black">{selectedNode.confidence}%</span>
                      </div>
                      <div className="bg-[#09090b] border border-slate-800 p-2 rounded-md">
                        <span className="text-slate-500 block mb-0.5">RISK INDEX VALUE</span>
                        <span className="text-[#6366f1] text-xs font-black">{selectedNode.potential}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-[#09090b] border border-slate-800 rounded-lg p-3 font-mono text-[10px] mt-4 flex items-center justify-between">
              <span className="text-slate-500 font-black uppercase">// MATRIX TELEMETRY LOG</span>
              <span className="text-emerald-400 font-black uppercase tracking-widest flex items-center gap-1">🟢 DATA INTEGRITY SECURE</span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= LOG VIEWER TABLE MATRIX ================= */}
      <footer className="bg-[#18181b]/95 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-xl z-20 relative">
        <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-3">
          <h3 className="text-[11px] font-black text-[#6366f1] tracking-widest uppercase flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#6366f1]" /> MATRIX EVENT LOGS (GLOBAL INFRASTRUCTURE STREAM)
          </h3>
          <button className="bg-[#27272a] hover:bg-slate-700 text-[10px] font-bold border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300">
            EXPORT DATA LAYER
          </button>
        </div>

        <div className="overflow-x-auto max-h-[140px] overflow-y-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider sticky top-0 bg-[#18181b] z-10 pb-2">
                <th className="pb-2 pl-2">Timestamp</th>
                <th className="pb-2">Enterprise Identity</th>
                <th className="pb-2">Coordinates Location Matrix (Click to Focus)</th>
                <th className="pb-2 text-center">Risk Analysis</th>
                <th className="pb-2 text-right pr-2">Data Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-bold text-slate-300">
              {logs.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => handleFocusNode(log)}
                  className={`hover:bg-[#6366f1]/5 transition-all cursor-pointer ${selectedNode?.id === log.id ? 'bg-[#6366f1]/10 border-l-2 border-[#6366f1]' : ''}`}
                >
                  <td className="py-2.5 pl-2 text-slate-500">{log.time}</td>
                  <td className="text-cyan-400 font-black">{log.label}</td>
                  <td className="text-slate-400 font-mono flex items-center gap-2 py-2.5">
                    <span className="text-[#6366f1] text-sm animate-pulse">🛰️</span> {log.coord} — <span className="text-slate-600 uppercase text-[10px] font-black">{log.kategori}</span>
                  </td>
                  <td className="py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-widest ${log.risk === 'LOW' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : log.risk === 'MEDIUM' ? 'bg-amber-950 text-amber-400 border border-amber-900' : 'bg-rose-950 text-rose-400 border border-rose-900'}`}>
                      {log.risk}
                    </span>
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