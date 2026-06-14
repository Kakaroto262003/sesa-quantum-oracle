import React, { useState } from 'react';
import { Shield, Key, Cpu, Terminal, Globe, Activity } from 'lucide-react';

function App() {
  const [operator, setOperator] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('STANDBY');

  const handleInitialize = (e: React.FormEvent) => {
    e.preventDefault();
    if (operator && email) {
      setStatus('CONNECTING TO NODE...');
      setTimeout(() => {
        setStatus('ORACLE ENGINE CORE v7.0 ONLINE');
      }, 2000);
    } else {
      alert('Please fill in all security credentials!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-mono relative overflow-hidden selection:bg-cyan-500 selection:text-slate-900">
      
      {/* BACKGROUND GRID EFFECT */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* TOPBAR NAVIGATION */}
      <header className="border-b border-cyan-500/20 bg-slate-900/60 backdrop-blur-md z-10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
          <span className="font-bold tracking-widest bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">SESA CORE ENGINE</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-emerald-400">VERCEL LIVE NODE</span>
          </div>
        </div>
      </header>

      {/* MAIN AUTH GATEWAY INTERFACE */}
      <main className="flex-grow flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md bg-slate-900/80 border border-cyan-500/30 rounded-xl p-8 shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] backdrop-blur-xl relative group">
          
          {/* Neon Corner Accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-md"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-md"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-md"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-md"></div>

          {/* TEKS JUDUL SUDAH TERUPDATE */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-cyan-500/10 rounded-full text-cyan-400 border border-cyan-500/20 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-black tracking-widest text-cyan-400">ORACLE AUTH GATEWAY v7.0 - LIVE ONLINE</h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Sesa Global Network Access Control v7.0</p>
          </div>

          {/* LOGIN FORM CONTROL */}
          <form onSubmit={handleInitialize} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Operator Identity
              </label>
              <input 
                type="text" 
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                placeholder="ENTER YOUR NAME" 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 text-cyan-300 placeholder:text-slate-700 transition-colors uppercase tracking-wider font-bold"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold flex items-center gap-2">
                <Key className="w-3.5 h-3.5 text-cyan-400" /> Secure Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@quantum-oracle.com" 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 text-cyan-300 placeholder:text-slate-700 transition-colors font-bold"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-lg shadow-[0_4px_20px_rgba(6,182,212,0.25)] transition-all active:scale-[0.98] duration-150 mt-2 border border-cyan-300/20"
            >
              Initialize Core Access
            </button>
          </form>

          {/* STATUS CONSOLE LOG */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-[10px] tracking-wider text-slate-500 font-bold">
            <span className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-cyan-500 animate-pulse" /> SYSTEM STATUS:</span>
            <span className={`px-2 py-0.5 rounded ${status.includes('ONLINE') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>{status}</span>
          </div>

        </div>
      </main>

      {/* FOOTER METADATA */}
      <footer className="border-t border-slate-900 bg-slate-950/80 backdrop-blur-md z-10 px-6 py-4 flex justify-between items-center text-[10px] text-slate-600 font-bold tracking-widest">
        <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-slate-500" /> SECURE PROTOCOL PREMIUM TIER ACTIVE</span>
        <span>© 2026 SESA GLOBAL TRADING CO.</span>
      </footer>

    </div>
  );
}

export default App;