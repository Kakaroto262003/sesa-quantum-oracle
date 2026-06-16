import React from 'react';
import NeonCard from '../elements/NeonCard';
import { useCoreData } from '../../state/useCoreData';

export default function LogTable() {
  const { logs, setSelectedCoordinates, selectedCoordinates } = useCoreData();

  const handleExportCSV = () => {
    if (logs.length === 0) return;

    const headers = ['Timestamp', 'Node Label', 'Latitude', 'Longitude', 'Location Cluster', 'Data Integrity'];
    const csvRows = logs.map(log => [
      `"${log.timestamp}"`,
      `"${log.nodeLabel}"`,
      log.coordinates[0],
      log.coordinates[1],
      `"${log.location}"`,
      `"${log.integrity}"`
    ].join(','));

  
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Sesa_Operational_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <NeonCard className="w-full h-48 flex flex-col gap-2 pointer-events-auto z-20 backdrop-blur-xl bg-slate-900/40 border border-white/10">
      
      {/* HEADER AREA */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <h2 className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          ENTERPRISE DATABASE LIVE LOG VIEWER (SaaS GLOBAL)
        </h2>
        
        <button
          onClick={handleExportCSV}
          className="px-2 py-0.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 font-mono text-[9px] font-bold rounded transition-all duration-200 uppercase tracking-widest active:scale-[0.96]"
        >
          Export Data
        </button>
      </div>
      
      {/* TABEL DATA OPERASIONAL */}
      <div className="flex-1 overflow-y-auto font-mono text-[11px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-500 border-b border-white/10 bg-slate-950/40">
              <th className="p-2">Timestamp</th>
              <th className="p-2">Node Label</th>
              <th className="p-2">Coordinates Location (Click to Target)</th>
              <th className="p-2 text-right">Data Integrity</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => {
              const isSelected = selectedCoordinates[0] === log.coordinates[0];
              return (
                <tr 
                  key={index} 
                  onClick={() => setSelectedCoordinates(log.coordinates)}
                  className={`border-b border-white/5 cursor-pointer transition-all duration-200 ${
                    isSelected ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  <td className="p-2 text-slate-500">{log.timestamp}</td>
                  <td className="p-2">{log.nodeLabel}</td>
                  <td className="p-2 flex items-center gap-2 text-sky-400 hover:underline">
                    🌐 [{log.coordinates.join(', ')}] - {log.location}
                  </td>
                  <td className="p-2 text-right text-emerald-400">{log.integrity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </NeonCard>
  );
}