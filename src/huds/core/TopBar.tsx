import React from 'react';

export default function TopBar() {
  return (
    <div className="w-full flex justify-between items-center bg-slate-900/40 border border-slate-800/80 backdrop-blur-md p-4 rounded-xl pointer-events-auto z-20 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <h1 className="text-sm font-bold tracking-widest text-white font-mono uppercase">
          SESA CORE ENGINE v7.0 LIVE
        </h1>
      </div>

      <div className="flex items-center gap-4 font-mono text-[10px] tracking-wider">
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded">
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          SYS: OPERATIONAL
        </div>
        <div className="flex items-center gap-1.5 bg-slate-950/50 border border-slate-800 text-slate-400 px-2.5 py-1 rounded">
          📍 LOCATION: BALI
        </div>
      </div>
    </div>
  );
}