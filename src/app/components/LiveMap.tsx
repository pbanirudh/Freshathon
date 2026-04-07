import { useState, useEffect } from "react";

interface LiveMapProps {
  compact?: boolean;
  selectedBus?: string;
}

export function LiveMap({ compact = false, selectedBus }: LiveMapProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 70);
    return () => clearInterval(t);
  }, []);

  const stops: [number, number][] = [
    [70, 140], [175, 112], [290, 138], [405, 108], [500, 128],
  ];
  const stopNames = ["Main Gate", "Block A", "Canteen", "Library", "Campus"];
  const h = compact ? 178 : 254;

  function getBusPos(progress: number): [number, number] {
    const totalSegs = stops.length - 1;
    const rawIdx = (progress / 100) * totalSegs;
    const idx = Math.min(Math.floor(rawIdx), totalSegs - 1);
    const frac = rawIdx - idx;
    const a = stops[idx];
    const b = stops[Math.min(idx + 1, totalSegs)];
    return [a[0] + (b[0] - a[0]) * frac, a[1] + (b[1] - a[1]) * frac];
  }

  function getAngle(progress: number): number {
    const totalSegs = stops.length - 1;
    const rawIdx = (progress / 100) * totalSegs;
    const idx = Math.min(Math.floor(rawIdx), totalSegs - 1);
    const next = Math.min(idx + 1, totalSegs);
    const dx = stops[next][0] - stops[idx][0];
    const dy = stops[next][1] - stops[idx][1];
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  const speed = 0.72;
  const allBuses = [
    { id: "RIT-01", progress: (tick * speed) % 100, color: "#1B4FD8" },
    { id: "RIT-02", progress: ((tick * speed) + 34) % 100, color: "#F59E0B" },
    { id: "RIT-03", progress: ((tick * speed) + 67) % 100, color: "#22C55E" },
  ];

  const buses = selectedBus
    ? allBuses.filter((b) => b.id === selectedBus)
    : allBuses;

  return (
    <svg
      viewBox={`0 0 580 ${h}`}
      style={{ width: "100%", height: h, borderRadius: 12, display: "block" }}
    >
      <defs>
        <filter id="ms" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1B4FD8" floodOpacity="0.10" />
        </filter>
        <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EEF3FF" />
          <stop offset="100%" stopColor="#F0F4FF" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="580" height={h} fill="url(#mapBg)" rx="12" />

      {/* Grid */}
      {[1, 2, 3].map((i) => (
        <line key={`v${i}`} x1={i * 145} y1="0" x2={i * 145} y2={h} stroke="#CBD5E1" strokeWidth="0.5" />
      ))}
      {[1, 2].map((i) => (
        <line key={`h${i}`} x1="0" y1={(i * h) / 3} x2="580" y2={(i * h) / 3} stroke="#CBD5E1" strokeWidth="0.5" />
      ))}

      {/* Parks */}
      <ellipse cx="65" cy={h - 36} rx="48" ry="22" fill="#BBF7D0" opacity="0.55" />
      <ellipse cx="510" cy="24" rx="46" ry="18" fill="#BBF7D0" opacity="0.55" />

      {/* Building blocks */}
      {[
        [32, 22, 52, 32],
        [132, h - 54, 52, 32],
        [252, 18, 62, 36],
        [348, h - 58, 58, 32],
        [452, 12, 58, 30],
      ].map(([x, y, w, ht], i) => (
        <rect key={i} x={x} y={y} width={w} height={ht} rx="3" fill="#CBD5E1" opacity="0.32" />
      ))}

      {/* Road layers */}
      <polyline points={stops.map(([x, y]) => `${x},${y}`).join(" ")} stroke="#94A3B8" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={stops.map(([x, y]) => `${x},${y}`).join(" ")} stroke="#E8EDF5" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={stops.map(([x, y]) => `${x},${y}`).join(" ")} stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="10 8" strokeLinecap="round" opacity="0.45" />

      {/* Stops */}
      {stops.map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y - 14} x2={x} y2={y - (compact ? 30 : 34)} stroke="#94A3B8" strokeWidth="1.5" />
          <rect x={x - 30} y={y - (compact ? 48 : 52)} width="60" height="14" rx="3" fill="white" stroke="#E2E8F0" strokeWidth="1" />
          <text x={x} y={y - (compact ? 40 : 44)} textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="Sora,sans-serif" fontWeight="600">
            {stopNames[i]}
          </text>
          <circle cx={x} cy={y} r="13" fill="white" stroke="#1B4FD8" strokeWidth="2" />
          <circle cx={x} cy={y} r="5" fill="#1B4FD8" />
        </g>
      ))}

      {/* Buses */}
      {buses.map(({ id, progress, color }) => {
        const [bx, by] = getBusPos(progress);
        const angle = getAngle(progress);
        return (
          <g key={id} transform={`translate(${bx},${by})`}>
            <g transform={`rotate(${angle})`}>
              <rect x="-15" y="-9" width="30" height="18" rx="4" fill={color} />
              <rect x="-12" y="-6.5" width="8" height="5.5" rx="1" fill="white" opacity="0.88" />
              <rect x="-2" y="-6.5" width="8" height="5.5" rx="1" fill="white" opacity="0.88" />
              <circle cx="-8" cy="9" r="3.5" fill="#1E293B" />
              <circle cx="8" cy="9" r="3.5" fill="#1E293B" />
              <circle cx="-8" cy="9" r="1.5" fill="#94A3B8" />
              <circle cx="8" cy="9" r="1.5" fill="#94A3B8" />
            </g>
            <rect x="-15" y="-24" width="30" height="12" rx="3" fill={color} />
            <text y="-14" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="Sora,sans-serif" fontWeight="700">
              {id}
            </text>
          </g>
        );
      })}

      {/* ETA overlay */}
      <rect x="10" y="10" width="115" height="46" rx="9" fill="white" opacity="0.96" filter="url(#ms)" />
      <text x="22" y="28" fill="#94A3B8" fontSize="9" fontFamily="Sora,sans-serif" fontWeight="500">ETA to Campus</text>
      <text x="22" y="49" fill="#1B4FD8" fontSize="17" fontWeight="800" fontFamily="Sora,sans-serif">8 min</text>

      {/* Live badge */}
      <rect x="456" y="10" width="52" height="22" rx="11" fill="#22C55E" />
      <circle cx="470" cy="21" r="3" fill="white" opacity="0.82" />
      <text x="482" y="25" fill="white" fontSize="9" fontWeight="700" fontFamily="Sora,sans-serif">LIVE</text>
    </svg>
  );
}
