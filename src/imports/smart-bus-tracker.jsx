import { useState, useEffect, useRef } from "react";
import React from 'react';
import logoFile from "C:\Users\USER\OneDrive\Desktop\Freshathon-main\ritlogo.png"



const COLORS = {
  primary: "#1B4FD8",
  primaryDark: "#1340B0",
  primaryLight: "#EEF3FF",
  accent: "#22C55E",
  danger: "#EF4444",
  warning: "#F59E0B",
  dark: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  white: "#FFFFFF",
};

export function RITLogo({ size = 48 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#1B4FD8 60%,#93C5FD 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px #1B4FD840",
          flexShrink: 0,
          overflow: "hidden"
        }}
      >
        <img 
          src={logoFile} 
          alt="RIT Logo" 
          style={{ width: "70%", height: "auto", display: "block" }} 
        />
      </div>
      <div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: size * 0.38, color: "#1B4FD8", letterSpacing: 1, lineHeight: 1 }}>rit</div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 500, fontSize: size * 0.18, color: "#1340B0", lineHeight: 1.2 }}>
          RAJALAKSHMI<br />INSTITUTE OF TECHNOLOGY
        </div>
      </div>
    </div>
  );
}

// ─── Bus Icon ────────────────────────────────────────────────────────────────
function BusIcon({ size = 20, color = "#fff" }) {
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

// ─── Map Illustration ────────────────────────────────────────────────────────
function MapIllustration() {
  const [busPos, setBusPos] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setBusPos(p => (p + 1) % 100), 80);
    return () => clearInterval(t);
  }, []);
  const path = [
    [60, 200], [120, 160], [200, 150], [280, 170], [340, 140],
    [400, 160], [460, 130], [500, 150],
  ];
  const idx = Math.floor((busPos / 100) * (path.length - 1));
  const t = ((busPos / 100) * (path.length - 1)) % 1;
  const bx = path[idx][0] + (path[Math.min(idx + 1, path.length - 1)][0] - path[idx][0]) * t;
  const by = path[idx][1] + (path[Math.min(idx + 1, path.length - 1)][1] - path[idx][1]) * t;
  return (
    <svg viewBox="0 0 560 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect width="560" height="380" fill="#EEF3FF" rx="20" />
      {/* Grid lines */}
      {[0,1,2,3,4,5].map(i => (
        <line key={i} x1={i*100} y1="0" x2={i*100} y2="380" stroke="#CBD5E1" strokeWidth="0.5" />
      ))}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1="0" y1={i*90} x2="560" y2={i*90} stroke="#CBD5E1" strokeWidth="0.5" />
      ))}
      {/* Roads */}
      <polyline points={path.map(p => p.join(",")).join(" ")} stroke="#94A3B8" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={path.map(p => p.join(",")).join(" ")} stroke="#E2E8F0" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={path.map(p => p.join(",")).join(" ")} stroke="#1B4FD8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12 8" opacity="0.6" />
      {/* Bus stops */}
      {[[120,160],[280,170],[460,130]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="14" fill="#fff" stroke="#1B4FD8" strokeWidth="2" />
          <circle cx={x} cy={y} r="6" fill="#1B4FD8" />
          <rect x={x-1} y={y-28} width="2" height="18" fill="#1B4FD8" />
        </g>
      ))}
      {/* Bus */}
      <g transform={`translate(${bx-16},${by-10})`}>
        <rect width="32" height="20" rx="5" fill="#1B4FD8" />
        <rect x="3" y="4" width="8" height="6" rx="1" fill="#BAE6FD" />
        <rect x="13" y="4" width="8" height="6" rx="1" fill="#BAE6FD" />
        <circle cx="7" cy="20" r="4" fill="#0F172A" />
        <circle cx="25" cy="20" r="4" fill="#0F172A" />
        <circle cx="7" cy="20" r="2" fill="#94A3B8" />
        <circle cx="25" cy="20" r="2" fill="#94A3B8" />
        <circle cx="28" cy="10" r="4" fill="#F97316" opacity="0.9" />
      </g>
      {/* Destination marker */}
      <g>
        <circle cx="500" cy="150" r="14" fill="#22C55E" opacity="0.2" />
        <circle cx="500" cy="150" r="8" fill="#22C55E" />
        <text x="500" y="170" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="600">DEST</text>
      </g>
      {/* ETA card */}
      <rect x="20" y="20" width="130" height="50" rx="10" fill="white" style={{ filter: "drop-shadow(0 4px 8px #1B4FD820)" }} />
      <text x="35" y="40" fill="#64748B" fontSize="10" fontFamily="Sora,sans-serif">ETA to Campus</text>
      <text x="35" y="60" fill="#1B4FD8" fontSize="18" fontWeight="700" fontFamily="Sora,sans-serif">12 min</text>
    </svg>
  );
}

// ─── Fake Map for Dashboard ──────────────────────────────────────────────────
function LiveMap({ compact = false }) {
  const [bus, setBus] = useState(0);
  const stops = [[120,80],[200,110],[290,90],[380,120],[460,90]];
  useEffect(() => {
    const t = setInterval(() => setBus(p => (p + 1) % 100), 100);
    return () => clearInterval(t);
  }, []);
  const idx = Math.floor((bus / 100) * (stops.length - 1));
  const frac = ((bus / 100) * (stops.length - 1)) % 1;
  const bx = stops[idx][0] + (stops[Math.min(idx+1,stops.length-1)][0]-stops[idx][0])*frac;
  const by = stops[idx][1] + (stops[Math.min(idx+1,stops.length-1)][1]-stops[idx][1])*frac;
  const h = compact ? 180 : 260;
  return (
    <svg viewBox={`0 0 580 ${h}`} style={{ width:"100%",height:h,borderRadius:16,background:"#EEF3FF" }}>
      {[0,1,2,3,4,5].map(i=><line key={i} x1={i*120} y1="0" x2={i*120} y2={h} stroke="#CBD5E1" strokeWidth="0.5"/>)}
      {[0,1,2,3].map(i=><line key={i} x1="0" y1={i*70} x2="580" y2={i*70} stroke="#CBD5E1" strokeWidth="0.5"/>)}
      <polyline points={stops.map(p=>p.join(",")).join(" ")} stroke="#94A3B8" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points={stops.map(p=>p.join(",")).join(" ")} stroke="#EEF3FF" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points={stops.map(p=>p.join(",")).join(" ")} stroke="#1B4FD8" strokeWidth="2.5" strokeDasharray="10 6" strokeLinecap="round" strokeLinejoin="round" opacity="0.7"/>
      {stops.map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="12" fill="#fff" stroke="#1B4FD8" strokeWidth="2"/>
          <circle cx={x} cy={y} r="5" fill="#1B4FD8"/>
        </g>
      ))}
      <g transform={`translate(${bx-13},${by-8})`}>
        <rect width="26" height="16" rx="4" fill="#1B4FD8"/>
        <rect x="2" y="3" width="6" height="4" rx="1" fill="#BAE6FD"/>
        <rect x="10" y="3" width="6" height="4" rx="1" fill="#BAE6FD"/>
        <circle cx="5" cy="16" r="3.5" fill="#0F172A"/><circle cx="5" cy="16" r="1.5" fill="#94A3B8"/>
        <circle cx="21" cy="16" r="3.5" fill="#0F172A"/><circle cx="21" cy="16" r="1.5" fill="#94A3B8"/>
      </g>
      <rect x="10" y="10" width="100" height="38" rx="8" fill="white" opacity="0.95"/>
      <text x="20" y="26" fill="#64748B" fontSize="9" fontFamily="Sora,sans-serif">ETA</text>
      <text x="20" y="42" fill="#1B4FD8" fontSize="14" fontWeight="700" fontFamily="Sora,sans-serif">12 min</text>
    </svg>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const navItems = [
  { id:"dashboard", label:"Dashboard", icon:"🏠" },
  { id:"tracking", label:"Live Tracking", icon:"📍" },
  { id:"safety", label:"Safety Panel", icon:"🛡️" },
  { id:"admin", label:"Admin Panel", icon:"⚙️", adminOnly:true },
];

function Sidebar({ page, setPage, role, onLogout }) {
  return (
    <div style={{
      width: 220, minHeight: "100vh", background: "#fff",
      borderRight: "1px solid #E2E8F0", display: "flex",
      flexDirection: "column", padding: "0", flexShrink: 0,
      boxShadow: "2px 0 12px #1B4FD808",
    }}>
      <div style={{ padding: "22px 20px 16px", borderBottom: "1px solid #E2E8F0" }}>
        <RITLogo size={36} />
        <div style={{ marginTop: 10, padding: "6px 10px", background: "#EEF3FF", borderRadius: 8, display: "inline-block" }}>
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 11, fontWeight: 600, color: "#1B4FD8" }}>🚌 Smart Bus Tracker</span>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {navItems.filter(n => !n.adminOnly || role === "admin").map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "11px 14px", borderRadius: 10, marginBottom: 4,
              border: "none", cursor: "pointer", textAlign: "left",
              background: page === item.id ? "#EEF3FF" : "transparent",
              color: page === item.id ? "#1B4FD8" : "#64748B",
              fontFamily: "'Sora',sans-serif", fontWeight: page === item.id ? 600 : 400,
              fontSize: 14, transition: "all .15s",
            }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
            {page === item.id && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: 2, background: "#1B4FD8" }} />}
          </button>
        ))}
      </nav>
      <div style={{ padding: "16px 12px", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg,#1B4FD8,#60A5FA)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'Sora',sans-serif",
          }}>
            {role === "admin" ? "AD" : "ST"}
          </div>
          <div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 13, color: "#0F172A" }}>
              {role === "admin" ? "Admin" : "Student"}
            </div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 11, color: "#94A3B8" }}>RIT Campus</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{
            width: "100%", padding: "8px 0", borderRadius: 8,
            border: "1px solid #E2E8F0", background: "#fff",
            color: "#64748B", fontFamily: "'Sora',sans-serif",
            fontSize: 13, cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── Login Page ──────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) { setError("Please fill all fields"); return; }
    onLogin(role);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      fontFamily: "'Sora',sans-serif", background: "#F8FAFF",
    }}>
      {/* Left panel */}
      <div style={{
        flex: 1, background: "linear-gradient(145deg,#1340B0 0%,#1B4FD8 60%,#3B82F6 100%)",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: 48, position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "#ffffff0d" }} />
        <div style={{ position: "absolute", bottom: -60, right: -60, width: 250, height: 250, borderRadius: "50%", background: "#ffffff0a" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 400 }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "#ffffff18", borderRadius: 14, padding: "10px 20px",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%", background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="28" height="28" viewBox="0 0 32 36" fill="none">
                  <path d="M16 2C10 2 6 8 6 14C6 22 16 34 16 34C16 34 26 22 26 14C26 8 22 2 16 2Z" fill="#EEF3FF"/>
                  <path d="M16 5L16 28" stroke="#1B4FD8" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16 10L11 15" stroke="#1B4FD8" strokeWidth="1.3" strokeLinecap="round"/>
                  <path d="M16 10L21 15" stroke="#1B4FD8" strokeWidth="1.3" strokeLinecap="round"/>
                  <path d="M16 17L12 21" stroke="#1B4FD8" strokeWidth="1.1" strokeLinecap="round"/>
                  <path d="M16 17L20 21" stroke="#1B4FD8" strokeWidth="1.1" strokeLinecap="round"/>
                  <circle cx="16" cy="10" r="2" fill="#F97316"/>
                </svg>
              </div>
              <div style={{ color: "#fff", textAlign: "left" }}>
                <div style={{ fontWeight: 800, fontSize: 22, letterSpacing: 1 }}>rit</div>
                <div style={{ fontSize: 10, opacity: 0.8 }}>RAJALAKSHMI INSTITUTE OF TECHNOLOGY</div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <MapIllustration />
          </div>
          <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 700, margin: "0 0 12px" }}>
            Safe Travel Starts Here
          </h2>
          <p style={{ color: "#BAE6FD", fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            Real-time bus tracking, live ETA updates, and safety features — all in one platform for RIT students and staff.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 32 }}>
            {[["🚌","12 Buses"],["📍","Live GPS"],["🛡️","Safe Rides"]].map(([icon,label]) => (
              <div key={label} style={{ background: "#ffffff15", borderRadius: 10, padding: "10px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 20 }}>{icon}</div>
                <div style={{ color: "#fff", fontSize: 11, fontWeight: 600, marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        width: 460, display: "flex", alignItems: "center",
        justifyContent: "center", padding: 40, background: "#fff",
        boxShadow: "-4px 0 30px #1B4FD812",
      }}>
        <div style={{ width: "100%", maxWidth: 360 }}>
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", margin: "0 0 8px" }}>Welcome back</h1>
            <p style={{ color: "#64748B", fontSize: 15, margin: 0 }}>Sign in to your RIT Bus Tracker account</p>
          </div>

          {/* Role selector */}
          <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 12, padding: 4, marginBottom: 24 }}>
            {["student","admin"].map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  flex: 1, padding: "10px 0", border: "none", borderRadius: 9, cursor: "pointer",
                  fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 14,
                  background: role === r ? "#1B4FD8" : "transparent",
                  color: role === r ? "#fff" : "#64748B",
                  transition: "all .2s",
                }}
              >
                {r === "student" ? "👤 Student" : "⚙️ Admin"}
              </button>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Email address</label>
            <input
              type="email" placeholder="you@rit.ac.in" value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%", padding: "12px 14px", border: "1.5px solid #E2E8F0",
                borderRadius: 10, fontFamily: "'Sora',sans-serif", fontSize: 14,
                color: "#0F172A", outline: "none", boxSizing: "border-box",
                background: "#F8FAFF",
              }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Password</label>
            <input
              type="password" placeholder="••••••••" value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%", padding: "12px 14px", border: "1.5px solid #E2E8F0",
                borderRadius: 10, fontFamily: "'Sora',sans-serif", fontSize: 14,
                color: "#0F172A", outline: "none", boxSizing: "border-box",
                background: "#F8FAFF",
              }}
            />
          </div>
          <div style={{ textAlign: "right", marginBottom: 20 }}>
            <span style={{ color: "#1B4FD8", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Forgot Password?</span>
          </div>
          {error && <div style={{ background: "#FEF2F2", color: "#EF4444", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{error}</div>}
          <button
            onClick={handleLogin}
            style={{
              width: "100%", padding: "14px 0", background: "linear-gradient(135deg,#1340B0,#1B4FD8)",
              border: "none", borderRadius: 12, color: "#fff",
              fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16,
              cursor: "pointer", boxShadow: "0 4px 16px #1B4FD840",
            }}
          >
            Sign In →
          </button>
          <div style={{ textAlign: "center", marginTop: 24, color: "#94A3B8", fontSize: 12 }}>
            Protected by RIT IT Department • SSL Encrypted
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Card Component ──────────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0",
      padding: "20px 22px", boxShadow: "0 2px 8px #1B4FD808", ...style,
    }}>
      {children}
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color = "#1B4FD8", bg = "#EEF3FF" }) {
  return (
    <Card>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginBottom: 6 }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#0F172A" }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>{sub}</div>}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

// ─── Dashboard Page ──────────────────────────────────────────────────────────
function DashboardPage({ role }) {
  const buses = [
    { id:"RIT-01", route:"Main Gate → Porur", status:"On Time", eta:"8 min", passengers:32, cap:40, color:"#22C55E" },
    { id:"RIT-02", route:"Tambaram → Campus", status:"Delayed", eta:"18 min", passengers:28, cap:40, color:"#F59E0B" },
    { id:"RIT-03", route:"Chromepet → Campus", status:"On Time", eta:"5 min", passengers:38, cap:40, color:"#22C55E" },
  ];
  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 24, color: "#0F172A", margin: 0 }}>Dashboard</h1>
        <p style={{ color: "#64748B", fontSize: 14, margin: "4px 0 0" }}>Good morning! Here's your bus overview for today.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard icon="🚌" label="Active Buses" value="12" sub="2 in depot" />
        <StatCard icon="👥" label="Students Tracked" value="486" sub="Today" color="#22C55E" bg="#F0FDF4" />
        <StatCard icon="⏱️" label="Avg ETA" value="11 min" sub="Across all routes" color="#F59E0B" bg="#FFFBEB" />
        <StatCard icon="🛡️" label="Safety Score" value="98%" sub="Excellent" color="#22C55E" bg="#F0FDF4" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>Live Bus Map</h3>
            <span style={{ background: "#F0FDF4", color: "#22C55E", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: "#22C55E", display: "inline-block", animation: "pulse 1.5s infinite" }} />
              Live
            </span>
          </div>
          <LiveMap />
        </Card>
        <Card>
          <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: "0 0 16px" }}>My Bus</h3>
          <div style={{ background: "#EEF3FF", borderRadius: 12, padding: "16px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: "#1B4FD8", fontFamily: "'Sora',sans-serif" }}>8 min</div>
            <div style={{ color: "#64748B", fontSize: 13 }}>Estimated arrival</div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>Bus Number</div>
            <div style={{ fontWeight: 700, color: "#0F172A", display: "flex", alignItems: "center", gap: 6 }}>
              <BusIcon size={16} color="#1B4FD8" /> RIT-01
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>Route</div>
            <div style={{ fontWeight: 600, color: "#0F172A", fontSize: 14 }}>Main Gate → Porur</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>Occupancy</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 6, background: "#E2E8F0", borderRadius: 3 }}>
                <div style={{ width: "80%", height: "100%", background: "#1B4FD8", borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>32/40</span>
            </div>
          </div>
        </Card>
      </div>
      <Card>
        <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: "0 0 16px" }}>All Routes</h3>
        <div style={{ display: "grid", gap: 12 }}>
          {buses.map(b => (
            <div key={b.id} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "14px 16px", background: "#F8FAFF",
              borderRadius: 12, border: "1px solid #E2E8F0",
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BusIcon size={20} color="#1B4FD8" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 14 }}>{b.id}</div>
                <div style={{ color: "#64748B", fontSize: 12 }}>{b.route}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: "#0F172A" }}>{b.eta}</div>
                <div style={{ fontSize: 11, color: "#94A3B8" }}>ETA</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "#64748B" }}>{b.passengers}/{b.cap}</div>
                <div style={{ fontSize: 11, color: "#94A3B8" }}>seats</div>
              </div>
              <div style={{ background: b.color + "18", color: b.color, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>
                {b.status}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Tracking Page ────────────────────────────────────────────────────────────
function TrackingPage() {
  const [selected, setSelected] = useState("RIT-01");
  const buses = [
    { id:"RIT-01", route:"Main Gate → Porur", eta:"8 min", status:"On Time", lat:"12.9876", lng:"80.1234" },
    { id:"RIT-02", route:"Tambaram → Campus", eta:"18 min", status:"Delayed", lat:"12.9234", lng:"80.1098" },
    { id:"RIT-03", route:"Chromepet → Campus", eta:"5 min", status:"On Time", lat:"12.9567", lng:"80.1456" },
  ];
  const bus = buses.find(b => b.id === selected);
  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 24, color: "#0F172A", margin: 0 }}>Live Tracking</h1>
        <p style={{ color: "#64748B", fontSize: 14, margin: "4px 0 0" }}>Real-time GPS tracking for all RIT buses</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
        <div>
          <div style={{ marginBottom: 12, fontSize: 13, fontWeight: 600, color: "#374151" }}>Select Bus</div>
          {buses.map(b => (
            <div
              key={b.id}
              onClick={() => setSelected(b.id)}
              style={{
                padding: "14px 16px", borderRadius: 12, marginBottom: 10, cursor: "pointer",
                border: selected === b.id ? "2px solid #1B4FD8" : "1px solid #E2E8F0",
                background: selected === b.id ? "#EEF3FF" : "#fff",
                transition: "all .15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <BusIcon size={16} color={selected === b.id ? "#1B4FD8" : "#94A3B8"} />
                <span style={{ fontWeight: 700, color: "#0F172A", fontSize: 14 }}>{b.id}</span>
                <span style={{
                  marginLeft: "auto", fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "2px 8px",
                  background: b.status === "On Time" ? "#F0FDF4" : "#FFFBEB",
                  color: b.status === "On Time" ? "#22C55E" : "#F59E0B",
                }}>{b.status}</span>
              </div>
              <div style={{ fontSize: 12, color: "#64748B" }}>{b.route}</div>
            </div>
          ))}
        </div>
        <div>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>
                {bus.id} — {bus.route}
              </h3>
              <span style={{ background: "#EEF3FF", color: "#1B4FD8", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>
                📍 Live GPS
              </span>
            </div>
            <LiveMap />
          </Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <Card style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#1B4FD8", fontFamily: "'Sora',sans-serif" }}>{bus.eta}</div>
              <div style={{ fontSize: 13, color: "#64748B" }}>ETA</div>
            </Card>
            <Card style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", fontFamily: "'Sora',sans-serif" }}>42</div>
              <div style={{ fontSize: 13, color: "#64748B" }}>km/h</div>
            </Card>
            <Card style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#22C55E", fontFamily: "'Sora',sans-serif" }}>98%</div>
              <div style={{ fontSize: 13, color: "#64748B" }}>Signal</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Safety Page ─────────────────────────────────────────────────────────────
function SafetyPage() {
  const [sosActive, setSosActive] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const stops = ["Main Gate","Block A","Block B","Canteen","Library","Sports Ground","Back Gate"];

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 24, color: "#0F172A", margin: 0 }}>Safety Panel</h1>
        <p style={{ color: "#64748B", fontSize: 14, margin: "4px 0 0" }}>Emergency tools and route safety information</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* SOS */}
        <Card>
          <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: "0 0 20px" }}>🚨 Emergency SOS</h3>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <button
              onClick={() => setSosActive(s => !s)}
              style={{
                width: 140, height: 140, borderRadius: "50%",
                background: sosActive
                  ? "linear-gradient(135deg,#991B1B,#EF4444)"
                  : "linear-gradient(135deg,#DC2626,#EF4444)",
                border: `6px solid ${sosActive ? "#FCA5A5" : "#FEE2E2"}`,
                color: "#fff", fontFamily: "'Sora',sans-serif",
                fontWeight: 800, fontSize: 22, cursor: "pointer",
                boxShadow: sosActive
                  ? "0 0 0 16px #FEE2E260, 0 8px 32px #EF444480"
                  : "0 4px 24px #EF444440",
                transition: "all .2s",
              }}
            >
              SOS
            </button>
            {sosActive && (
              <div style={{ marginTop: 16, background: "#FEF2F2", borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ color: "#EF4444", fontWeight: 700, fontSize: 14 }}>🚨 Alert Sent!</div>
                <div style={{ color: "#64748B", fontSize: 12, marginTop: 4 }}>Campus security has been notified</div>
              </div>
            )}
            {!sosActive && <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 16 }}>Hold to send emergency alert</div>}
          </div>
        </Card>

        {/* Share Location */}
        <Card>
          <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: "0 0 20px" }}>📍 Share Location</h3>
          <div style={{ background: "#F8FAFF", borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 4 }}>Current Location</div>
            <div style={{ fontWeight: 600, color: "#0F172A" }}>Bus RIT-01 • Near Main Gate</div>
            <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>12.9876°N, 80.1234°E</div>
          </div>
          <button
            onClick={() => setLocationShared(s => !s)}
            style={{
              width: "100%", padding: "13px 0", borderRadius: 12, border: "none",
              background: locationShared ? "#1B4FD8" : "#F1F5F9",
              color: locationShared ? "#fff" : "#374151",
              fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 14,
              cursor: "pointer", transition: "all .2s",
            }}
          >
            {locationShared ? "✓ Sharing Location" : "Share My Location"}
          </button>
          {locationShared && (
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              {["Parent","Emergency","Security"].map(c => (
                <div key={c} style={{ flex: 1, background: "#EEF3FF", borderRadius: 8, padding: "8px 4px", textAlign: "center", fontSize: 11, color: "#1B4FD8", fontWeight: 600 }}>
                  {c}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Route Safety */}
      <Card>
        <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: "0 0 16px" }}>🛡️ Route Safety Indicators</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
          {stops.map((s, i) => {
            const safe = i !== 2 && i !== 5;
            return (
              <div key={s} style={{ textAlign: "center" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", margin: "0 auto 6px",
                  background: safe ? "#F0FDF4" : "#FFFBEB",
                  border: `2px solid ${safe ? "#22C55E" : "#F59E0B"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14,
                }}>
                  {safe ? "✓" : "⚠"}
                </div>
                <div style={{ fontSize: 10, color: "#64748B", textAlign: "center" }}>{s}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ─── Mini Bar Chart ──────────────────────────────────────────────────────────
function BarChart({ data, color = "#1B4FD8", height = 80 }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height, paddingTop: 10 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{
            width: "100%", background: color + "25", borderRadius: "4px 4px 0 0",
            position: "relative", height: `${(d.v / max) * (height - 20)}px`,
            transition: "height .3s",
          }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: color, borderRadius: "4px 4px 0 0" }} />
          </div>
          <div style={{ fontSize: 9, color: "#94A3B8" }}>{d.l}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Admin Dashboard ─────────────────────────────────────────────────────────
function AdminPage() {
  const maeData = [
    {l:"Mon",v:2.3},{l:"Tue",v:3.1},{l:"Wed",v:1.8},{l:"Thu",v:2.6},{l:"Fri",v:1.4},{l:"Sat",v:2.9},{l:"Sun",v:2.1},
  ];
  const rmseData = [
    {l:"Mon",v:3.1},{l:"Tue",v:4.2},{l:"Wed",v:2.4},{l:"Thu",v:3.5},{l:"Fri",v:1.9},{l:"Sat",v:3.8},{l:"Sun",v:2.7},
  ];
  const buses = [
    { id:"RIT-01", driver:"Rajan M.", route:"Main Gate → Porur", status:"Active", km:142 },
    { id:"RIT-02", driver:"Selvam K.", route:"Tambaram → Campus", status:"Delayed", km:98 },
    { id:"RIT-03", driver:"Murugan S.", route:"Chromepet → Campus", status:"Active", km:167 },
    { id:"RIT-04", driver:"Arjun P.", route:"Pallavaram → Campus", status:"In Depot", km:0 },
  ];

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 24, color: "#0F172A", margin: 0 }}>Admin Dashboard</h1>
        <p style={{ color: "#64748B", fontSize: 14, margin: "4px 0 0" }}>Fleet analytics, route management, and system performance</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 22 }}>
        <StatCard icon="🚌" label="Total Fleet" value="12" sub="4 in depot" />
        <StatCard icon="🛣️" label="Routes" value="8" sub="All active" color="#22C55E" bg="#F0FDF4" />
        <StatCard icon="👨‍✈️" label="Drivers" value="12" sub="On duty: 8" color="#F59E0B" bg="#FFFBEB" />
        <StatCard icon="⚠️" label="Incidents Today" value="0" sub="All clear" color="#22C55E" bg="#F0FDF4" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15, color: "#0F172A", margin: 0 }}>MAE — Prediction Error</h3>
            <span style={{ fontSize: 12, color: "#64748B", background: "#F1F5F9", borderRadius: 8, padding: "3px 10px" }}>Weekly</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#1B4FD8", marginBottom: 4, fontFamily: "'Sora',sans-serif" }}>2.31 min</div>
          <div style={{ fontSize: 12, color: "#22C55E", marginBottom: 12 }}>↓ 8% from last week</div>
          <BarChart data={maeData} color="#1B4FD8" />
        </Card>
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15, color: "#0F172A", margin: 0 }}>RMSE — Route Accuracy</h3>
            <span style={{ fontSize: 12, color: "#64748B", background: "#F1F5F9", borderRadius: 8, padding: "3px 10px" }}>Weekly</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#8B5CF6", marginBottom: 4, fontFamily: "'Sora',sans-serif" }}>3.14 min</div>
          <div style={{ fontSize: 12, color: "#22C55E", marginBottom: 12 }}>↓ 5% from last week</div>
          <BarChart data={rmseData} color="#8B5CF6" />
        </Card>
      </div>

      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>Bus & Route Management</h3>
          <button style={{
            padding: "8px 16px", background: "#1B4FD8", color: "#fff",
            border: "none", borderRadius: 8, fontFamily: "'Sora',sans-serif",
            fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>
            + Add Bus
          </button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFF" }}>
                {["Bus ID","Driver","Route","Status","KM Today","Actions"].map(h => (
                  <th key={h} style={{
                    padding: "12px 14px", textAlign: "left", fontSize: 12,
                    fontWeight: 600, color: "#64748B", borderBottom: "1px solid #E2E8F0",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {buses.map((b, i) => (
                <tr key={b.id} style={{ borderBottom: i < buses.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <td style={{ padding: "14px", fontWeight: 700, color: "#0F172A", fontSize: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <BusIcon size={14} color="#1B4FD8" /> {b.id}
                    </div>
                  </td>
                  <td style={{ padding: "14px", color: "#374151", fontSize: 14 }}>{b.driver}</td>
                  <td style={{ padding: "14px", color: "#64748B", fontSize: 13 }}>{b.route}</td>
                  <td style={{ padding: "14px" }}>
                    <span style={{
                      fontSize: 12, fontWeight: 600, borderRadius: 20, padding: "4px 10px",
                      background: b.status === "Active" ? "#F0FDF4" : b.status === "Delayed" ? "#FFFBEB" : "#F1F5F9",
                      color: b.status === "Active" ? "#22C55E" : b.status === "Delayed" ? "#F59E0B" : "#94A3B8",
                    }}>{b.status}</span>
                  </td>
                  <td style={{ padding: "14px", color: "#374151", fontSize: 14 }}>{b.km > 0 ? `${b.km} km` : "—"}</td>
                  <td style={{ padding: "14px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {["Edit","Track"].map(a => (
                        <button key={a} style={{
                          padding: "5px 12px", border: "1px solid #E2E8F0",
                          borderRadius: 6, background: "#fff", fontSize: 12,
                          color: "#374151", cursor: "pointer", fontFamily: "'Sora',sans-serif",
                        }}>{a}</button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [auth, setAuth] = useState(null);
  const [page, setPage] = useState("dashboard");

  const handleLogin = (role) => {
    setAuth(role);
    setPage(role === "admin" ? "admin" : "dashboard");
  };

  if (!auth) return <LoginPage onLogin={handleLogin} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFF" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        input:focus { border-color: #1B4FD8 !important; box-shadow: 0 0 0 3px #1B4FD820; }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.4} }
      `}</style>
      <Sidebar page={page} setPage={setPage} role={auth} onLogout={() => setAuth(null)} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {page === "dashboard" && <DashboardPage role={auth} />}
        {page === "tracking" && <TrackingPage />}
        {page === "safety" && <SafetyPage />}
        {page === "admin" && <AdminPage />}
      </div>
    </div>
  );
}
