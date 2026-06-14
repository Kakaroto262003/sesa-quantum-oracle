import React, { useState } from 'react';
import { Shield, Key, Cpu, Terminal, Globe, Activity, LayoutDashboard, Wallet, ArrowUpRight, ArrowDownLeft, LogOut, RefreshCw, Layers } from 'lucide-react';

function App() {
  const [operator, setOperator] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInitialize = (e: React.FormEvent) => {
    e.preventDefault();
    if (operator && email) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsLoggedIn(true);
      }, 2000);
    } else {
      alert('Please fill in all security credentials!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setOperator('');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-mono relative overflow-hidden selection:bg-cyan-500 selection:text-slate-900">
      
      {/* BACKGROUND GRID EFFECT */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* TOPBAR NAVIGATION */}
      <header className="border-b border-cyan-500/20 bg-slate-900/60 backdrop-blur-md z-10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
          <span className="font-bold tracking-widest bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">SESA CORE ENGINE v7.0</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-emerald-400 font-bold">NODE GLOBAL ACTIVE</span>
          </div>
          {isLoggedIn && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg transition-colors font-bold text-[11px]"
            >
              <LogOut className="w-3.5 h-3.5" /> LOCK CORE
            </button>
          )}
        </div>
      </header>

      {/* INTERFACE MANAGER (LOGIN VS DASHBOARD) */}
      <main className="flex-grow flex items-center justify-center p-6 z-10 w-full max-w-7xl mx-auto">
        
        {!isLoggedIn ? (
          /* ================= LOGIN INTERFACE ================= */
          <div className="w-full max-w-md bg-slate-900/80 border border-cyan-500/30 rounded-xl p-8 shadow-[0_0_50px_-12px_rgba(6,182,212,0.15)] backdrop-blur-xl relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-md"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-md"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-md"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-md"></div>

            <div className="text-center mb-8">
              <div className="inline-flex p-3 bg-cyan-500/10 rounded-full text-cyan-400 border border-cyan-500/20 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-xl font-black tracking-widest text-cyan-400">ORACLE AUTH GATEWAY</h1>
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Sesa Global Network Access Control</p>
            </div>

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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-widest py-4 rounded-lg shadow-[0_4px_20px_rgba(6,182,212,0.25)] transition-all active:scale-[0.98] duration-150 border border-cyan-300/20 disabled:opacity-50"
              >
                {isLoading ? 'CONNECTING TO NODE...' : 'Initialize Core Access'}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between text-[10px] tracking-wider text-slate-500 font-bold">
              <span className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-cyan-500 animate-pulse" /> SYSTEM STATUS:</span>
              <span className={`px-2 py-0.5 rounded ${isLoading ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>
                {isLoading ? 'DECRYPTING...' : 'STANDBY'}
              </span>
            </div>
          </div>
        ) : (
          /* ================= MAIN DASHBOARD INTERFACE ================= */
          <div className="w-full space-y-6 animate-[fadeIn_0.3s_ease-out]">
            
            {/* WELCOME BANNER */}
            <div className="bg-slate-900/40 border border-cyan-500/20 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 backdrop-blur-md">
              <div>
                <h2 className="text-lg font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-cyan-400" /> Welcome back, Commander {operator}!
                </h2>
                <p className="text-xs text-slate-400 mt-1">Authorized Node Session active for secure mail link: <span className="text-cyan-500 font-bold">{email}</span></p>
              </div>
              <div className="bg-slate-950 px-4 py-2 border border-slate-800 rounded-lg text-[11px] font-bold text-slate-400 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-blue-400" /> QUANTUM CLUSTER ID: <span className="text-cyan-400">#AF045-X8C</span>
              </div>
            </div>

            {/* FINANCIAL CRYPTO SPOT WALLET CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-transparent"></div>
                <div className="flex justify-between items-start">
                  <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">Solana Liquidity (SOL)</span>
                  <Wallet className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-100">1,438.50</span>
                  <span className="text-xs font-bold text-cyan-400">SOL</span>
                </div>
                <div className="mt-2 text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> +12.4% (Spot Wallet)
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent"></div>
                <div className="flex justify-between items-start">
                  <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">Stable Coin Asset</span>
                  <Wallet className="w-4 h-4 text-blue-400" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-100">25,840.00</span>
                  <span className="text-xs font-bold text-blue-400">USDT</span>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 font-bold flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" /> P2P Escrow Sync Active
                </div>
              </div>

              <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-5 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></div>
                <div className="flex justify-between items-start">
                  <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">Net Oracle Profit</span>
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-400">$ 4,892.15</span>
                </div>
                <div className="mt-2 text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> Trading Bot AI Live Optimization
                </div>
              </div>
            </div>

            {/* SECURE TERMINAL DATA LOG TABLE */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-md">
              <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Live Node Execution Logs
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="pb-3 pl-2">Timestamp</th>
                      <th className="pb-3">Action Order</th>
                      <th className="pb-3">Target Address</th>
                      <th className="pb-3 text-right pr-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-slate-300 font-bold">
                    <tr className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 pl-2 text-slate-500">23:46:10</td>
                      <td>DECRYPT QUANTUM BLOCK</td>
                      <td className="font-mono text-cyan-500">sol_node_main_0x71a</td>
                      <td className="py-3 text-right pr-2 text-emerald-400">SUCCESS</td>
                    </tr>
                    <tr className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 pl-2 text-slate-500">23:45:52</td>
                      <td>EXECUTE AUTO LIMIT ORDER</td>
                      <td className="font-mono text-cyan-500">binance_p2p_usdt_wallet</td>
                      <td className="py-3 text-right pr-2 text-emerald-400">SUCCESS</td>
                    </tr>
                    <tr className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 pl-2 text-slate-500">23:42:01</td>
                      <td>INITIALIZE SECURITY LAYER</td>
                      <td className="font-mono text-cyan-500">oracle_auth_gateway_v7</td>
                      <td className="py-3 text-right pr-2 text-cyan-400">BYPASSED</td>
                    </tr>
                    <tr className="hover:bg-slate-800/20 transition-colors">
                      <td className="py-3 pl-2 text-slate-500">23:38:15</td>
                      <td>BLOCK INTRUDER MALWARE</td>
                      <td className="font-mono text-rose-400">unknown_ip_192.168.1.9</td>
                      <td className="py-3 text-right pr-2 text-rose-400">TERMINATED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

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