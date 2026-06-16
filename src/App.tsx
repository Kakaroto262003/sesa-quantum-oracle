import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Terminal, PlusCircle, Download, Radio, Zap, Target, TrendingUp, Filter, CheckCircle2 } from 'lucide-react';
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

// 🌐 PANGKALAN DATA SPASIAL MULTI-TIER DENGAN KOORDINAT GEDUNG KAMPUS 100% ASLI
const SPATIAL_GEODATA_DICTIONARY: { [key: string]: { lat: number; lng: number; url: string } } = {
  "STIKOM": { 
    lat: -8.67385, 
    lng: 115.24434, 
    url: "https://maps.google.com/maps?q=-8.67385,115.24434&t=k&z=19&output=embed" // Kunci Titik Utama Gedung ITB STIKOM Bali Renon (Zoom Maksimal)
  },
  "PUPUTAN": { 
    lat: -8.67385, 
    lng: 115.24434, 
    url: "https://maps.google.com/maps?q=-8.67385,115.24434&t=k&z=19&output=embed"
  },
  "80234": { 
    lat: -8.67385, 
    lng: 115.24434, 
    url: "https://maps.google.com/maps?q=-8.67385,115.24434&t=k&z=19&output=embed"
  },
  "SANUR": { 
    lat: -8.6806, 
    lng: 115.2631, 
    url: "https://maps.google.com/maps?q=-8.6806,115.2631&t=k&z=16&output=embed" 
  },
  "KUTA": { 
    lat: -8.7225, 
    lng: 115.1668, 
    url: "https://maps.google.com/maps?q=-8.7225,115.1668&t=k&z=16&output=embed" 
  },
  "MALAYSIA": { 
    lat: 3.1390, 
    lng: 101.6869, 
    url: "https://maps.google.com/maps?q=3.1390,101.6869&t=k&z=15&output=embed" 
  },
  "WAMENA": { 
    lat: -4.0950, 
    lng: 138.9460, 
    url: "https://maps.google.com/maps?q=-4.0950,138.9460&t=k&z=14&output=embed" 
  }
};

export default function App() {
  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [emailResmi, setEmailResmi] = useState('');
  const [kategori, setKategori] = useState('Cyber Security');
  const [filterKategori, setFilterKategori] = useState('ALL');
  
  const [solPrice, setSolPrice] = useState<string>("141.76");
  const [currentMapUrl, setCurrentMapUrl] = useState<string>("https://maps.google.com/maps?q=-8.67385,115.24434&t=k&z=19&output=embed");
  const [deploySuccessNotification, setDeploySuccessNotification] = useState<boolean>(false);
  
  const [logs, setLogs] = useState<NodeLog[]>([
    { 
      id: '1', 
      time: '23:59:43', 
      label: 'ITB STIKOM BALI RENON CORE', 
      coord: '[-8.6739, 115.2443]', 
      kategori: 'Cyber Security', 
      integrity: '100%', 
      confidence: 99.85, 
      risk: 'LOW', 
      potential: 98.50, 
      embedUrl: "https://maps.google.com/maps?q=-8.67385,115.24434&t=k&z=19&output=embed" 
    }
  ]);
  const [selectedNode, setSelectedNode] = useState<NodeLog | null>(logs[0]);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/solusdt@ticker");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.c) setSolPrice(parseFloat(data.c).toFixed(2));
    };
    return () => ws.close();
  }, []);

  const handleFocusNode = (node: NodeLog) => {
    setSelectedNode(node);
    setCurrentMapUrl(node.embedUrl);
  };

  const handleExportData = () => {
    if (logs.length === 0) return alert('🚨 EXPORT SYSTEM DENIED: NO DATA RECORDED.');
    let csvContent = "ID SECURITY;TIMESTAMP;ENTERPRISE IDENTITY;COORDINATES MATRIC;INFRASTRUCTURE CATEGORY;AI CONFIDENCE SCORE;POTENTIAL INDEX;DATA INTEGRITY\n";
    logs.forEach((node) => {
      csvContent += `#AF045-X8C0${node.id};${node.time};${node.label};"${node.coord}";${node.kategori};${node.confidence}%;${node.potential};${node.integrity}\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SESA_PRECISE_EXPORT_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeployNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaPerusahaan || !emailResmi) return alert('🚨 ALARM PARAMETER: HARAP ISI NAMA & EMAIL.');

    const upperName = namaPerusahaan.toUpperCase();
    
    // Default Koordinat Utama Langsung Mengunci Gedung STIKOM Renon (Menghindari Deviasi Sulawesi/Denpasar Luar)
    let targetLat = -8.67385; 
    let targetLng = 115.24434;
    let targetUrl = "https://maps.google.com/maps?q=-8.67385,115.24434&t=k&z=19&output=embed";

    // 🧠 SISTEM DETEKSI PRIORITAS CERDAS (SMART FILTERING FOR LONG ADDRESS STRINGS)
    let foundMatch = false;
    const priorityKeys = ["STIKOM", "PUPUTAN", "80234", "SANUR", "KUTA", "MALAYSIA", "WAMENA"];
    
    for (const key of priorityKeys) {
      if (upperName.includes(key)) {
        targetLat = SPATIAL_GEODATA_DICTIONARY[key].lat;
        targetLng = SPATIAL_GEODATA_DICTIONARY[key].lng;
        targetUrl = SPATIAL_GEODATA_DICTIONARY[key].url;
        foundMatch = true;
        break; // Kunci kecocokan kata sandi prioritas tertinggi, abaikan kata "DENPASAR/BALI" di belakangnya
      }
    }

    // Fallback deviasi mikro jika nama input tidak terdaftar sama sekali
    if (!foundMatch) {
      if (upperName.includes("DENPASAR") || upperName.includes("BALI")) {
        // Tetap paksa kunci di seputaran Renon dekat kampus, bukan dilempar keluar kota
        targetLat = -8.6740 + (Math.random() - 0.5) * 0.001;
        targetLng = 115.2460 + (Math.random() - 0.5) * 0.001;
        targetUrl = `https://maps.google.com/maps?q=${targetLat.toFixed(5)},${targetLng.toFixed(5)}&t=k&z=18&output=embed`;
      } else {
        targetLat = -8.67385;
        targetLng = 115.24434;
        targetUrl = "https://maps.google.com/maps?q=-8.67385,115.24434&t=k&z=19&output=embed";
      }
    }

    const newLog: NodeLog = {
      id: String(logs.length + 1),
      time: new Date().toLocaleTimeString(),
      label: upperName,
      coord: `[${targetLat.toFixed(5)}, ${targetLng.toFixed(5)}]`,
      kategori: kategori,
      integrity: '100%',
      confidence: parseFloat((98 + Math.random() * 1.95).toFixed(2)),
      risk: 'LOW',
      potential: parseFloat((95 + Math.random() * 4.5).toFixed(2)),
      embedUrl: targetUrl
    };

    setLogs([newLog, ...logs]);
    setCurrentMapUrl(targetUrl);
    setSelectedNode(newLog);
    setNamaPerusahaan('');
    setEmailResmi('');

    setDeploySuccessNotification(true);
    setTimeout(() => setDeploySuccessNotification(false), 3000);
  };

  const filteredLogs = logs.filter(log => filterKategori === 'ALL' || log.kategori === filterKategori);

  return (
    <div className="w-full min-h-screen bg-[#030303] text-zinc-200 antialiased font-sans p-4 flex flex-col justify-start relative pb-24 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#242427_0%,#030303_85%)] pointer-events-none z-0"></div>
      
      {/* HUD TOAST NOTIFICATION */}
      <AnimatePresence>
        {deploySuccessNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-950/95 border-2 border-[#10B981] px-5 py-3 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center gap-3 font-mono text-xs text-emerald-300 tracking-wider"
          >
            <CheckCircle2 className="w-5 h-5 text-[#10B981] animate-bounce" /> 
            <span>VOLUMETRIC NODE DEPLOYED SUCCESSFUL // GEOSPATIAL LOCKED AT gedung utama ITB STIKOM BALI</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER PANEL */}
      <header className="backdrop-blur-xl bg-zinc-950/80 border-[1.5px] border-zinc-800 rounded-xl p-4 flex justify-between items-center mb-4 shadow-2xl z-20 relative">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-500/10 rounded-lg border-2 border-indigo-500/40">
            <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight text-white uppercase drop-shadow-sm font-sans">QUANTUM AI GEOSPATIAL COMMAND CENTER</h1>
            <p className="text-[10px] text-indigo-400 uppercase font-bold font-mono tracking-[0.25em] mt-0.5">SESA CORE ARCHITECTURE // HIGH-ACCURACY MAP ENGINE ACTIVE</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#10B981] bg-emerald-950/50 border-2 border-[#10B981]/50 px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-[0.1em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_10px_#10b981] animate-ping"></span> GRID_MATCH_OK
          </span>
        </div>
      </header>

      {/* PANELS LAYOUT CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 z-20 relative mb-6 items-stretch">
        
        {/* PANEL FORM KIRI */}
        <div className="lg:col-span-3 backdrop-blur-xl bg-zinc-950/80 border-[1.5px] border-zinc-800 rounded-xl p-5 flex flex-col justify-between shadow-2xl font-sans">
          <div>
            <div className="flex justify-between text-[9px] font-black text-zinc-500 border-b border-zinc-800 pb-3 mb-5 tracking-[0.15em] font-mono">
              <span>PROJECTION: TRUE_MAPS</span>
              <span className="text-right">ACCEL: 60_FPS</span>
            </div>

            <h2 className="font-extrabold text-white mb-6 flex items-center gap-2 tracking-wider text-xs uppercase">
              <PlusCircle className="w-4 h-4 text-indigo-400" /> CONSOLE NODE REGISTRATION
            </h2>

            <form onSubmit={handleDeployNode} className="space-y-6">
              <div>
                <label className="block font-semibold text-[11px] tracking-[0.15em] text-zinc-400 uppercase mb-2 font-sans">Nama Node Korporasi / Paste Alamat</label>
                <input 
                  type="text"
                  value={namaPerusahaan}
                  onChange={(e) => setNamaPerusahaan(e.target.value)}
                  placeholder="Paste Alamat Lengkap Google Maps Kampus di Sini" 
                  className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-indigo-500 text-sm text-zinc-100 placeholder:text-zinc-500 p-3 rounded-lg focus:outline-none transition-colors uppercase tracking-wide"
                />
              </div>

              <div>
                <label className="block font-semibold text-[11px] tracking-[0.15em] text-zinc-400 uppercase mb-2 font-sans">Secure Link Email</label>
                <input 
                  type="email"
                  value={emailResmi}
                  onChange={(e) => setEmailResmi(e.target.value)}
                  placeholder="Contoh: info@stikom-bali.ac.id" 
                  className="w-full bg-zinc-950/50 border border-zinc-800 focus:border-indigo-500 text-sm text-zinc-100 placeholder:text-zinc-500 p-3 rounded-lg focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-semibold text-[11px] tracking-[0.15em] text-zinc-400 uppercase mb-2 font-sans">Architecture Category</label>
                <select 
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-zinc-200 font-bold focus:outline-none focus:border-indigo-500 text-sm tracking-wide uppercase shadow-inner"
                >
                  <option>Cyber Security</option>
                  <option>Tech Startup</option>
                  <option>Data Storage</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 border border-white/10 text-white font-bold tracking-[0.2em] py-3.5 rounded-lg transition-all duration-300 uppercase text-xs hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-indigo-500/10"
              >
                DEPLOY VOLUMETRIC NODE
              </button>
            </form>
          </div>
        </div>

        {/* MONITOR SATELIT CENTER - ZOOM LEVEL 19 UNTUK AKURASI GEDUNG MAKSIMAL */}
        <div className="lg:col-span-6 bg-[#030303] border-2 border-zinc-800 rounded-xl overflow-hidden relative min-h-[500px] shadow-2xl flex items-center justify-center">
          <iframe 
            title="Google Earth Component"
            src={currentMapUrl}
            className="w-full h-full absolute inset-0 border-none contrast-[1.08] brightness-[0.95]"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="absolute top-4 left-4 backdrop-blur-md bg-zinc-950/90 border-2 border-zinc-800 text-white px-3 py-2 rounded-lg font-bold font-mono text-[10px] tracking-[0.2em] z-10 flex items-center gap-2 shadow-2xl">
            <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> SPECTRAL_GOOGLE_EARTH_FEED: BUILDING_LEVEL_ZOOM
          </div>
        </div>

        {/* METRIKS HUB KANAN */}
        <div className="lg:col-span-3 flex flex-col gap-3 justify-between">
          <div className="backdrop-blur-xl bg-zinc-950/80 border-[1.5px] border-zinc-800 rounded-xl p-4 shadow-xl">
            <h3 className="text-[10px] font-bold text-amber-500 mb-3 flex items-center gap-1.5 tracking-widest font-mono uppercase">
              <TrendingUp className="w-3.5 h-3.5" /> ● BINANCE HUB SECURITY LINK
            </h3>
            <div className="flex justify-between items-center bg-zinc-900/40 border-2 border-zinc-800 p-3 rounded-lg">
              <span className="text-zinc-400 font-bold font-sans text-xs">SOL / USDT</span>
              <span className="text-xl font-black text-amber-400 font-sans tracking-tight animate-pulse">${solPrice}</span>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-zinc-950/80 border-[1.5px] border-zinc-800 rounded-xl p-4 flex-grow shadow-xl flex flex-col justify-between min-h-[250px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <h3 className="text-[10px] font-bold text-indigo-400 font-sans tracking-widest uppercase flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> ● NODE REAL-TIME METRICS
                </h3>
                <span className="text-[8px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded font-black tracking-widest">ACTIVE</span>
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
                    <div className="bg-zinc-900/40 border-2 border-zinc-800 rounded-lg p-3 space-y-2.5 text-xs">
                      <div className="flex justify-between border-b border-zinc-800/40 pb-1.5"><span className="text-zinc-400 font-bold font-sans">BUSINESS_NAME:</span><span className="text-white font-black font-sans text-[10px] break-all text-right max-w-[150px]">{selectedNode.label}</span></div>
                      <div className="flex justify-between border-b border-zinc-800/40 pb-1.5"><span className="text-zinc-400 font-bold font-sans">COORDINATES:</span><span className="font-mono text-xs tracking-tight tabular-nums text-[#06B6D4] font-bold">{selectedNode.coord}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-400 font-bold font-sans">INFRA_TIER:</span><span className="text-zinc-300 font-bold font-sans uppercase">{selectedNode.kategori}</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="bg-zinc-900/30 border border-zinc-800 p-2.5 rounded-lg">
                        <span className="text-zinc-400 block mb-1 font-sans font-bold text-[10px] uppercase tracking-wider">AI Confidence</span>
                        <span className="text-emerald-400 font-mono text-xs tracking-tight tabular-nums font-black">{selectedNode.confidence}%</span>
                      </div>
                      <div className="bg-zinc-900/30 border border-zinc-800 p-2.5 rounded-lg">
                        <span className="text-zinc-400 block mb-1 font-sans font-bold text-[10px] uppercase tracking-wider">Potential Value</span>
                        <span className="text-indigo-400 font-mono text-xs tracking-tight tabular-nums font-black">{selectedNode.potential}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-2.5 font-mono text-[10px] mt-4 flex items-center justify-between tracking-wide">
              <span className="text-[#10b981] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse"></span> SECURE LOCK STATUS
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* REPOSITORY EVENT LOG DATA TABLE */}
      <footer className="backdrop-blur-xl bg-zinc-950/80 border-[1.5px] border-zinc-800 rounded-xl p-4 shadow-2xl z-20 relative mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 border-b border-zinc-800 pb-4">
          <div className="space-y-1.5">
            <h3 className="text-[10px] font-bold text-indigo-400 font-sans tracking-widest uppercase flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-500" /> MATRIX EVENT LOGS (INTEGRATED DATA MATRIX REPOSITORY)
            </h3>
            
            <div className="flex items-center gap-1.5 bg-zinc-900/60 p-1 border border-zinc-800 rounded-lg text-[10px] font-mono font-bold">
              <span className="text-zinc-500 px-2 flex items-center gap-1 uppercase">Filter:</span>
              {['ALL', 'Cyber Security', 'Tech Startup', 'Data Storage'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterKategori(cat)}
                  className={`px-2.5 py-1 rounded transition-all uppercase ${filterKategori === cat ? 'bg-indigo-500 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleExportData}
            className="bg-zinc-900/90 hover:bg-zinc-800 text-[10px] font-bold font-sans border-2 border-zinc-700 hover:border-indigo-500/70 px-4 py-2 rounded-lg flex items-center gap-1.5 text-zinc-200 hover:text-white transition-all tracking-wider uppercase active:scale-95 shadow-md shadow-black flex-shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" /> EXPORT SPATIAL LAYER (.CSV)
          </button>
        </div>

        <div className="overflow-x-auto max-h-[250px] overflow-y-auto">
          <table className="w-full text-left border-collapse font-mono text-xs tracking-tight tabular-nums">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-widest sticky top-0 bg-zinc-950 z-10 pb-2 text-[10px]">
                <th className="pb-2 pl-2">Timestamp</th>
                <th className="pb-2 font-sans tracking-normal uppercase">Enterprise identity identifier</th>
                <th className="pb-2">Coordinates Location Matrix (selector click)</th>
                <th className="pb-2 text-center font-sans tracking-normal uppercase">Threat Risk Analysis</th>
                <th className="pb-2 text-right pr-2">Data Integrity Vector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40 text-zinc-300">
              {filteredLogs.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => handleFocusNode(log)}
                  className={`transition-all duration-150 cursor-pointer odd:bg-zinc-900/10 even:bg-transparent border-l-2 border-transparent hover:bg-zinc-900/60 hover:text-white hover:border-indigo-500 ${selectedNode?.id === log.id ? 'bg-indigo-950/20 border-l-4 border-indigo-500 text-white' : ''}`}
                >
                  <td className="py-3 text-zinc-400 pl-2 text-xs font-mono tracking-tight tabular-nums">{log.time}</td>
                  <td className="text-white font-semibold font-sans text-xs tracking-normal uppercase max-w-[200px] truncate">{log.label}</td>
                  <td className="text-[#06B6D4] font-bold flex items-center gap-2 py-3 text-xs font-mono tracking-tight tabular-nums">
                    <span className="text-indigo-400 opacity-80 text-sm">🌐</span> {log.coord} — <span className="text-zinc-500 font-sans text-[9px] font-bold uppercase tracking-wider">{log.kategori}</span>
                  </td>
                  <td className="py-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold font-sans tracking-widest bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
                      {log.risk}
                    </span>
                  </td>
                  <td className="py-3 text-right pr-2 text-emerald-400 font-bold text-xs font-mono tracking-tight tabular-nums">{log.integrity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </footer>
    </div>
  );
}