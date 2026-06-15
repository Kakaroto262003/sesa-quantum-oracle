import React, { useState } from 'react';
import { Shield, Cpu, Terminal, PlusCircle, Download, Radio, Zap, Target, TrendingUp } from 'lucide-react';
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
  embedUrl: string;
}

export default function App() {
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [emailResmi, setEmailResmi] = useState('');
  const [kategori, setKategori] = useState('Tech Startup');
  
  // Perbaikan URL Google Maps: Menggunakan format standar (?q=loc&t=k) yang dijamin stabil, gratis, dan anti-blank
  const [logs, setLogs] = useState<NodeLog[]>([
    { 
      id: '1', 
      time: '20:52:12', 
      label: 'SESA CORE AI HUB', 
      coord: '[-8.6740, 115.2460]', 
      kategori: 'Tech Startup', 
      integrity: '99.8%', 
      confidence: 99.12, 
      risk: 'LOW', 
      potential: 98.4,
      embedUrl: "https://maps.google.com/maps?q=-8.6740,115.2460&t=k&z=15&output=embed"
    },
    { 
      id: '2', 
      time: '20:48:05', 
      label: 'MALAYSIA EDGE NODE', 
      coord: '[3.1390, 101.6869]', 
      kategori: 'Cyber Security', 
      integrity: '98.2%', 
      confidence: 97.50, 
      risk: 'MEDIUM', 
      potential: 88.7,
      embedUrl: "https://maps.google.com/maps?q=3.1390,101.6869&t=k&z=14&output=embed"
    },
    { 
      id: '3', 
      time: '20:41:19', 
      label: 'PAPUA CLUSTER NODE', 
      coord: '[-6.3149, 143.9555]', 
      kategori: 'Data Storage', 
      integrity: '92.4%', 
      confidence: 89.10, 
      risk: 'HIGH', 
      potential: 94.5,
      embedUrl: "https://maps.google.com/maps?q=-6.3149,143.9555&t=k&z=13&output=embed"
    }
  ]);

  const [currentMapUrl, setCurrentMapUrl] = useState<string>(logs[0].embedUrl);
  const [selectedNode, setSelectedNode] = useState<NodeLog | null>(logs[0]);

  const handleFocusNode = (node: NodeLog) => {
    setSelectedNode(node);
    setCurrentMapUrl(node.embedUrl);
  };

  const handleDeployNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaPerusahaan || !emailResmi) return alert('🚨 CRITICAL ACCESS: NODE CORE REQUIRED PARAMETERS NOT PROCESSED');

    const randomLat = (-2.6617 + (Math.random() - 0.5) * 4).toFixed(4);
    const randomLng = (115.2460 + (Math.random() - 0.5) * 8).toFixed(4);

    const newLog: NodeLog = {
      id: String(logs.length + 1),
      time: new Date().toLocaleTimeString(),
      label: namaPerusahaan.toUpperCase(),
      coord: `[${randomLat}, ${randomLng}]`,
      kategori: kategori,
      integrity: '99.5%',
      confidence: parseFloat((92 + Math.random() * 7).toFixed(2)),
      risk: Math.random() > 0.6 ? 'MEDIUM' : 'LOW',
      potential: parseFloat((88 + Math.random() * 11).toFixed(2)),
      embedUrl: `https://maps.google.com/maps?q=${randomLat},${randomLng}&t=k&z=14&output=embed`
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    setCurrentMapUrl(newLog.embedUrl);
    setSelectedNode(newLog);
    setNamaPerusahaan('');
    setEmailResmi('');
  };

  return (
    <div className="min-w-screen min-h-screen bg-[#030303] text-zinc-400 font-mono p-4 flex flex-col justify-between relative overflow-hidden select-none text-[11px] antialiased tracking-tight">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1c1917_0%,#030303_85%)] pointer-events-none z-0"></div>
      
      {/* ================= TOPBAR HEADER ================= */}
      <header className="backdrop-blur-xl bg-zinc-950/20 border-[0.5px] border-zinc-100/10 rounded-xl p-4 flex justify-between items-center mb-3 shadow-[0_12px_40px_rgba(0,0,0,0.9)] z-20 relative">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-500/5 rounded border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold tracking-tighter text-zinc-100 uppercase text-sm font-sans">QUANTUM AI GEOSPATIAL COMMAND CENTER</h1>
            {/* PERBAIKAN: Garis dua (//) di header sudah dihapus total */}
            <p className="text-[9px] text-zinc-500 uppercase font-black tracking-[0.25em] mt-0.5">SESA INFRASTRUCTURE CORE NET</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 bg-emerald-950/20 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] flex items-center gap-2 shadow-[0_0_12px_rgba(16,185,129,0.1)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span> GOOGLE_EARTH_LIVE_STREAMING
          </span>
        </div>
      </header>

      {/* ================= MONITORING INTERFACE PANELS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-grow mb-3 z-20 relative">
        
        {/* PANEL CONSOLE KIRI */}
        <div className="lg:col-span-3 backdrop-blur-xl bg-zinc-950/30 border-[0.5px] border-zinc-100/10 rounded-xl p-5 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div>
            <div className="flex justify-between text-[9px] font-bold text-zinc-600 border-b border-zinc-900/60 pb-3 mb-4 tracking-[0.15em]">
              <span>PROJECTION: TRANS_MAPS</span>
              <span className="text-right">ACCEL: HARDWARE_60_FPS</span>
            </div>

            <h2 className="font-bold text-zinc-300 mb-5 flex items-center gap-2 tracking-[0.2em] text-[10px] uppercase">
              <PlusCircle className="w-3.5 h-3.5 text-indigo-400" /> CONSOLE NODE REGISTRATION
            </h2>

            <form onSubmit={handleDeployNode} className="space-y-6">
              <div>
                <label className="block text-[9px] uppercase text-zinc-500 mb-1 font-bold tracking-[0.2em]">Nama Node Korporasi</label>
                <input 
                  type="text"
                  value={namaPerusahaan}
                  onChange={(e) => setNamaPerusahaan(e.target.value)}
                  placeholder="ENTER NODE LABELS" 
                  className="w-full bg-transparent border-b border-zinc-800 text-zinc-100 font-bold p-1 text-[11px] focus:outline-none focus:border-indigo-500/80 transition-all duration-300 placeholder:text-zinc-800 uppercase tracking-wider"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase text-zinc-500 mb-1 font-bold tracking-[0.2em]">Secure Link Email</label>
                <input 
                  type="email"
                  value={emailResmi}
                  onChange={(e) => setEmailResmi(e.target.value)}
                  placeholder="ENTER ACCESS PROTOCOL" 
                  className="w-full bg-transparent border-b border-zinc-800 text-zinc-100 font-bold p-1 text-[11px] focus:outline-none focus:border-indigo-500/80 transition-all duration-300 placeholder:text-zinc-800"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase text-zinc-500 mb-1.5 font-bold tracking-[0.2em]">Architecture Category</label>
                <select 
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-900 rounded p-2.5 text-zinc-400 font-bold focus:outline-none focus:border-indigo-500/40 text-[10px] tracking-wider uppercase"
                >
                  <option>Tech Startup</option>
                  <option>Cyber Security</option>
                  <option>Cafe / Eatery</option>
                  <option>Data Storage</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600/10 to-violet-600/10 border border-indigo-500/30 text-indigo-300 hover:text-zinc-100 font-black tracking-[0.25em] py-3.5 rounded-lg transition-all duration-500 uppercase text-[10px] hover:from-indigo-600/25 hover:to-violet-600/25 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] border-t-zinc-700/50"
              >
                DEPLOY VOLUMETRIC NODE
              </button>
            </form>
          </div>
        </div>

        {/* ================= HIGH-FIDELITY GOOGLE SATELLITE PETA CENTER CONTAINER ================= */}
        <div className="lg:col-span-6 bg-[#030303] border-[0.5px] border-zinc-100/10 rounded-xl overflow-hidden relative min-h-[420px] shadow-2xl flex items-center justify-center">
          
          {/* Iframe Feed Satelit Google yang sudah diperbaiki total */}
          <iframe 
            title="Google Earth Live Map Component"
            src={currentMapUrl}
            className="w-full h-full absolute inset-0 border-none contrast-[1.05] brightness-[0.8]"
            allowFullScreen
            loading="lazy"
          ></iframe>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/30 via-transparent to-[#030303]/10 pointer-events-none z-10"></div>

          <div className="absolute top-4 left-4 backdrop-blur-md bg-zinc-950/80 border border-zinc-100/10 text-zinc-300 px-3 py-1.5 rounded font-black text-[9px] pointer-events-none shadow-xl flex items-center gap-2 tracking-[0.2em] z-10">
            <Zap className="w-3 h-3 text-indigo-400 animate-pulse" /> SPECTRAL_GOOGLE_EARTH_FEED: LIVE
          </div>
          <div className="absolute bottom-4 right-4 backdrop-blur-md bg-zinc-950/70 border border-zinc-900 text-zinc-600 px-3 py-1 rounded font-mono text-[8px] pointer-events-none tracking-[0.2em] z-10 uppercase">
            Holographic HUD // Fully Accelerated
          </div>
        </div>

        {/* PANEL METRIKS VALIDASI KANAN */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          
          {/* BINANCE HUD ROW LINK */}
          <div className="backdrop-blur-xl bg-zinc-950/30 border-[0.5px] border-zinc-100/10 rounded-xl p-4 shadow-2xl">
            <h3 className="text-[9px] font-black text-amber-500/80 mb-3 flex items-center gap-1.5 tracking-[0.2em] uppercase">
              <TrendingUp className="w-3.5 h-3.5" /> ● BINANCE HUB SECURITY LINK
            </h3>
            <div className="flex justify-between items-center bg-zinc-950/60 border border-zinc-900/60 p-3 rounded">
              <span className="text-zinc-500 font-bold tracking-widest text-[10px]">SOL / USDT</span>
              <span className="text-lg font-black text-zinc-100 bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent font-sans">$141.76</span>
            </div>
          </div>

          {/* REAL-TIME NODE METRICS SUMMARY */}
          <div className="backdrop-blur-xl bg-zinc-950/30 border-[0.5px] border-zinc-100/10 rounded-xl p-4 flex-grow shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                <h3 className="text-[9px] font-black text-indigo-400 tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> ● NODE REAL-TIME METRICS
                </h3>
                <span className="text-[8px] bg-indigo-950/30 text-indigo-400 border border-indigo-900/40 px-2 py-0.5 rounded font-black tracking-widest">ACTIVE</span>
              </div>
              
              <AnimatePresence mode="wait">
                {selectedNode && (
                  <motion.div 
                    key={selectedNode.id}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    className="space-y-3"
                  >
                    <div className="bg-zinc-950/80 border border-zinc-900/80 rounded p-3 space-y-2 text-[10px]">
                      <div className="flex justify-between"><span className="text-zinc-600 font-bold tracking-wider">BUSINESS_NAME:</span><span className="text-zinc-100 font-black font-sans">{selectedNode.label}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-600 font-bold tracking-wider">COORDINATES:</span><span className="text-indigo-400 font-bold font-mono tracking-wide">{selectedNode.coord}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-600 font-bold tracking-wider">INFRA_TIER:</span><span className="text-zinc-400 font-bold uppercase">{selectedNode.kategori}</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-[9px] font-bold">
                      <div className="bg-zinc-950/40 border border-zinc-900 p-2.5 rounded">
                        <span className="text-zinc-600 block mb-0.5 tracking-wider uppercase">AI Confidence</span>
                        <span className="text-emerald-400 font-black text-xs font-sans">{selectedNode.confidence}%</span>
                      </div>
                      <div className="bg-zinc-950/40 border border-zinc-900 p-2.5 rounded">
                        <span className="text-zinc-600 block mb-0.5 tracking-wider uppercase">Potential Value</span>
                        <span className="text-indigo-400 font-black text-xs font-sans">{selectedNode.potential}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PERBAIKAN: Garis dua (//) di panel kanan bawah ini sudah dibersihkan total */}
            <div className="bg-zinc-950/50 border border-zinc-900 rounded p-2.5 font-mono text-[9px] mt-4 flex items-center justify-between tracking-wide">
              <span className="text-[#10b981] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span> SECURE LOCK
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= COMPONENT 3: EVENT LIVE LOG VIEWER TABLE ================= */}
      <footer className="backdrop-blur-xl bg-zinc-950/30 border-[0.5px] border-zinc-100/10 rounded-xl p-4 shadow-2xl z-20 relative">
        <div className="flex justify-between items-center mb-3 border-b border-zinc-900 pb-3">
          <h3 className="text-[9px] font-black text-indigo-400 tracking-[0.2em] uppercase flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-500" /> MATRIX EVENT LOGS (INTEGRATED DATA MATRIX REPOSITORY)
          </h3>
          <button className="bg-zinc-900/60 hover:bg-zinc-800 text-[9px] font-bold border border-zinc-800 px-3 py-1.5 rounded flex items-center gap-1.5 text-zinc-400 hover:text-zinc-200 transition-all tracking-wider uppercase">
            <Download className="w-3 h-3 text-indigo-400" /> EXPORT SPATIAL LAYER
          </button>
        </div>

        <div className="overflow-x-auto max-h-[130px] overflow-y-auto">
          <table className="w-full text-left border-collapse text-[10px] font-mono">
            <thead>
              <tr className="border-b border-zinc-900 text-zinc-600 font-black uppercase tracking-[0.15em] sticky top-0 bg-[#030303]/90 backdrop-blur-md z-10 pb-2">
                <th className="pb-2 pl-2">Timestamp</th>
                <th className="pb-2">Enterprise identity identifier</th>
                <th className="pb-2">Coordinates Location Matrix (selector click)</th>
                <th className="pb-2 text-center">Threat Risk Analysis</th>
                <th className="pb-2 text-right pr-2">Data Integrity Vector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/20 font-bold text-zinc-300">
              {logs.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => handleFocusNode(log)}
                  className={`transition-all duration-200 cursor-pointer odd:bg-zinc-900/10 even:bg-transparent hover:border-zinc-700/40 hover:bg-zinc-900/20 ${selectedNode?.id === log.id ? 'bg-indigo-500/5 border-l-2 border-indigo-500 text-zinc-100' : ''}`}
                >
                  <td className="py-2.5 pl-2 text-zinc-600 font-sans">{log.time}</td>
                  <td className="text-indigo-400 font-black tracking-wide">{log.label}</td>
                  <td className="text-zinc-400 font-mono flex items-center gap-2 py-2.5">
                    <span className="text-indigo-500 opacity-50 text-xs">🌐</span> {log.coord} — <span className="text-zinc-600 uppercase text-[9px] font-black tracking-wider">{log.kategori}</span>
                  </td>
                  <td className="py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-[0.15em] ${log.risk === 'LOW' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40' : log.risk === 'MEDIUM' ? 'bg-amber-950/40 text-amber-400 border border-amber-900/40' : 'bg-rose-950/40 text-rose-400 border border-rose-900/40'}`}>
                      {log.risk}
                    </span>
                  </td>
                  <td className="py-2.5 text-right pr-2 text-emerald-400/90 font-sans">{log.integrity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </footer>

    </div>
  );
}