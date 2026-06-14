import React from 'react';
import SpaceEngine from './huds/core/SpaceEngine';
import TopBar from './huds/core/TopBar';
import LeftPanel from './huds/core/LeftPanel';
import RightPanel from './huds/core/RightPanel';
import LogTable from './huds/core/LogTable';
import AuthGate from './huds/core/AuthGate';
import BillingModal from './huds/core/BillingModal'; // 1. Menyambungkan kabel modul billing ke reaktor utama
import { useCoreData } from './state/useCoreData';

export default function App() {
  const user = useCoreData((state) => state.user);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 select-none">
      {/* Tirai 1: Gerbang Keamanan Login */}
      {!user && <AuthGate />}
      
      {/* Tirai 2: Gerbang Komersial Pembayaran Stripe (WAJIB ADA DI SINI) */}
      <BillingModal />

      {/* Background Layer: Live Maps Dunia */}
      <div className="absolute inset-0 z-0">
        <SpaceEngine />
      </div>

      {/* HUD Layer: Susunan Panel Kontrol Siber */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 bg-gradient-to-b from-slate-950/20 via-transparent to-slate-950/30">
        <TopBar />
        
        <div className="flex-1 flex justify-between items-center my-4 overflow-hidden gap-4">
          <LeftPanel />
          <RightPanel />
        </div>

        <LogTable />
      </div>
    </div>
  );
}