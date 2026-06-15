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
      embedUrl: "https://maps.google.com/maps?q=-8.6740,115.2460&t=k&z=16&output=embed" // Kunci zoom tinggi fokus Plaza Renon
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
      embedUrl: "https://maps.google.com/maps?q=3.1390,101.6869&t=k&z=15&output=embed"
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
      embedUrl: "https://maps.google.com/maps?q=-6.3149,143.9555&t=k&z=14&output=embed"
    }
  ]);

  const [currentMapUrl, setCurrentMapUrl] = useState<string>(logs[0].embedUrl);
  const [selectedNode, setSelectedNode] = useState<NodeLog | null>(logs[0]);

  const handleFocusNode = (node: NodeLog) => {
    setSelectedNode(node);
    setCurrentMapUrl(node.embedUrl);
  };

  const handleExportData = () => {
    if (logs.length === 0) return alert('🚨 EXPORT DENIED: NO DATA AVAILABLE.');
    let csvContent = "ID SECURITY;TIMESTAMP;ENTERPRISE IDENTITY;COORDINATES MATRIC;INFRASTRUCTURE CATEGORY;AI CONFIDENCE SCORE;POTENTIAL INDEX;DATA INTEGRITY\n";
    logs.forEach((node) => {
      csvContent += `#AF045-X8C0${node.id};${node.time};${node.label};"${node.coord}";${node.kategori};${node.confidence}%;${node.potential};${node.integrity}\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SESA_SPATIAL_LOGS_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeployNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaPerusahaan || !emailResmi) return alert('🚨 CRITICAL ACCESS: PARAMETERS INCOMPLETE.');

    const randomLat = (-2.6617 + (Math.random() - 0.5) * 4).toFixed(4);
    const randomLng = (115.2460 + (Math.random() - 0.5) * 8).toFixed(4);
    const generatedEmbedUrl = `https://maps.google.com/maps?q=${randomLat},${randomLng}&t=k&z=15&output=embed`;

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
      embedUrl: generatedEmbedUrl
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    setCurrentMapUrl(generatedEmbedUrl);
    setSelectedNode(newLog);
    setNamaPerusahaan('');
    setEmailResmi('');
  };

  return (
    // PILLAR 2: DEEP OBSIDIAN VOID REFACTOR (#030303) WITH CONTRAST LIGHT CATCH
    <div className="w-full h-screen bg-[#030303] text-zinc-100 font-mono p-4 flex flex-col justify-between relative overflow-y-auto select-none text-[11px] antialiased tracking-tight">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#27272a_0%,#030303_85%)] pointer-events-none z-0"></div>
      
      {/* ================= HEADER CONTROL CENTER (HIGH VISIBILITY EMERALD GLOW) ================= */}
      <header className="backdrop-blur-xl bg-zinc-950/75 border-[1.5px] border-zinc-800 rounded-xl p-4 flex justify-between items-center mb-3 shadow-[0_15px_50px_rgba(0,0,0,1)] z-20 relative flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-500/10 rounded-lg border-2 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
          </div>
          <div>
            {/* PILLAR 1: HIGH DEFINITION FROST WHITE HEADERS */}
            <h1 className="font-bold tracking-tighter text-white uppercase text-base font-sans drop-shadow-[0_2px_4px_rgba(255,255,255,0.15)]">QUANTUM AI GEOSPATIAL COMMAND CENTER</h1>
            <p className="text-[10px] text-zinc-400 uppercase font-black tracking-[0.25em] mt-0.5">SESA INFRASTRUCTURE CORE NET // REALTIME CONTROL FEED</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* PILLAR 2: PURE LIGHT SPECTRAL STATUS EMERALD GREEN */}
          <span className="text-[#10B981] bg-emerald-950/40 border-2 border-[#10B981]/60 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.1em] flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_10px_#10b981] animate-ping"></span> GOOGLE_EARTH_LIVE_STREAMING
          </span>
        </div>
      </header>

      {/* ================= MONITORING INTERFACE PANELS (GLOSSY TRANSLUCENT OBSIDIAN) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-grow mb-3 z-20 relative min-h-0">
        
        {/* PANEL CONSOLE KIRI */}
        <div className="lg:col-span-3 backdrop-blur-xl bg-zinc-950/75 border-[1.5px] border-zinc-800/90 rounded-xl p-5 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-y-auto">
          <div>
            <div className="flex justify-between text-[9px] font-bold text-zinc-400 border-b-2 border-zinc-800 pb-3 mb-4 tracking-[0.15em]">
              <span className="text-zinc-300">PROJECTION: TRANS_MAPS</span>
              <span className="text-right text-zinc-300">ACCEL: HARDWARE_60_FPS</span>
            </div>

            <h2 className="font-bold text-white mb-5 flex items-center gap-2 tracking-[0.2em] text-[11px] uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)]">
              <PlusCircle className="w-4 h-4 text-indigo-400" /> CONSOLE NODE REGISTRATION
            </h2>

            <form onSubmit={handleDeployNode} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase text-zinc-300 mb-1 font-bold tracking-[0.2em]">Nama Node Korporasi</label>
                {/* PILLAR 1: PLATINUM SILVER VALUE & ZINC PLACEHOLDER */}
                <input 
                  type="text"
                  value={namaPerusahaan}
                  onChange={(e) => setNamaPerusahaan(e.target.value)}
                  placeholder="ENTER NODE IDENTITY LABELS" 
                  className="w-full bg-zinc-900/50 border-b-2 border-zinc-700 text-white font-bold p-2 text-[11px] focus:outline-none focus:border-indigo-400 transition-all duration-300 placeholder:text-zinc-500 uppercase tracking-wider shadow-inner"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-zinc-300 mb-1 font-bold tracking-[0.2em]">Secure Link Email</label>
                <input 
                  type="email"
                  value={emailResmi}
                  onChange={(e) => setEmailResmi(e.target.value)}
                  placeholder="ENTER SECURE SECURITY PROTOCOL" 
                  className="w-full bg-zinc-900/50 border-b-2 border-zinc-700 text-white font-bold p-2 text-[11px] focus:outline-none focus:border-indigo-400 transition-all duration-300 placeholder:text-zinc-500 shadow-inner"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-zinc-300 mb-1.5 font-bold tracking-[0.2em]">Architecture Category</label>
                <select 
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full bg-zinc-900 border-2 border-zinc-700 rounded-lg p-2.5 text-zinc-100 font-bold focus:outline-none focus:border-indigo-400 text-[10px] tracking-wider uppercase shadow-md"
                >
                  <option>Tech Startup</option>
                  <option>Cyber Security</option>
                  <option>Cafe / Eatery</option>
                  <option>Data Storage</option>
                </select>
              </div>

              {/* PILLAR 2: MULTI-SPECTRAL GRADIENT INTERACTIVE BUTTON */}
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 border-2 border-white/20 text-white font-bold tracking-[0.25em] py-4 rounded-lg transition-all duration-300 uppercase text-[11px] hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]"
              >
                DEPLOY VOLUMETRIC NODE
              </button>
            </form>
          </div>
        </div>

        {/* ================= PILLAR 3: MAP CONTAINER BORDER & SOLID OBSIDIAN HUD OVERLAYS ================= */}
        <div className="lg:col-span-6 bg-[#030303] border-2 border-zinc-700/90 rounded-xl overflow-hidden relative min-h-[420px] shadow-[0_0_40px_rgba(99,102,241,0.25)] flex items-center justify-center">
          <iframe 
            title="Google Earth Live Map Component"
            src={currentMapUrl}
            className="w-full h-full absolute inset-0 border-none contrast-[1.05] brightness-[0.85]"
            allowFullScreen
            loading="lazy"
          ></iframe>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/20 via-transparent to-[#030303]/10 pointer-events-none z-10"></div>

          {/* PILLAR 3: SOLID OBSIDIAN HUD BADGE FOR 100% DAYLIGHT READABILITY */}
          <div className="absolute top-4 left-4 backdrop-blur-xl bg-zinc-950/95 border-2 border-zinc-700 text-white px-3 py-2 rounded-lg font-black text-[10px] pointer-events-none shadow-2xl flex items-center gap-2 tracking-[0.2em] z-10">
            <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> SPECTRAL_GOOGLE_EARTH_FEED: LIVE
          </div>
          <div className="absolute bottom-4 right-4 backdrop-blur-xl bg-zinc-950/95 border border-zinc-700 text-zinc-400 px-3 py-1.5 rounded-md font-mono text-[9px] pointer-events-none tracking-[0.2em] z-10 uppercase">
            Holographic HUD // Fully Accelerated
          </div>
        </div>

        {/* PANEL METRIKS VALIDASI KANAN */}
        <div className="lg:col-span-3 flex flex-col gap-3 overflow-y-auto">
          
          {/* BINANCE HUD LINK */}
          <div className="backdrop-blur-xl bg-zinc-950/75 border-[1.5px] border-zinc-800/90 rounded-xl p-4 shadow-2xl flex-shrink-0">
            <h3 className="text-[10px] font-black text-amber-400 mb-3 flex items-center gap-1.5 tracking-[0.2em] uppercase drop-shadow">
              <TrendingUp className="w-3.5 h-3.5" /> ● BINANCE HUB SECURITY LINK
            </h3>
            <div className="flex justify-between items-center bg-zinc-900/60 border-2 border-zinc-800 p-3 rounded-lg">
              <span className="text-zinc-300 font-bold tracking-widest text-[10px]">SOL / USDT</span>
              <span className="text-xl font-black text-white font-sans drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]">$141.76</span>
            </div>
          </div>

          {/* REAL-TIME NODE METRICS SUMMARY */}
          <div className="backdrop-blur-xl bg-zinc-950/75 border-[1.5px] border-zinc-800/90 rounded-xl p-4 flex-grow shadow-2xl flex flex-col justify-between min-h-[220px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b-2 border-zinc-800/80 pb-3">
                <h3 className="text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> ● NODE REAL-TIME METRICS
                </h3>
                <span className="text-[8px] bg-indigo-950 text-indigo-300 border-2 border-indigo-500/40 px-2 py-0.5 rounded font-black tracking-widest shadow-[0_0_10px_rgba(99,102,241,0.3)]">ACTIVE</span>
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
                    <div className="bg-zinc-900/80 border-2 border-zinc-800 rounded-lg p-3 space-y-2.5 text-[11px]">
                      <div className="flex justify-between border-b border-zinc-800/40 pb-1"><span className="text-zinc-400 font-bold tracking-wider">BUSINESS_NAME:</span><span className="text-white font-black font-sans">{selectedNode.label}</span></div>
                      {/* PILLAR 2: ULTRA-SHARP ELECTRIC CYAN FOR COORDINATES CODES */}
                      <div className="flex justify-between border-b border-zinc-800/40 pb-1"><span className="text-zinc-400 font-bold tracking-wider">COORDINATES:</span><span className="text-[#06B6D4] font-black font-mono tracking-wide drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">{selectedNode.coord}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-400 font-bold tracking-wider">INFRA_TIER:</span><span className="text-zinc-200 font-black uppercase">{selectedNode.kategori}</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                      <div className="bg-zinc-900/60 border-2 border-zinc-800 p-2.5 rounded-lg">
                        <span className="text-zinc-400 block mb-1 tracking-wider uppercase">AI Confidence</span>
                        <span className="text-emerald-400 font-black text-sm font-sans drop-shadow-[0_0_6px_rgba(16,185,129,0.2)]">{selectedNode.confidence}%</span>
                      </div>
                      <div className="bg-zinc-900/60 border-2 border-zinc-800 p-2.5 rounded-lg">
                        <span className="text-zinc-400 block mb-1 tracking-wider uppercase">Potential Value</span>
                        <span className="text-indigo-400 font-black text-sm font-sans drop-shadow-[0_0_6px_rgba(99,102,241,0.2)]">{selectedNode.potential}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-zinc-900/60 border-2 border-zinc-800 rounded-lg p-2.5 font-mono text-[10px] mt-4 flex items-center justify-between tracking-wide shadow-inner">
              <span className="text-[#10b981] font-black uppercase tracking-widest flex items-center gap-1.5 drop-shadow">
                <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse"></span> SECURE LOCK STATUS
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ================= COMPONENT 4: PILLAR 4: TABLE ROW VISIBILITY LIGHT-CATCH HOVER ================= */}
      <footer className="backdrop-blur-xl bg-zinc-950/75 border-[1.5px] border-zinc-800 rounded-xl p-4 shadow-[0_-15px_50px_rgba(0,0,0,0.9)] z-20 relative flex-shrink-0">
        <div className="flex justify-between items-center mb-3 border-b-2 border-zinc-800 pb-3">
          <h3 className="text-[10px] font-black text-indigo-400 tracking-[0.2em] uppercase flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-500" /> MATRIX EVENT LOGS (INTEGRATED DATA MATRIX REPOSITORY)
          </h3>
          <button 
            onClick={handleExportData}
            className="bg-zinc-900/80 hover:bg-zinc-800 text-[10px] font-bold border-2 border-zinc-700 px-4 py-2 rounded-lg flex items-center gap-1.5 text-zinc-200 hover:text-white hover:border-indigo-400 transition-all tracking-wider uppercase active:scale-95 shadow-md"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" /> EXPORT SPATIAL LAYER (.CSV)
          </button>
        </div>

        <div className="overflow-x-auto max-h-[130px] overflow-y-auto">
          <table className="w-full text-left border-collapse text-[11px] font-mono">
            <thead>
              <tr className="border-b-2 border-zinc-800 text-zinc-400 font-black uppercase tracking-[0.15em] sticky top-0 bg-zinc-950 backdrop-blur-md z-10 pb-2">
                <th className="pb-2尊 pl-2">Timestamp</th>
                <th className="pb-2">Enterprise identity identifier</th>
                <th className="pb-2">Coordinates Location Matrix (selector click)</th>
                <th className="pb-2 text-center">Threat Risk Analysis</th>
                <th className="pb-2 text-right pr-2">Data Integrity Vector</th>
              </tr>
            </thead>
            {/* PILLAR 4: IMPLEMENT LIGHT-CATCH HOVER GRADIENT & ZEBRAPATTERN */}
            <tbody className="divide-y divide-zinc-800/40 font-bold text-zinc-300">
              {logs.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => handleFocusNode(log)}
                  className={`transition-all duration-150 cursor-pointer odd:bg-zinc-900/20 even:bg-transparent border-l-2 border-transparent hover:bg-zinc-900/70 hover:text-white hover:border-indigo-400/60 ${selectedNode?.id === log.id ? 'bg-indigo-950/30 border-l-4 border-indigo-400 text-white shadow-inner' : ''}`}
                >
                  <td className="py-2.5 text-zinc-400 font-sans pl-2">{log.time}</td>
                  <td className="text-white font-black tracking-wide uppercase">{log.label}</td>
                  {/* TEXT CYAN ON GEOGRAPHIC FIELD LINK */}
                  <td className="text-[#06B6D4] font-mono flex items-center gap-2 py-2.5 font-bold tracking-wide">
                    <span className="text-indigo-400 opacity-80 text-sm animate-pulse">🌐</span> {log.coord} — <span className="text-zinc-400 uppercase text-[9px] font-black tracking-wider">{log.kategori}</span>
                  </td>
                  <td className="py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-[0.15em] ${log.risk === 'LOW' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/50' : log.risk === 'MEDIUM' ? 'bg-amber-950/60 text-amber-300 border border-amber-500/50' : 'bg-rose-950/60 text-rose-300 border border-rose-500/50'}`}>
                      {log.risk}
                    </span>
                  </td>
                  <td className="py-2.5 text-right pr-2 text-emerald-400 font-sans">{log.integrity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </footer>

    </div>
  );
}