\import React from 'react';
import { useCoreData } from '../../state/useCoreData';

export default function SpaceEngine() {
  const selectedCoordinates = useCoreData((state) => state.selectedCoordinates);
  
  // Ambil data Lat dan Lng secara aman
  const lat = selectedCoordinates ? selectedCoordinates[0] : -8.67385;
  const lng = selectedCoordinates ? selectedCoordinates[1] : 115.24434;

  // Kalibrasi ketat kotak pembatas (Bounding Box) OpenStreetMap sekitar target
  const offset = 0.003; 
  const bbox = `${lng - offset},${lat - offset/2},${lng + offset},${lat + offset/2}`;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="w-full h-full relative bg-slate-950">
      {/* Grid Filter Kosmis */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 z-10 pointer-events-none" />
      
      {/* 🔥 PENGUNCI ABSOLUT: Menggunakan properti 'key' unik berdasarkan lat-lng.
        Ini memaksa DOM React melakukan re-render total dan memindahkan pin secara paksa!
      */}
      <iframe
        key={`${lat}-${lng}`}
        title="SaaS Global Core Maps"
        src={mapUrl}
        className="w-full h-full border-0 opacity-90 contrast-[1.05]"
        allowFullScreen
      />
      
      {/* Efek Radar Scanning Cyber */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-cyan-500/5 rounded-full border border-cyan-500/20 animate-ping pointer-events-none z-10" />
    </div>
  );
}