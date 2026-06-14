import React, { useEffect, useRef } from 'react';
import { useCoreData } from '../../state/useCoreData';

export default function SpaceEngine() {
  const selectedCoordinates = useCoreData((state) => state.selectedCoordinates);
  const mapRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const [lat, lng] = selectedCoordinates;
      // Membuka peta dunia internasional asli berbasis koordinat dinamis
      mapRef.current.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.03}%2C${lat-0.02}%2C${lng+0.03}%2C${lat+0.02}&layer=mapnik&marker=${lat}%2C${lng}`;
    }
  }, [selectedCoordinates]);

  return (
    <div className="w-full h-full relative bg-slate-950">
      {/* Grid Filter Kosmis */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 z-10 pointer-events-none" />
      
      {/* Engine Live Maps Internasional (WARNA TERANG ASLI) */}
      <iframe
        ref={mapRef}
        title="SaaS Global Core Maps"
        className="w-full h-full border-0 opacity-80"
        allowFullScreen
      />
      
      {/* Efek Radar Scanning Cyber */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full border border-cyan-500/10 animate-ping pointer-events-none z-10" />
    </div>
  );
}