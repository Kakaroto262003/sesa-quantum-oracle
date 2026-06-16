import React, { useEffect, useRef } from 'react';
import { useCoreData } from '../../state/useCoreData';

export default function SpaceEngine() {
  const selectedCoordinates = useCoreData((state) => state.selectedCoordinates);
  const mapRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const [lat, lng] = selectedCoordinates;
      // Formula Bounding Box yang dikalibrasi ketat untuk resolusi tinggi OpenStreetMap
      const offset = 0.005; 
      mapRef.current.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - offset}%2C${lat - offset / 2}%2C${lng + offset}%2C${lat + offset / 2}&layer=mapnik&marker=${lat}%2C${lng}`;
    }
  }, [selectedCoordinates]);

  return (
    <div className="w-full h-full relative bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 z-10 pointer-events-none" />
      
      <iframe
        ref={mapRef}
        title="SaaS Global Core Maps"
        className="w-full h-full border-0 opacity-90 contrast-[1.05]"
        allowFullScreen
      />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-cyan-500/5 rounded-full border border-cyan-500/20 animate-ping pointer-events-none z-10" />
    </div>
  );
}