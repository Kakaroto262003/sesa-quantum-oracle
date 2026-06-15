import React, { useState, useEffect, useRef } from 'react';
import { Shield, Cpu, Terminal, Globe, Activity, PlusCircle, Download, Radio, Zap, Target, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import mapboxgl from 'mapbox-gl';

// Menggunakan Token Alternatif yang Lebih Stabil & Fresh
mapboxgl.accessToken = 'pk.eyJ1I6ImNhY2Fyb3RvMjYyMDAzIiwiYSI6ImNsc3Rna2ptYjA1YnIyam1temM3bTBwZTMifQ.vS-7V-Z046_8rX_14M5dYg';

interface NodeLog {
  id: string;
  time: string;
  label: string;
  coord: string;
  lat: number;
  lng: number;
  kategori: string;
  integrity: string;
  confidence: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  potential: number;
}

export default function App() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ [key: string]: mapboxgl.Marker }>({});

  const [namaPerusahaan, setNamaPerusahaan] = useState('');
  const [emailResmi, setEmailResmi] = useState('');
  const [kategori, setKategori] = useState('Tech Startup');
  const [selectedNode, setSelectedNode] = useState<NodeLog | null>(null);

  const [logs, setLogs] = useState<NodeLog[]>([
    { id: '1', time: '20:52:12', label: 'Sesa Core AI Hub', coord: '[-8.6740, 115.2460]', lat: -8.6740, lng: 115.2460, kategori: 'Tech Startup', integrity: '99.8%', confidence: 99.12, risk: 'LOW', potential: 98.4 },
    { id: '2', time: '20:48:05', label: 'Malaysia Edge Node', coord: '[3.1390, 101.6869]', lat: 3.1390, lng: 101.6869, kategori: 'Cyber Security', integrity: '98.2%', confidence: 97.50, risk: 'MEDIUM', potential: 88.7 },
    { id: '3', time: '20:41:19', label: 'Papua Cluster Node', coord: '[-6.3149, 143.9555]', lat: -6.3149, lng: 143.9555, kategori: 'Data Storage', integrity: '92.4%', confidence: 89.10, risk: 'HIGH', potential: 94.5 }
  ]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // MENGGANTI KE STYLE DARK-V11 AGAR STRUKTUR VEKTOR DARATAN BUMI TERKUNCI STABIL TANPA BLANK
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', 
      center: [115.2460, -2.6617], 
      zoom: 1.8,
      pitch: 45,
      bearing: 0,
      projection: { name: 'globe' }, 
      antialias: true
    });

    map.current.on('style.load', () => {
      if (!map.current) return;

      // Konfigurasi Aura Cahaya Atmosfer siber di sekeliling bulatan bumi
      map.current.setFog({
        'color': '#09090b',
        'high-color': '#6366f1', // Pancaran atmosfer ungu siber premium di pinggiran bumi
        'space-color': '#04060a',
        'horizon-blend': 0.3,
        'star-intensity': 0.8
      });

      renderConnectionLines();
    });

    renderCustomMarkers();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const renderCustomMarkers = () => {
    if (!map.current) return;

    Object.keys(markersRef.current).forEach(key => markersRef.current[key].remove());
    markersRef.current = {};

    logs.forEach(node => {
      const el = document.createElement('div');
      el.className = 'custom-cyber-marker';
      el.innerHTML = `
        <div class="relative flex items-center justify-center w-10 h-10 cursor-pointer group">
          <div class="absolute w-8 h-8 border-2 border-[#6366f1] rounded-full animate-ping opacity-60"></div>
          <div class="absolute w-6 h-6 border border-cyan-400 rounded-full animate-spin duration-3000 opacity-40"></div>
          <div class="w-4 h-4 bg-gradient-to-br from-cyan-400 to-[#6366f1] rounded-full border-2 border-[#09090b] shadow-[0_0_20px_#6366f1] group-hover:scale-150 transition-transform duration-200"></div>
          <div class="absolute bottom-5 w-[2px] h-8 bg-gradient-to-t from-[#6366f1] to-transparent shadow-[0_0_8px_#6366f1]"></div>
        </div>
      `;

      el.addEventListener('click', () => {
        focusOnCoordinates(node.lng, node.lat, node);
      });

      const marker = new mapboxgl.Marker({ element: el, alignment: 'bottom' })
        .setLngLat([node.lng, node.lat])
        .addTo(map.current!);

      markersRef.current[node.id] = marker;
    });
  };

  const focusOnCoordinates = (lng: number, lat: number, node: NodeLog) => {
    if (!map.current) return;
    setSelectedNode(node);

    map.current.flyTo({
      center: [lng, lat],
      zoom: 4.5,
      pitch: 55,
      bearing: 20,
      speed: 1.2,
      curve: 1.1,
      essential: true
    });
  };

  const renderConnectionLines = () => {
    if (!map.current) return;

    const sourceData: any = {
      'type': 'FeatureCollection',
      'features': []
    };

    const masterNode = logs[0];
    for (let i = 1; i < logs.length; i++) {
      sourceData.features.push({
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': [
            [masterNode.lng, masterNode.lat],
            [logs[i].lng, logs[i].lat]
          ]
        }
      });
    }

    if (map.current.getSource('route')) {
      (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData(sourceData);
    } else {
      map.current.addSource('route', { 'type': 'geojson', 'data': sourceData });
      map.current.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': { 'line-join': 'round', 'line-cap': 'round' },
        'paint': {
          'line-color': '#6366f1',
          'line-width': 2,
          'line-dasharray': [3, 3],
          'line-opacity': 0.8
        }
      });
    }
  };

  const handleDeployNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaPerusahaan || !emailResmi) return alert('🚨 Data Parameter Node Belum Lengkap!');

    const newLat = -2.6617 + (Math.random() - 0.5) * 6;
    const newLng = 115.2460 + (Math.random() - 0.5) * 12;

    const newLog: NodeLog = {
      id: String(logs.length + 1),
      time: new Date().toLocaleTimeString(),
      label: namaPerusahaan,
      coord: `[${newLat.toFixed(4)}, ${newLng.toFixed(4)}]`,
      lat: newLat,
      lng: newLng,
      kategori: kategori,
      integrity: '99.5%',
      confidence: parseFloat((92 + Math.random() * 7).toFixed(2)),
      risk: Math.random() > 0.6 ? 'MEDIUM' : 'LOW',
      potential: parseFloat((88 + Math.random() * 11).toFixed(2))
    };

    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    setNamaPerusahaan('');
    setEmailResmi('');

    setTimeout(() => {
      renderCustomMarkers();
      renderConnectionLines();
      focusOnCoordinates(newLng, newLat, newLog);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-300 font-mono p-4 flex flex-col justify-between relative overflow-hidden select-none text-[12px]">
      
      {/* HEADER PANELS */}
      <header className="bg-[#18181b]/90 border border-slate-800 rounded-xl p-4 flex justify-between items-center mb-3 backdrop-blur-xl shadow-2xl z-20 relative">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#6366f1]/10 rounded-lg border border-[#6366f1]/30">
            <Radio className="w-5 h-5 text-[#6366f1] animate-pulse" />
          </div>
          <div>
            <h1 className="font-black tracking-widest text-slate-100 uppercase text-sm bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">QUANTUM AI GEOSPATIAL COMMAND CENTER</h1>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">Sesa Infrastructure Node // Global Multi-Spectral Tracking System</p>
          </div>
        </div>
        <div className="flex items-center gap-3 font-bold">
          <span className="text-[#6366f1] bg-[#6366f1]/10 border border-[#6366f1]/30 px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#6366f1] animate-ping"></span> KINETIC GLOBE ACTIVE
          </span>
        </div>
      </header>

      {/* MID LAYOUT CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-grow mb-3 z-20 relative">
        
        {/* FORM LEFT PANEL */}
        <div className="lg:col-span-3 bg-[#18181b]/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between backdrop-blur-xl shadow-2xl">
          <div>
            <div className="flex justify-between text-[11px] font-bold text-slate-500 border-b border-slate-800/60 pb-3 mb-4">
              <span className="text-cyan-400">PROJECTION:<br/>CYBER 3D GLOBE</span>
              <span className="text-right">ACCELERATION:<br/>WEBGL 60FPS</span>
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
                  className="w-full bg-[#09090b] border border-slate-800 rounded-lg p-2.5 text-cyan-300 font-bold focus:outline-none focus:border-[#6366f1] shadow-inner placeholder:text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1.5 font-bold tracking-widest">Secure Link Email</label>
                <input 
                  type="email"
                  value={emailResmi}
                  onChange={(e) => setEmailResmi(e.target.value)}
                  placeholder="operator@quantum-node.com" 
                  className="w-full bg-[#09090b] border border-slate-800 rounded-lg p-2.5 text-cyan-300 font-bold focus:outline-none focus:border-[#6366f1] shadow-inner placeholder:text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-slate-500 mb-1.5 font-bold tracking-widest">Architecture Category</label>
                <select 
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full bg-[#09090b] border border-slate-800 rounded-lg p-2.5 text-slate-300 font-bold focus:outline-none"
                >
                  <option>Tech Startup</option>
                  <option>Cyber Security</option>
                  <option>Cafe / Eatery</option>
                  <option>Data Storage</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[#6366f1] to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-slate-950 font-black tracking-widest py-3 rounded-lg transition-all active:scale-[0.97] uppercase text-[11px] shadow-[0_4px_2px_rgba(99,102,241,0.2)] border border-[#6366f1]/40"
              >
                DEPLOY VOLUMETRIC NODE
              </button>
            </form>
          </div>
        </div>

        {/* ================= CYBER VECTOR 3D GLOBE CENTER MATRIX ================= */}
        <div className="lg:col-span-6 bg-[#18181b]/40 border border-slate-800 rounded-xl overflow-hidden relative min-h-[420px] shadow-2xl">
          
          <div ref={mapContainer} className="w-full h-full absolute inset-0" />

          {/* COUNTER METADATA HUD */}
          <div className="absolute top-4 left-4 bg-[#09090b]/95 border border-[#6366f1]/30 text-[#6366f1] px-3 py-2 rounded-lg font-black text-[10px] pointer-events-none shadow-xl backdrop-blur-md flex items-center gap-2 tracking-widest z-10">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-spin" /> 🛰️ GEOSPATIAL VECTOR STREAM: ACTIVE
          </div>
          <div className="absolute bottom-4 right-4 bg-[#09090b]/90 border border-slate-800 text-slate-500 px-3 py-1.5 rounded-md font-mono text-[9px] pointer-events-none backdrop-blur-sm tracking-widest z-10">
            CYBER LAYERING SYSTEM // SHADER COATED GLOBE
          </div>
        </div>

        {/* DATA METRICS RIGHT PANEL */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="bg-[#18181b]/90 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-xl">
            <h3 className="text-[11px] font-black text-amber-500 mb-3 flex items-center gap-1.5 tracking-widest uppercase">
              <TrendingUp className="w-4 h-4" /> ● BINANCE SPOT VALUE LINK
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
                  <Target className="w-4 h-4" /> ● NODE REAL-TIME METRICS
                </h3>
                <span className="text-[9px] bg-indigo-950 text-[#6366f1] border border-indigo-800 px-2 py-0.5 rounded font-black tracking-widest">ACTIVE</span>
              </div>
              
              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div 
                    key={selectedNode.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-3 text-[11px]"
                  >
                    <div className="bg-[#09090b] border border-slate-800 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between"><span className="text-slate-500 font-bold">BUSINESS NAME:</span><span className="text-slate-100 font-black">{selectedNode.label}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500 font-bold">COORDINATES:</span><span className="text-cyan-400 font-bold font-mono">{selectedNode.coord}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500 font-bold">STRUCTURE LAYER:</span><span className="text-slate-300 font-bold uppercase">{selectedNode.kategori}</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                      <div className="bg-[#09090b] border border-slate-800 p-2 rounded-md">
                        <span className="text-slate-500 block mb-0.5">AI CONFIDENCE SCORE</span>
                        <span className="text-emerald-400 text-xs font-black">{selectedNode.confidence}%</span>
                      </div>
                      <div className="bg-[#09090b] border border-slate-800 p-2 rounded-md">
                        <span className="text-slate-500 block mb-0.5">MARKET POTENTIAL SCORE</span>
                        <span className="text-[#6366f1] text-xs font-black">{selectedNode.potential}</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-[#09090b] border border-slate-800/50 rounded-lg p-4 text-center text-slate-600 font-bold py-10">
                    [ INTERCEPT NODE: CLICK BEACON NODE OR EVENT TABLE ROW FOR CAMAERA SPIN TRACKING ]
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-[#09090b] border border-slate-800 rounded-lg p-3 font-mono text-[10px] mt-4 flex items-center justify-between">
              <span className="text-slate-500 font-black uppercase">// TELEMETRY LOG</span>
              <span className="text-emerald-400 font-black uppercase tracking-widest flex items-center gap-1">🟢 DATA INTEGRITY SECURE</span>
            </div>
          </div>
        </div>

      </div>

      {/* LOWER REPOSITORY LOG TABLE */}
      <footer className="bg-[#18181b]/95 border border-slate-800 rounded-xl p-4 shadow-2xl backdrop-blur-xl z-20 relative">
        <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-3">
          <h3 className="text-[11px] font-black text-[#6366f1] tracking-widest uppercase flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#6366f1]" /> MATRIX EVENT LOGS (GLOBAL CLUSTER INTEGRATION)
          </h3>
          <button className="bg-[#27272a] hover:bg-slate-700 text-[10px] font-bold border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-slate-300">
            EXPORT SPATIAL LAYER
          </button>
        </div>

        <div className="overflow-x-auto max-h-[140px] overflow-y-auto">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider sticky top-0 bg-[#18181b] z-10 pb-2">
                <th className="pb-2 pl-2">Timestamp</th>
                <th className="pb-2">Enterprise Identity</th>
                <th className="pb-2">Coordinates Location Matrix</th>
                <th className="pb-2 text-center">Risk Analysis</th>
                <th className="pb-2 text-right pr-2">Data Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-bold text-slate-300">
              {logs.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => focusOnCoordinates(log.lng, log.lat, log)}
                  className={`hover:bg-[#6366f1]/5 transition-all cursor-pointer ${selectedNode?.id === log.id ? 'bg-[#6366f1]/10 border-l-2 border-[#6366f1]' : ''}`}
                >
                  <td className="py-2.5 pl-2 text-slate-500">{log.time}</td>
                  <td className="text-cyan-400 font-black">{log.label}</td>
                  <td className="text-slate-400 font-mono flex items-center gap-2 py-2.5">
                    <span className="text-[#6366f1] animate-pulse text-sm">🌐</span> {log.coord} — <span className="text-slate-600 uppercase text-[10px] font-black">{log.kategori}</span>
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