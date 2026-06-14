import React, { useState } from 'react';
import { useCoreData } from '../../state/useCoreData';
import NeonCard from '../elements/NeonCard';

export default function BillingModal() {
  const { checkoutSession, closeCheckout, addLogNode } = useCoreData();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!checkoutSession.isOpen) return null;

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    // Simulasi delay otentikasi perbankan siber global selama 1.5 detik
    setTimeout(() => {
      addLogNode(checkoutSession.pendingName, checkoutSession.pendingType);
      setIsProcessing(false);
      closeCheckout();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
      <NeonCard className="w-full max-w-sm p-6 flex flex-col gap-5 bg-slate-900/50 border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
        
        {/* MODAL HEADER */}
        <div className="text-center border-b border-white/5 pb-3">
          <h2 className="text-sm font-bold tracking-widest text-amber-400 font-mono uppercase flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Secure Invoice Checkout
          </h2>
          <p className="text-[10px] text-slate-400 font-mono mt-1">SaaS Global Billing Gateway</p>
        </div>

        {/* INVOICE INBOUND RECEIPT */}
        <div className="flex flex-col gap-2 font-mono text-xs bg-black/40 p-3 rounded-lg border border-white/5">
          <div className="flex justify-between border-b border-white/5 pb-1.5">
            <span className="text-slate-500">Target Node:</span>
            <span className="text-white font-bold">{checkoutSession.pendingName}</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-1.5">
            <span className="text-slate-500">Tier Selected:</span>
            <span className="text-cyan-400 font-bold">{checkoutSession.pendingTier}</span>
          </div>
          <div className="flex justify-between pt-1 font-bold text-[13px]">
            <span className="text-slate-300">Total Amount:</span>
            <span className="text-amber-400">
              {checkoutSession.pendingTier.includes('$49') ? '$49.00 / mo' : '$199.00 / mo'}
            </span>
          </div>
        </div>

        {/* SECURE CREDIT CARD SIMULATION */}
        <div className="flex flex-col gap-2 font-mono text-[11px]">
          <label className="text-slate-400 uppercase tracking-wider">Secure Card Information</label>
          <input
            type="text"
            disabled
            value="••••  ••••  ••••  4242  (STRIPE TEST MODE)"
            className="w-full bg-black/60 border border-slate-800 rounded p-2 text-slate-400 text-center text-xs select-none"
          />
        </div>

        {/* ACTION CONTROLLERS */}
        <div className="flex gap-2 font-mono text-xs mt-1">
          <button
            type="button"
            disabled={isProcessing}
            onClick={closeCheckout}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded border border-slate-700 font-bold transition-all uppercase"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleConfirmPayment}
            className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold py-2.5 rounded transition-all shadow-[0_2px_10px_rgba(245,158,11,0.2)] active:scale-[0.97] uppercase tracking-wider text-center"
          >
            {isProcessing ? 'PROCESSING...' : 'AUTHORIZE'}
          </button>
        </div>

      </NeonCard>
    </div>
  );
}