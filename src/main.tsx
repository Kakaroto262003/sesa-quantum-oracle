import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// INJEKSI STYLESHEET SAKRAL MAPBOX UNTUK MEMAKSA LAYOUT 3D GLOBE MUNCUL
import 'mapbox-gl/dist/mapbox-gl.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);