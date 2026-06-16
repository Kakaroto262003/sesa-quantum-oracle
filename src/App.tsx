import React, { useState, useEffect } from 'react';
import { Shield, Cpu, Terminal, PlusCircle, Download, Radio, Zap, Target, TrendingUp, Filter, CheckCircle2, MapPin, ShieldAlert, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoreData } from './state/useCoreData';
import LeftPanel from './huds/core/LeftPanel';
import SpaceEngine from './huds/core/SpaceEngine';
import LogTable from './huds/core/LogTable';

export default function App() {
  const { 
    metrics, 
    logs, 
    selectedCoordinates, 
    aiAnalysis, 
    checkoutSession, 
    closeCheckout,
    addLogNode,
    setSelectedCoordinates
  } = useCoreData();

  const [filterKategori, setFilterKategori] = useState('ALL');
  const [prevSolPrice, setPrevSolPrice] = useState<number>(141.76);
  const [priceDirection, setPriceDirection] = useState<'UP' | 'DOWN' | 'STABLE'>('STABLE');

  // Efek Deteksi Pergerakan Harga SOL/USDT untuk Keperluan Analisis Finansial
  useEffect(() => {
    const currentPrice = parseFloat(metrics.solPrice);
    if (currentPrice > prevSolPrice) {
      setPriceDirection('UP');
    } else if (currentPrice < prevSolPrice) {
      setPriceDirection('DOWN');
    }
    setPrevSolPrice(currentPrice);
  }, [metrics.solPrice]);

  const filteredLogs = logs.filter(log => 
    filterKategori === 'ALL' || log.location.includes(filterKategori) || (log as any).kategori === filterKategori
  );

  return (
    <div className="w-full min-h-screen bg-[#030303] text-zinc-200 antialiased font-sans p-4 flex flex-col justify-start relative pb-24 select-none">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e1b4b_0%,#030303_85%)] pointer-events-none z-0"></div>
      
      {/* 1. NOTIFIKASI AKTIVITAS AI OVERLAY */}
      <AnimatePresence>
        {aiAnalysis.status === 'ANALYZING' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 bg-zinc-950/95 border-2 border-amber-500/50 p-4 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.2)] font-mono text-[11px] w-80 space-y-2 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>AI COUNTER-MEASURE SCANNING</span>
            </div>
            <div className="text-zinc-400">TARGET: <span className="text-white font-bold">{aiAnalysis.targetNode}</span></div>
            <div className="text-[10px] bg-amber-950/30 border border-amber-500/20 p-1.5 rounded text-amber-300 animate-pulse uppercase">
              {aiAnalysis.actionTaken}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MODAL INTEGRASI CHECKOUT LISENSI SAAS PREMIUM */}
      <AnimatePresence>
        {checkoutSession.isOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-zinc-950 border-2 border-indigo-500 rounded-xl p-6 w-full max-w-md shadow-[0_0_50px_rgba(99,102,241,0.3)] font-mono space-y-4 relative"
            >
              <button onClick={closeCheckout} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
              
              <div className="border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-500" /> SECURE GATEWAY AUTHORIZATION
                </h3>
                <p className="text-[9px] text-zinc-500 uppercase mt-0.5">SaaS Node Deployment Protocol</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-zinc-900/50 p-2.5 border border-zinc-800 rounded">
                  <span className="text-[10px] text-zinc-500 block">NODE NAME:</span>
                  <span className="text-white font-bold uppercase">{checkoutSession.pendingName}</span>
                </div>
                <div className="bg-zinc-900/50 p-2.5 border border-zinc-800 rounded">
                  <span className="text-[10px] text-zinc-500 block">SECURE EMAIL:</span>
                  <span className="text-white font-bold">{checkoutSession.pendingEmail}</span>
                </div>
                <div className="bg-zinc-900/50 p-2.5 border border-zinc-800 rounded flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">SELECTED TIER:</span>
                    <span className="text-amber-400 font-bold uppercase text-[11px]">{checkoutSession.pendingTier}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  // Bypass validasi, paksa langsung deploy ke dalam log list
                  addLogNode(checkoutSession.pendingName, checkoutSession.pendingType);
                  closeCheckout();
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg text-xs tracking-widest uppercase transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
              >
                PROCEED ENCRYPTED LISENCE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HEADER PANEL CONTROL */}
      <header className="backdrop-blur-xl bg-zinc-950/80 border-[1.5px] border-zinc-800 rounded-xl p-4 flex justify-between items-center mb-4 shadow-2xl z-20 relative">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-500/10 rounded-lg border-2 border-indigo-500/40">
            <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight text-white uppercase drop-shadow-sm font-sans">QUANTUM AI GEOSPATIAL COMMAND CENTER</h1>
            <p className="text-[10px] text-indigo-400 uppercase font-bold font-mono tracking-[0.25em] mt-0.5">SESA CORE ARCHITECTURE // ADVANCED CORE SYSTEM ACTIVE</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#10B981] bg-emerald-950/50 border-2 border-[#10B981]/50 px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono tracking-[0.1em] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_10px_#10b981] animate-ping"></span> PLATFORM_REFINED_OK
          </span>
        </div>
      </header>

      {/* DASHBOARD MIDDLE CORE PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 z-20 relative mb-6 items-stretch">
        
        {/* PANEL FORM KIRI INTERAKTIF */}
        <div className="lg:col-span-3 flex">
          <LeftPanel />
        </div>

        {/* MONITOR SATELIT ENGINE LIVE */}
        <div className="lg:col-span-6 min-h-[500px] bg-zinc-950 border-2 border-zinc-800 rounded-xl overflow-hidden relative shadow-2xl">
          <SpaceEngine />
          <div className="absolute top-4 left-4 backdrop-blur-md bg-zinc-950/90 border-2 border-zinc-800 text-white px-3 py-2 rounded-lg font-bold font-mono text-[10px] tracking-[0.2em] z-20 flex items-center gap-2 shadow-2xl">
            <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> SPECTRAL_CORE_ENGINE: ACTIVE
          </div>
        </div>

        {/* PANEL METRIKS HUD KANAN (UPGRADED METRICS) */}
        <div className="lg:col-span-3 flex flex-col gap-3 justify-between">
          {/* DINAMIS METRIS TRADING SOL / USDT */}
          <div className="backdrop-blur-xl bg-zinc-950/80 border-[1.5px] border-zinc-800 rounded-xl p-4 shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[10px] font-bold text-amber-500 flex items-center gap-1.5 tracking-widest font-mono uppercase">
                <TrendingUp className="w-3.5 h-3.5" /> ● BINANCE SECURITY FEED
              </h3>
              {priceDirection === 'UP' && <span className="text-emerald-400 flex items-center text-[10px] font-mono font-bold animate-pulse"><ArrowUpRight className="w-3 h-3" /> UP</span>}
              {priceDirection === 'DOWN' && <span className="text-rose-400 flex items-center text-[10px] font-mono font-bold animate-pulse"><ArrowDownRight className="w-3 h-3" /> DOWN</span>}
            </div>
            <div className={`flex justify-between items-center border-2 p-3 rounded-lg transition-colors duration-300 ${priceDirection === 'UP' ? 'bg-emerald-950/20 border-emerald-500/30' : priceDirection === 'DOWN' ? 'bg-rose-950/20 border-rose-500/30' : 'bg-zinc-900/40 border-zinc-800'}`}>
              <span className="text-zinc-400 font-bold font-sans text-xs">SOL / USDT</span>
              <span className={`text-xl font-black font-sans tracking-tight ${priceDirection === 'UP' ? 'text-emerald-400' : priceDirection === 'DOWN' ? 'text-rose-400' : 'text-amber-400'}`}>
                ${metrics.solPrice}
              </span>
            </div>
          </div>

          {/* REAL-TIME AI METRIC PANEL */}
          <div className="backdrop-blur-xl bg-zinc-950/80 border-[1.5px] border-zinc-800 rounded-xl p-4 flex-grow shadow-xl flex flex-col justify-between min-h-[250px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
                <h3 className="text-[10px] font-bold text-indigo-400 font-sans tracking-widest uppercase flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> ● AI TELEMETRY METRICS
                </h3>
                <span className={`text-[8px] font-mono px-2 py-0.5 rounded font-black tracking-widest ${aiAnalysis.status === 'ANALYZING' ? 'bg-amber-950 text-amber-300 animate-pulse border border-amber-500/30' : 'bg-indigo-950 text-indigo-300 border border-indigo-500/30'}`}>
                  {aiAnalysis.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className={`border-2 rounded-lg p-3 space-y-2.5 text-xs transition-colors ${aiAnalysis.status === 'ANALYZING' ? 'bg-amber-950/10 border-amber-500/30' : 'bg-zinc-900/40 border-zinc-800'}`}>
                  <div className="flex justify-between border-b border-zinc-800/40 pb-1.5">
                    <span className="text-zinc-400 font-bold font-sans">ACTIVE_NODE:</span>
                    <span className="text-white font-black font-sans truncate max-w-[140px] uppercase">
                      {aiAnalysis.targetNode || 'STANDBY READY'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/40 pb-1.5">
                    <span className="text-zinc-400 font-bold font-sans">SENTIMENT INDEX:</span>
                    <span className={`font-bold uppercase ${aiAnalysis.sentiment === 'POSITIVE' ? 'text-emerald-400' : 'text-zinc-400'}`}>{aiAnalysis.sentiment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-bold font-sans">AI_ACCURACY:</span>
                    <span className="text-[#06B6D4] font-mono font-bold">{aiAnalysis.accuracy}</span>
                  </div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-2 rounded text-[10px] font-mono text-zinc-400">
                  <span className="text-[8px] text-zinc-500 block uppercase font-bold tracking-wider mb-0.5">Core Response Action</span>
                  <p className="text-zinc-200 uppercase text-center font-bold tracking-wide text-[9px] truncate bg-black/40 py-1 rounded border border-zinc-800">
                    {aiAnalysis.actionTaken}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-2.5 font-mono text-[10px] mt-4 flex items-center justify-between tracking-wide">
              <span className="text-[#10b981] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse"></span> SYSTEM INTEGRITY SAFE
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* MATRIX OPERASIONAL LIVE DATABASE VIEW */}
      <div className="w-full z-20 relative">
        <LogTable />
      </div>
    </div>
  );
}