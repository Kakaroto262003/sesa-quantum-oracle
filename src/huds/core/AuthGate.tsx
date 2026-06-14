import React, { useState } from 'react';
import { useCoreData } from '../../state/useCoreData';
import NeonCard from '../elements/NeonCard';

export default function AuthGate() {
  const loginUser = useCoreData((state) => state.loginUser);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && username) {
      loginUser(email, username);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
      <NeonCard className="w-full max-w-md p-8 flex flex-col gap-6 bg-slate-900/40 border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* HEADER AREA - CLEAN & PROFESSIONAL */}
        <div className="text-center border-b border-white/5 pb-4">
          <h1 className="text-xl font-bold tracking-widest text-white font-mono uppercase bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            ORACLE AUTH GATEWAY
          </h1>
          <p className="text-[11px] text-cyan-400 font-mono mt-1.5 tracking-wider uppercase">
            SaaS Global Network Access Control
          </p>
        </div>

        {/* FORM AREA */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-mono text-sm">
          
          {/* INPUT OPERATOR IDENTITY */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Operator Identity
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 text-xs"
            />
          </div>

          {/* INPUT SECURE EMAIL ADDRESS */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              Secure Email Address
            </label>
            <input
              type="email"
              required
              placeholder="operator@quantum-oracle.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 text-xs"
            />
          </div>

          {/* BUTTON SUBMIT */}
          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-[0_4px_20px_rgba(6,182,212,0.2)] hover:shadow-[0_4px_25px_rgba(6,182,212,0.35)] active:scale-[0.98] tracking-widest text-xs uppercase"
          >
            Initialize Core Access
          </button>
        </form>

        {/* FOOTER GATEWAY */}
        <div className="text-center text-[9px] text-slate-500 font-mono tracking-widest uppercase border-t border-white/5 pt-4 flex items-center justify-center gap-2">
          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          Secure Protocol Premium Tier Active
        </div>
        
      </NeonCard>
    </div>
  );
}