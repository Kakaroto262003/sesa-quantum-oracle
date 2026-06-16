import { create } from 'zustand';

interface LogEntry {
  timestamp: string;
  nodeLabel: string;
  location: string;
  coordinates: [number, number];
  integrity: string;
}

interface UserSession {
  username: string;
  email: string;
  tier: 'Standard' | 'Enterprise';
}

interface AiAnalysis {
  status: 'IDLE' | 'ANALYZING' | 'ACTIVE';
  targetNode: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  accuracy: string;
  actionTaken: string;
  waveData: number[];
}

interface CheckoutSession {
  isOpen: boolean;
  pendingName: string;
  pendingType: string;
  pendingEmail: string;
  pendingTier: string;
}

interface CoreState {
  metrics: {
    uptime: string;
    sectors: string;
    secureCluster: string;
    routingMatrix: string;
    solPrice: string;
  };
  selectedCoordinates: [number, number];
  logs: LogEntry[];
  user: UserSession | null;
  aiAnalysis: AiAnalysis;
  checkoutSession: CheckoutSession;
  updateMetrics: (newMetrics: Partial<CoreState['metrics']>) => void;
  setSelectedCoordinates: (coords: [number, number]) => void;
  loginUser: (email: string, username: string) => void;
  logoutUser: () => void;
  addLogNode: (name: string, type: string, customCoords?: [number, number], customLocation?: string) => void;
  triggerAiScan: (nodeName: string) => void;
  openCheckout: (name: string, type: string, email: string, tier: string) => void;
  closeCheckout: () => void;
}

export const useCoreData = create<CoreState>((set) => ({
  metrics: {
    uptime: '36.3 ms',
    sectors: 'A-9',
    secureCluster: '99.4%',
    routingMatrix: 'X-7',
    solPrice: '141.76',
  },
  // SETTINGAN AWAL LAYAR KUNCI MATI DI ATAP GEDUNG ITB STIKOM BALI RENON
  selectedCoordinates: [-8.67385, 115.24434],
  user: null,
  aiAnalysis: {
    status: 'IDLE',
    targetNode: '',
    sentiment: 'NEUTRAL',
    accuracy: '100%',
    actionTaken: 'STANDBY',
    waveData: [30, 40, 35, 50, 45, 60, 55, 40]
  },
  checkoutSession: {
    isOpen: false,
    pendingName: '',
    pendingType: '',
    pendingEmail: '',
    pendingTier: ''
  },
  logs: [
    {
      timestamp: '08:34:24',
      nodeLabel: 'ITB STIKOM BALI RENON CORE',
      location: 'Jl. Raya Puputan No.86, Denpasar',
      coordinates: [-8.67385, 115.24434],
      integrity: '99.72%',
    },
    {
      timestamp: '12:04:15',
      nodeLabel: 'Sesa Quantum Lab',
      location: 'Denpasar, Bali',
      coordinates: [-8.6705, 115.2126],
      integrity: '98.2%',
    },
    {
      timestamp: '12:05:32',
      nodeLabel: 'Wamena Music Base',
      location: 'Sanur, Bali',
      coordinates: [-8.6823, 115.2625],
      integrity: '92.4%',
    },
  ],
  updateMetrics: (newMetrics) =>
    set((state) => ({ metrics: { ...state.metrics, ...newMetrics } })),
  setSelectedCoordinates: (coords) => set({ selectedCoordinates: coords }),
  loginUser: (email, username) => set({ 
    user: { username, email, tier: 'Enterprise' } 
  }),
  logoutUser: () => set({ user: null }),
  
  addLogNode: (name, type, customCoords, customLocation) => set((state) => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0];

    const upperInput = name.toUpperCase();
    let finalCoords: [number, number];
    let finalLocation: string;

    // INTERSEPSI GEOSPATIAL ABSOLUT: Deteksi string alamat panjang Google Maps milikmu
    if (
      upperInput.includes("STIKOM") || 
      upperInput.includes("PUPUTAN") || 
      upperInput.includes("86") || 
      upperInput.includes("80234") ||
      upperInput.includes("DANGIN PURI")
    ) {
      // Jika mendeteksi unsur alamat kampus, PAKSA KUNCI koordinat atap gedung asli!
      finalCoords = [-8.67385, 115.24434];
      finalLocation = "ITB STIKOM Bali Kampus Renon, Denpasar";
    } else if (customCoords) {
      // Jika ada data koordinat kustom dari Nominatim API
      finalCoords = customCoords;
      finalLocation = customLocation ? customLocation : `${type} Node Cluster`;
    } else {
      // Fallback area terdekat jika di luar jangkauan kata kunci
      finalCoords = [-8.67385 + (Math.random() - 0.5) * 0.002, 115.24434 + (Math.random() - 0.5) * 0.002];
      finalLocation = customLocation ? customLocation : `${type} Node Cluster`;
    }

    const newEntry: LogEntry = {
      timestamp,
      nodeLabel: name,
      location: finalLocation,
      coordinates: finalCoords,
      integrity: `${(96 + Math.random() * 3).toFixed(1)}%`
    };

    setTimeout(() => {
      state.triggerAiScan(name);
    }, 100);

    return {
      logs: [newEntry, ...state.logs],
      selectedCoordinates: finalCoords, // <--- Memaksa iFrame SpaceEngine langsung terbang ke lokasi asli!
      aiAnalysis: {
        status: 'ANALYZING',
        targetNode: name,
        sentiment: 'NEUTRAL',
        accuracy: '100%',
        actionTaken: 'COMPUTING GEOSPATIAL VECTOR',
        waveData: Array.from({length: 8}, () => Math.floor(Math.random() * 60) + 20)
      }
    };
  }),
  
  triggerAiScan: (nodeName) => set((state) => ({
    aiAnalysis: {
      status: 'ACTIVE',
      targetNode: nodeName,
      sentiment: 'POSITIVE',
      accuracy: '99.85%',
      actionTaken: 'OPTIMIZED ROUTING DISPATCHED',
      waveData: Array.from({length: 8}, () => Math.floor(Math.random() * 40) + 50)
    }
  })),
  openCheckout: (name, type, email, tier) => set({
    checkoutSession: { isOpen: true, pendingName: name, pendingType: type, pendingEmail: email, pendingTier: tier }
  }),
  closeCheckout: () => set({
    checkoutSession: { isOpen: false, pendingName: '', pendingType: '', pendingEmail: '', pendingTier: '' }
  })
}));