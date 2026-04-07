import { useState } from "react";
import { Bus, Users, AlertTriangle, TrendingDown, TrendingUp, Plus, Edit2, MapPin } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, LineChart, Line,
} from "recharts";
import { toast } from "sonner";

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "20px 22px", boxShadow: "0 2px 10px #1B4FD80A", ...style }}>
      {children}
    </div>
  );
}

function StatCard({
  icon: Icon, label, value, sub, trend, up, color = "#1B4FD8", bg = "#EEF3FF",
}: {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string; value: string; sub?: string; trend?: string; up?: boolean | null; color?: string; bg?: string;
}) {
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>{sub}</div>}
          {trend && (
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
              {up === true && <TrendingUp size={12} color="#22C55E" />}
              {up === false && <TrendingDown size={12} color="#EF4444" />}
              <span style={{ fontSize: 11, color: up === true ? "#22C55E" : up === false ? "#EF4444" : "#94A3B8", fontWeight: 600 }}>{trend}</span>
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

const maeRmseData = [
  { day: "Mon", MAE: 2.3, RMSE: 3.1 },
  { day: "Tue", MAE: 3.1, RMSE: 4.2 },
  { day: "Wed", MAE: 1.8, RMSE: 2.4 },
  { day: "Thu", MAE: 2.6, RMSE: 3.5 },
  { day: "Fri", MAE: 1.4, RMSE: 1.9 },
  { day: "Sat", MAE: 2.9, RMSE: 3.8 },
  { day: "Sun", MAE: 2.1, RMSE: 2.7 },
];

const tripData = [
  { day: "Mon", Trips: 42 },
  { day: "Tue", Trips: 48 },
  { day: "Wed", Trips: 44 },
  { day: "Thu", Trips: 52 },
  { day: "Fri", Trips: 56 },
  { day: "Sat", Trips: 24 },
  { day: "Sun", Trips: 18 },
];

const busesData = [
  { id: "RIT-01", driver: "Rajan M.", route: "Main Gate → Porur", status: "Active", km: 142 },
  { id: "RIT-02", driver: "Selvam K.", route: "Tambaram → Campus", status: "Delayed", km: 98 },
  { id: "RIT-03", driver: "Murugan S.", route: "Chromepet → Campus", status: "Active", km: 167 },
  { id: "RIT-04", driver: "Arjun P.", route: "Pallavaram → Campus", status: "In Depot", km: 0 },
  { id: "RIT-05", driver: "Kumar V.", route: "Velachery → Campus", status: "Active", km: 119 },
];

function BusIcon({ size = 14, color = "#1B4FD8" }: { size?: number; color?: string }) {
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

export function AdminPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? busesData : busesData.filter((b) => b.status === filter);

  const statusColor = (s: string) =>
    s === "Active" ? "#22C55E" : s === "Delayed" ? "#F59E0B" : "#94A3B8";
  const statusBg = (s: string) =>
    s === "Active" ? "#F0FDF4" : s === "Delayed" ? "#FFFBEB" : "#F1F5F9";

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 24, color: "#0F172A", margin: 0 }}>
          Admin Dashboard
        </h1>
        <p style={{ color: "#64748B", fontSize: 14, margin: "4px 0 0" }}>
          Fleet analytics, route management, and system performance
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 22 }}>
        <StatCard icon={Bus} label="Total Fleet" value="12" sub="4 in depot" trend="+0 this week" up={null} />
        <StatCard icon={MapPin} label="Routes" value="8" sub="All active" trend="Stable" up={null} color="#22C55E" bg="#F0FDF4" />
        <StatCard icon={Users} label="Drivers" value="12" sub="On duty: 8" trend="Full coverage" up={true} color="#F59E0B" bg="#FFFBEB" />
        <StatCard icon={AlertTriangle} label="Incidents" value="0" sub="Today" trend="All clear" up={null} color="#22C55E" bg="#F0FDF4" />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* MAE + RMSE */}
        <Card style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: "#0F172A", margin: 0 }}>
                Prediction Accuracy (MAE & RMSE)
              </h3>
              <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>Weekly error metrics in minutes</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ textAlign: "center", background: "#EEF3FF", borderRadius: 10, padding: "8px 14px" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#1B4FD8" }}>2.31</div>
                <div style={{ fontSize: 10, color: "#64748B" }}>Avg MAE</div>
                <div style={{ fontSize: 10, color: "#22C55E", fontWeight: 600 }}>↓ 8%</div>
              </div>
              <div style={{ textAlign: "center", background: "#F5F3FF", borderRadius: 10, padding: "8px 14px" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#8B5CF6" }}>3.14</div>
                <div style={{ fontSize: 10, color: "#64748B" }}>Avg RMSE</div>
                <div style={{ fontSize: 10, color: "#22C55E", fontWeight: 600 }}>↓ 5%</div>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={maeRmseData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "Sora, sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8", fontFamily: "Sora, sans-serif" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontFamily: "Sora, sans-serif", fontSize: 12 }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, fontFamily: "Sora, sans-serif" }} />
              <Bar dataKey="MAE" fill="#1B4FD8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="RMSE" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Daily Trips */}
        <Card>
          <div style={{ marginBottom: 14 }}>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: "#0F172A", margin: "0 0 2px" }}>
              Daily Trips
            </h3>
            <div style={{ fontSize: 12, color: "#94A3B8" }}>This week</div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#22C55E", marginBottom: 4 }}>284</div>
          <div style={{ fontSize: 12, color: "#22C55E", fontWeight: 600, marginBottom: 12 }}>
            <TrendingUp size={12} style={{ display: "inline", marginRight: 4 }} />
            +14% from last week
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={tripData} margin={{ top: 4, right: 4, bottom: 0, left: -30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94A3B8", fontFamily: "Sora, sans-serif" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontFamily: "Sora, sans-serif", fontSize: 11 }} />
              <Line type="monotone" dataKey="Trips" stroke="#22C55E" strokeWidth={2.5} dot={{ fill: "#22C55E", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Fleet Management */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>
            Bus & Route Management
          </h3>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {/* Filter */}
            <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 10, padding: 3, gap: 2 }}>
              {["All", "Active", "Delayed", "In Depot"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 8,
                    border: "none",
                    background: filter === f ? "#fff" : "transparent",
                    color: filter === f ? "#1B4FD8" : "#94A3B8",
                    cursor: "pointer",
                    fontSize: 12,
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: filter === f ? 600 : 400,
                    boxShadow: filter === f ? "0 1px 4px #1B4FD815" : "none",
                    transition: "all .15s",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <button
              onClick={() => toast.success("Opening add bus form...")}
              style={{
                padding: "8px 16px",
                background: "#1B4FD8",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontFamily: "'Sora', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Plus size={14} /> Add Bus
            </button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFF" }}>
                {["Bus ID", "Driver", "Route", "Status", "KM Today", "Occupancy", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 14px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#94A3B8",
                      borderBottom: "1px solid #E2E8F0",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => {
                const occ = b.km > 0 ? Math.floor(Math.random() * 20 + 22) : 0;
                const cap = 40;
                return (
                  <tr key={b.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F1F5F9" : "none", transition: "background .1s" }}>
                    <td style={{ padding: "14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 30, height: 30, borderRadius: 8, background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <BusIcon size={14} color="#1B4FD8" />
                        </div>
                        <span style={{ fontWeight: 700, color: "#0F172A", fontSize: 14 }}>{b.id}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px", color: "#374151", fontSize: 14 }}>{b.driver}</td>
                    <td style={{ padding: "14px", color: "#64748B", fontSize: 13 }}>{b.route}</td>
                    <td style={{ padding: "14px" }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          borderRadius: 20,
                          padding: "4px 12px",
                          background: statusBg(b.status),
                          color: statusColor(b.status),
                          border: `1px solid ${statusColor(b.status)}30`,
                        }}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px", color: "#374151", fontSize: 14, fontWeight: 600 }}>
                      {b.km > 0 ? `${b.km} km` : "—"}
                    </td>
                    <td style={{ padding: "14px" }}>
                      {b.km > 0 ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 100 }}>
                          <div style={{ flex: 1, height: 5, background: "#E2E8F0", borderRadius: 3 }}>
                            <div
                              style={{
                                width: `${(occ / cap) * 100}%`,
                                height: "100%",
                                background: (occ / cap) > 0.85 ? "#EF4444" : "#1B4FD8",
                                borderRadius: 3,
                              }}
                            />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 600, color: "#374151", whiteSpace: "nowrap" }}>{occ}/{cap}</span>
                        </div>
                      ) : (
                        <span style={{ color: "#94A3B8", fontSize: 13 }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: "14px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => toast.info(`Editing ${b.id}...`)}
                          style={{
                            padding: "6px 12px",
                            border: "1px solid #E2E8F0",
                            borderRadius: 7,
                            background: "#fff",
                            fontSize: 12,
                            color: "#374151",
                            cursor: "pointer",
                            fontFamily: "'Sora', sans-serif",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Edit2 size={11} /> Edit
                        </button>
                        <button
                          onClick={() => toast.success(`Tracking ${b.id}...`)}
                          style={{
                            padding: "6px 12px",
                            border: "none",
                            borderRadius: 7,
                            background: "#EEF3FF",
                            fontSize: 12,
                            color: "#1B4FD8",
                            cursor: "pointer",
                            fontFamily: "'Sora', sans-serif",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <MapPin size={11} /> Track
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "32px", color: "#94A3B8", fontSize: 14 }}>
              No buses match this filter.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}