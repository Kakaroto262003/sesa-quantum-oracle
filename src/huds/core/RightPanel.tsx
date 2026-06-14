import React from 'react';
import NeonCard from '../elements/NeonCard';
import { useCoreData } from '../../state/useCoreData';

export default function RightPanel() {
  const { metrics, aiAnalysis } = useCoreData();

  return (
    <div className="w-80 h-full flex flex-col gap-4 pointer-events-auto z-20">
      
      {/* PRICE TRACKER HUB */}
      <NeonCard className="flex flex-col gap-2">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <h2 className="text-[10px] font-bold text-amber-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Binance Hub Terminal
          </h2>
        </div>
        <div className="flex justify-between items-baseline font-mono px-1">
          <span className="text-xs text-slate-400">SOL / USDT</span>
          <span className="text-xl font-bold text-amber-400">${metrics.solPrice}</span>
        </div>
        <div className="w-full h-8 bg-black/20 border border-white/5 rounded relative overflow-hidden mt-1">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent w-full h-full animate-pulse" />
          <div className="absolute bottom-2 left-0 w-full h-[2px] bg-amber-500/40" />
        </div>
      </NeonCard>

      {/* AI PREDICTOR ENGINE */}
      <NeonCard className="flex-1 flex flex-col gap-3">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <h2 className="text-[10px] font-bold text-cyan-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Oracle Predictor
          </h2>
          <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
            aiAnalysis.status === 'ANALYZING' ? 'bg-amber-500/20 text-amber-400 animate-pulse' :
            aiAnalysis.status === 'ACTIVE' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-500'
          }`}>
            {aiAnalysis.status}
          </span>
        </div>

        <div className="flex-1 flex flex-col gap-4 font-mono text-xs">
          <div className="bg-black/40 border border-slate-800/80 rounded-lg p-3 flex flex-col gap-2 min-h-[90px]">
            <span className="text-[10px] text-slate-500 tracking-wider uppercase">AI Core Stream Status</span>
            {aiAnalysis.status === 'IDLE' ? (
              <p className="text-slate-400 italic text-xs animate-pulse">Waiting for incoming Google Maps node review dispatch...</p>
            ) : (
              <div className="flex flex-col gap-1.5 text-slate-200">
                <p className="text-cyan-400 font-bold text-xs">Target: {aiAnalysis.targetNode}</p>
                <p className="text-[11px] text-slate-300">Successfully scanned region coordinates cluster. Parsing metadata...</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2.5 bg-black/20 p-3 rounded-lg border border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider">Analyzed Sentiment</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                aiAnalysis.sentiment === 'POSITIVE' ? 'text-emerald-400 bg-emerald-500/10' : 'text-cyan-400 bg-cyan-500/10'
              }`}>{aiAnalysis.sentiment}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[9px] text-slate-400 uppercase tracking-wider">AI Accuracy Rate</span>
              <span className="text-slate-200 font-bold text-[11px]">{aiAnalysis.accuracy}</span>
            </div>

            <div className="flex flex-col gap-1 mt-1 border-t border-white/5 pt-2">
              <span className="text-[9px] text-slate-500 uppercase tracking-wider">Action Taken</span>
              <span className="text-slate-300 font-bold text-[10px] tracking-wide flex items-center gap-1">
                ⚙️ {aiAnalysis.actionTaken}
              </span>
            </div>
          </div>
        </div>
      </NeonCard>

      {/* CLUSTER MANAGER INTERACTION */}
      <NeonCard className="p-3 flex flex-col gap-1.5">
        <span className="text-[9px] font-bold text-slate-400 font-mono tracking-widest uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          Deploy New Node Cluster
        </span>
        <div className="text-[10px] text-slate-500 font-mono text-center py-2 bg-black/20 border border-white/5 rounded border-dashed">
          System Ready for Remote Access
        </div>
      </NeonCard>
    </div>
  );
}