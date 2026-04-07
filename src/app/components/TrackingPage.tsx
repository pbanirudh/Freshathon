import { useState } from "react";
import { MapPin, Gauge, Signal, Users, User, ChevronRight, CheckCircle2 } from "lucide-react";
import { LiveMap } from "./LiveMap";

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "20px 22px", boxShadow: "0 2px 10px #1B4FD80A", ...style }}>
      {children}
    </div>
  );
}

function BusIcon({ size = 16, color = "#1B4FD8" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <circle cx="7" cy="19" r="1" fill={color} stroke="none" />
      <circle cx="17" cy="19" r="1" fill={color} stroke="none" />
      <path d="M5 5V3" />
      <path d="M19 5V3" />
    </svg>
  );
}

const busData = [
  {
    id: "RIT-01",
    route: "Main Gate → Porur",
    eta: "8 min",
    status: "On Time",
    driver: "Rajan M.",
    speed: 42,
    passengers: 32,
    cap: 40,
    signal: 98,
    stops: ["Main Gate", "Porur Jn.", "Koyambedu", "RIT Campus"],
    currentStop: 2,
  },
  {
    id: "RIT-02",
    route: "Tambaram → Campus",
    eta: "18 min",
    status: "Delayed",
    driver: "Selvam K.",
    speed: 28,
    passengers: 28,
    cap: 40,
    signal: 84,
    stops: ["Tambaram", "Perungalathur", "Guduvanchery", "RIT Campus"],
    currentStop: 1,
  },
  {
    id: "RIT-03",
    route: "Chromepet → Campus",
    eta: "5 min",
    status: "On Time",
    driver: "Murugan S.",
    speed: 55,
    passengers: 38,
    cap: 40,
    signal: 96,
    stops: ["Chromepet", "Pallavaram", "Vandalur", "RIT Campus"],
    currentStop: 3,
  },
];

export function TrackingPage() {
  const [selected, setSelected] = useState("RIT-01");
  const bus = busData.find((b) => b.id === selected)!;

  const statusColor = bus.status === "On Time" ? "#22C55E" : "#F59E0B";
  const statusBg = bus.status === "On Time" ? "#F0FDF4" : "#FFFBEB";

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 24, color: "#0F172A", margin: 0 }}>
          Live Tracking
        </h1>
        <p style={{ color: "#64748B", fontSize: 14, margin: "4px 0 0" }}>
          Real-time GPS tracking for all RIT buses
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "290px 1fr", gap: 20 }}>
        {/* Bus list */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>
            Select Bus
          </div>
          {busData.map((b) => {
            const isActive = selected === b.id;
            const sc = b.status === "On Time" ? "#22C55E" : "#F59E0B";
            const sbg = b.status === "On Time" ? "#F0FDF4" : "#FFFBEB";
            return (
              <div
                key={b.id}
                onClick={() => setSelected(b.id)}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  marginBottom: 10,
                  cursor: "pointer",
                  border: isActive ? "2px solid #1B4FD8" : "1px solid #E2E8F0",
                  background: isActive ? "#EEF3FF" : "#fff",
                  transition: "all .15s",
                  boxShadow: isActive ? "0 2px 12px #1B4FD815" : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: isActive ? "#1B4FD8" : "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <BusIcon size={16} color={isActive ? "#fff" : "#1B4FD8"} />
                  </div>
                  <span style={{ fontWeight: 700, color: "#0F172A", fontSize: 14, flex: 1 }}>{b.id}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "3px 10px", background: sbg, color: sc }}>
                    {b.status}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "#64748B", marginBottom: 4 }}>{b.route}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#1B4FD8" }}>ETA: {b.eta}</span>
                  <span style={{ fontSize: 12, color: "#94A3B8" }}>{b.passengers}/{b.cap} seats</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Map */}
          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>
                  {bus.id} — {bus.route}
                </h3>
                <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>
                  Driver: {bus.driver}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ background: "#EEF3FF", color: "#1B4FD8", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                  <MapPin size={12} /> GPS Active
                </span>
                <span style={{ background: statusBg, color: statusColor, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, border: `1px solid ${statusColor}30` }}>
                  {bus.status}
                </span>
              </div>
            </div>
            <LiveMap selectedBus={selected} />
          </Card>

          {/* Route timeline */}
          <Card>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: "#0F172A", margin: "0 0 18px" }}>
              Route Progress
            </h3>
            <div style={{ display: "flex", alignItems: "flex-start", padding: "6px 10px" }}>
              {bus.stops.map((stop, i) => {
                const done = i < bus.currentStop;
                const current = i === bus.currentStop;
                const upcoming = i > bus.currentStop;
                return (
                  <div key={stop} style={{ display: "flex", alignItems: "flex-start", flex: i < bus.stops.length - 1 ? 1 : "none" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 1 }}>
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: current ? 16 : 13,
                          fontWeight: 700,
                          background: done ? "#1B4FD8" : current ? "#F97316" : "#F1F5F9",
                          color: done || current ? "#fff" : "#94A3B8",
                          border: current ? "3px solid #FED7AA" : "none",
                          boxShadow: current ? "0 0 0 4px #FFF7ED" : "none",
                          transition: "all .3s",
                        }}
                      >
                        {done ? <CheckCircle2 size={18} /> : current ? "🚌" : i + 1}
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: done ? "#1B4FD8" : current ? "#F97316" : "#94A3B8",
                          fontWeight: done || current ? 600 : 400,
                          textAlign: "center",
                          maxWidth: 72,
                          lineHeight: 1.4,
                        }}
                      >
                        {stop}
                      </div>
                    </div>
                    {i < bus.stops.length - 1 && (
                      <div
                        style={{
                          flex: 1,
                          height: 4,
                          marginTop: 16,
                          background: done ? "#1B4FD8" : "#E2E8F0",
                          borderRadius: 2,
                          transition: "background .3s",
                          marginLeft: 2,
                          marginRight: 2,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
            {[
              { icon: MapPin, label: "ETA", value: bus.eta, color: "#1B4FD8", bg: "#EEF3FF" },
              { icon: Gauge, label: "Speed", value: `${bus.speed} km/h`, color: "#F59E0B", bg: "#FFFBEB" },
              { icon: Users, label: "Passengers", value: `${bus.passengers}/${bus.cap}`, color: "#22C55E", bg: "#F0FDF4" },
              { icon: Signal, label: "GPS Signal", value: `${bus.signal}%`, color: "#8B5CF6", bg: "#F5F3FF" },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", padding: "16px", textAlign: "center", boxShadow: "0 2px 8px #1B4FD808" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                  <Icon size={20} color={color} />
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", fontFamily: "'Sora', sans-serif" }}>{value}</div>
                <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Driver info */}
          <Card>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg, #1B4FD8, #60A5FA)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <User size={22} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#0F172A" }}>{bus.driver}</div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>Assigned Driver — {bus.id}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ padding: "8px 16px", background: "#EEF3FF", color: "#1B4FD8", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "'Sora', sans-serif", fontWeight: 600 }}>
                  Contact
                </button>
                <button style={{ padding: "8px 16px", background: "#1B4FD8", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "'Sora', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  Track <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
