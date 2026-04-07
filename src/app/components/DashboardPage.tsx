import { useState, useEffect } from "react";
import { Bus, Users, Clock, Shield, TrendingUp, TrendingDown, ArrowRight, MapPin, Minus } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { LiveMap } from "./LiveMap";

const ridershipData = [
  { day: "Mon", Students: 380, Staff: 42 },
  { day: "Tue", Students: 422, Staff: 48 },
  { day: "Wed", Students: 398, Staff: 44 },
  { day: "Thu", Students: 465, Staff: 52 },
  { day: "Fri", Students: 486, Staff: 56 },
  { day: "Sat", Students: 198, Staff: 22 },
];

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #E2E8F0",
        padding: "20px 22px",
        boxShadow: "0 2px 10px #1B4FD80A",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  value: string;
  sub?: string;
  trend?: string;
  up?: boolean | null;
  color?: string;
  bg?: string;
}

function StatCard({ icon: Icon, label, value, sub, trend, up, color = "#1B4FD8", bg = "#EEF3FF" }: StatCardProps) {
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
            {label}
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>{sub}</div>}
          {trend && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
              {up === true && <TrendingUp size={12} color="#22C55E" />}
              {up === false && <TrendingDown size={12} color="#EF4444" />}
              {up === null && <Minus size={12} color="#94A3B8" />}
              <span style={{ fontSize: 11, color: up === true ? "#22C55E" : up === false ? "#EF4444" : "#94A3B8", fontWeight: 600 }}>
                {trend}
              </span>
            </div>
          )}
        </div>
        <div style={{ width: 46, height: 46, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={22} color={color} />
        </div>
      </div>
    </Card>
  );
}

const buses = [
  { id: "RIT-01", route: "Main Gate → Porur", status: "On Time", eta: "8 min", passengers: 32, cap: 40, color: "#22C55E", driver: "Rajan M." },
  { id: "RIT-02", route: "Tambaram → Campus", status: "Delayed", eta: "18 min", passengers: 28, cap: 40, color: "#F59E0B", driver: "Selvam K." },
  { id: "RIT-03", route: "Chromepet → Campus", status: "On Time", eta: "5 min", passengers: 38, cap: 40, color: "#22C55E", driver: "Murugan S." },
];

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

export function DashboardPage({ role }: { role: string }) {
  const [eta, setEta] = useState(8);
  useEffect(() => {
    const t = setInterval(() => setEta((e) => (e <= 1 ? 8 : e - 1)), 4000);
    return () => clearInterval(t);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ padding: "28px 32px" }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 24, color: "#0F172A", margin: 0 }}>
            {greeting}, {role === "admin" ? "Admin" : "Student"}! 👋
          </h1>
          <p style={{ color: "#64748B", fontSize: 14, margin: "4px 0 0" }}>Here's your live bus overview for today.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F0FDF4", borderRadius: 10, padding: "8px 14px", border: "1px solid #BBF7D0" }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: "#22C55E", display: "inline-block", animation: "pulse 1.8s infinite" }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "#16A34A" }}>All systems operational</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 22 }}>
        <StatCard icon={Bus} label="Active Buses" value="12" sub="2 in depot" trend="+1 from yesterday" up={true} />
        <StatCard icon={Users} label="Students Today" value="486" sub="Across all routes" trend="+24 from yesterday" up={true} color="#22C55E" bg="#F0FDF4" />
        <StatCard icon={Clock} label="Avg ETA" value="11 min" sub="Across all routes" trend="−2 min from avg" up={true} color="#F59E0B" bg="#FFFBEB" />
        <StatCard icon={Shield} label="Safety Score" value="98%" sub="Excellent" trend="Stable" up={null} color="#22C55E" bg="#F0FDF4" />
      </div>

      {/* Map + My Bus */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>Live Bus Map</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {[["#1B4FD8", "RIT-01"], ["#F59E0B", "RIT-02"], ["#22C55E", "RIT-03"]].map(([color, id]) => (
                <span key={id} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#64748B" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: "inline-block" }} />
                  {id}
                </span>
              ))}
            </div>
          </div>
          <LiveMap />
        </Card>

        <Card>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: "0 0 14px" }}>My Bus</h3>
          <div style={{ background: "linear-gradient(135deg, #EEF3FF, #F0F4FF)", borderRadius: 12, padding: "18px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: "#1B4FD8", fontFamily: "'Sora', sans-serif", lineHeight: 1 }}>{eta}</div>
            <div style={{ color: "#64748B", fontSize: 13, marginTop: 4 }}>minutes away</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Bus Number</div>
            <div style={{ fontWeight: 700, color: "#0F172A", display: "flex", alignItems: "center", gap: 6, fontSize: 15 }}>
              <BusIcon size={16} color="#1B4FD8" /> RIT-01
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Route</div>
            <div style={{ fontWeight: 600, color: "#0F172A", fontSize: 14 }}>Main Gate → Porur</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Driver</div>
            <div style={{ fontWeight: 600, color: "#0F172A", fontSize: 14 }}>Rajan M.</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>Occupancy</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1, height: 7, background: "#E2E8F0", borderRadius: 4 }}>
                <div style={{ width: "80%", height: "100%", background: "linear-gradient(90deg, #1B4FD8, #60A5FA)", borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>32/40</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: "#0F172A", margin: 0 }}>Weekly Ridership</h3>
            <span style={{ fontSize: 12, color: "#64748B", background: "#F1F5F9", borderRadius: 8, padding: "3px 10px" }}>This week</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={ridershipData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B4FD8" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#1B4FD8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gStaff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "Sora, sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "Sora, sans-serif" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontFamily: "Sora, sans-serif", fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, fontFamily: "Sora, sans-serif" }} />
              <Area type="monotone" dataKey="Students" stroke="#1B4FD8" strokeWidth={2.5} fill="url(#gStudents)" />
              <Area type="monotone" dataKey="Staff" stroke="#22C55E" strokeWidth={2.5} fill="url(#gStaff)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: "#0F172A", margin: 0 }}>Fleet Status</h3>
            <span style={{ fontSize: 12, color: "#64748B", background: "#F1F5F9", borderRadius: 8, padding: "3px 10px" }}>Live</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { label: "On Time", value: 8, color: "#22C55E", bg: "#F0FDF4" },
              { label: "Delayed", value: 2, color: "#F59E0B", bg: "#FFFBEB" },
              { label: "In Depot", value: 2, color: "#94A3B8", bg: "#F8FAFF" },
              { label: "Total", value: 12, color: "#1B4FD8", bg: "#EEF3FF" },
            ].map((item) => (
              <div key={item.label} style={{ background: item.bg, borderRadius: 10, padding: "12px 14px", border: `1px solid ${item.color}22` }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: item.color }}>{item.value}</div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{item.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#F8FAFF", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 8, fontWeight: 600 }}>ROUTE COMPLETION</div>
            {[
              { route: "Main Gate → Porur", pct: 68 },
              { route: "Tambaram → Campus", pct: 42 },
              { route: "Chromepet → Campus", pct: 85 },
            ].map((r) => (
              <div key={r.route} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: "#64748B" }}>{r.route}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#0F172A" }}>{r.pct}%</span>
                </div>
                <div style={{ height: 5, background: "#E2E8F0", borderRadius: 3 }}>
                  <div style={{ width: `${r.pct}%`, height: "100%", background: "#1B4FD8", borderRadius: 3, transition: "width .5s" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* All Routes */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>All Routes</h3>
          <button style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#1B4FD8", fontFamily: "'Sora', sans-serif", fontWeight: 600 }}>
            View all <ArrowRight size={14} />
          </button>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {buses.map((b) => (
            <div
              key={b.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 16px",
                background: "#F8FAFF",
                borderRadius: 12,
                border: "1px solid #F1F5F9",
                transition: "all .15s",
              }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 11, background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BusIcon size={20} color="#1B4FD8" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 14 }}>{b.id}</div>
                <div style={{ color: "#64748B", fontSize: 12, marginTop: 2 }}>{b.route}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 14 }}>{b.eta}</div>
                <div style={{ fontSize: 11, color: "#94A3B8" }}>ETA</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#374151", fontWeight: 600 }}>{b.passengers}/{b.cap}</div>
                <div style={{ fontSize: 11, color: "#94A3B8" }}>seats</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748B" }}>
                <MapPin size={12} />
                {b.driver}
              </div>
              <div
                style={{
                  background: b.color + "18",
                  color: b.color,
                  borderRadius: 20,
                  padding: "5px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  border: `1px solid ${b.color}30`,
                }}
              >
                {b.status}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
