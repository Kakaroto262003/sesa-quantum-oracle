import React from 'react';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function NeonCard({ children, className = '' }: NeonCardProps) {
  return (
    <div className={`p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] ${className}`}>
      {children}
    </div>
  );
}