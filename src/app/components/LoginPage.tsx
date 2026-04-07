import { useState, useEffect } from "react";
import { Eye, EyeOff, Bus, Navigation2, Shield, Users } from "lucide-react";
import { toast } from "sonner";

function HeroMap() {
  const [pos, setPos] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPos((p) => (p + 0.9) % 100), 55);
    return () => clearInterval(t);
  }, []);

  const path: [number, number][] = [
    [55, 195], [120, 158], [205, 145], [285, 168],
    [345, 138], [405, 158], [465, 130], [505, 150],
  ];
  const totalSegs = path.length - 1;
  const raw = (pos / 100) * totalSegs;
  const idx = Math.min(Math.floor(raw), totalSegs - 1);
  const frac = raw - idx;
  const bx = path[idx][0] + (path[idx + 1][0] - path[idx][0]) * frac;
  const by = path[idx][1] + (path[idx + 1][1] - path[idx][1]) * frac;
  const angle =
    Math.atan2(
      path[Math.min(idx + 1, totalSegs)][1] - path[idx][1],
      path[Math.min(idx + 1, totalSegs)][0] - path[idx][0]
    ) *
    (180 / Math.PI);

  return (
    <svg viewBox="0 0 560 290" fill="none" style={{ width: "100%", borderRadius: 14 }}>
      <rect width="560" height="290" fill="#0F3EA0" rx="14" />
      {[1, 2, 3, 4].map((i) => (
        <line key={`v${i}`} x1={i * 112} y1="0" x2={i * 112} y2="290" stroke="white" strokeWidth="0.3" opacity="0.08" />
      ))}
      {[1, 2, 3].map((i) => (
        <line key={`h${i}`} x1="0" y1={i * 72} x2="560" y2={i * 72} stroke="white" strokeWidth="0.3" opacity="0.08" />
      ))}
      <rect x="28" y="38" width="80" height="50" rx="6" fill="#22C55E" opacity="0.1" />
      <rect x="418" y="192" width="96" height="58" rx="6" fill="#22C55E" opacity="0.1" />
      {[[155, 218, 50, 36], [260, 28, 58, 34], [348, 218, 66, 42], [448, 28, 58, 38]].map(([x, y, w, ht], i) => (
        <rect key={i} x={x} y={y} width={w} height={ht} rx="3" fill="white" opacity="0.05" />
      ))}
      <polyline points={path.map(([x, y]) => `${x},${y}`).join(" ")} stroke="white" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" opacity="0.06" />
      <polyline points={path.map(([x, y]) => `${x},${y}`).join(" ")} stroke="white" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" opacity="0.14" />
      <polyline points={path.map(([x, y]) => `${x},${y}`).join(" ")} stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="12 8" opacity="0.8" />
      {([[120, 158], [285, 168], [465, 130]] as [number, number][]).map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="18" fill="#1B4FD8" opacity="0.2" />
          <circle cx={x} cy={y} r="10" fill="white" opacity="0.88" />
          <circle cx={x} cy={y} r="4" fill="#1B4FD8" />
          <line x1={x} y1={y - 10} x2={x} y2={y - 26} stroke="white" strokeWidth="2" opacity="0.7" />
        </g>
      ))}
      <g transform={`translate(${bx},${by}) rotate(${angle})`}>
        <rect x="-18" y="-11" width="36" height="22" rx="5" fill="#F97316" />
        <rect x="-14" y="-7.5" width="9" height="7" rx="1.5" fill="white" opacity="0.88" />
        <rect x="-3" y="-7.5" width="9" height="7" rx="1.5" fill="white" opacity="0.88" />
        <circle cx="-9" cy="11" r="4.5" fill="#0F172A" />
        <circle cx="9" cy="11" r="4.5" fill="#0F172A" />
        <circle cx="-9" cy="11" r="2" fill="#94A3B8" />
        <circle cx="9" cy="11" r="2" fill="#94A3B8" />
      </g>
      <circle cx="505" cy="150" r="20" fill="#22C55E" opacity="0.15" />
      <circle cx="505" cy="150" r="11" fill="#22C55E" />
      <text x="505" y="150" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="Sora,sans-serif">RIT</text>
      <text x="505" y="172" textAnchor="middle" fill="#4ADE80" fontSize="9" fontWeight="600" fontFamily="Sora,sans-serif">Campus</text>
      <rect x="18" y="14" width="118" height="48" rx="9" fill="white" opacity="0.94" />
      <text x="30" y="32" fill="#64748B" fontSize="9" fontFamily="Sora,sans-serif" fontWeight="500">ETA to Campus</text>
      <text x="30" y="54" fill="#1B4FD8" fontSize="18" fontWeight="800" fontFamily="Sora,sans-serif">12 min</text>
      <rect x="390" y="14" width="52" height="22" rx="11" fill="#22C55E" opacity="0.9" />
      <circle cx="404" cy="25" r="3" fill="white" opacity="0.8" />
      <text x="415" y="29" fill="white" fontSize="9" fontWeight="700" fontFamily="Sora,sans-serif">LIVE</text>
    </svg>
  );
}

interface Props {
  onLogin: (role: string) => void;
}

export function LoginPage({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Welcome back! Signed in as ${role === "admin" ? "Admin" : "Student"}`);
      onLogin(role);
    }, 1100);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid #E2E8F0",
    borderRadius: 12,
    fontFamily: "'Sora', sans-serif",
    fontSize: 14,
    color: "#0F172A",
    outline: "none",
    boxSizing: "border-box",
    background: "#F8FAFF",
    transition: "border-color .15s",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Sora', sans-serif", background: "#F8FAFF" }}>
      {/* Left panel */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(145deg, #1340B0 0%, #1B4FD8 55%, #2563EB 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-100px", left: "-90px", width: "360px", height: "360px", borderRadius: "50%", background: "#ffffff08" }} />
        <div style={{ position: "absolute", bottom: "-80px", right: "-100px", width: "320px", height: "320px", borderRadius: "50%", background: "#ffffff06" }} />
        <div style={{ position: "absolute", top: "35%", right: "-50px", width: "200px", height: "200px", borderRadius: "50%", background: "#ffffff05" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 490, width: "100%" }}>
          {/* Brand */}
          <div style={{ marginBottom: 28, display: "flex", justifyContent: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "#ffffff18", borderRadius: 16, padding: "12px 24px", backdropFilter: "blur(8px)" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="28" height="28" viewBox="0 0 32 36" fill="none">
                  <path d="M16 2C10 2 6 8 6 14C6 22 16 34 16 34C16 34 26 22 26 14C26 8 22 2 16 2Z" fill="#EEF3FF" />
                  <path d="M16 5L16 28" stroke="#1B4FD8" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M16 10L11 15" stroke="#1B4FD8" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M16 10L21 15" stroke="#1B4FD8" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M16 17L12 21" stroke="#1B4FD8" strokeWidth="1.1" strokeLinecap="round" />
                  <path d="M16 17L20 21" stroke="#1B4FD8" strokeWidth="1.1" strokeLinecap="round" />
                  <circle cx="16" cy="10" r="2" fill="#F97316" />
                </svg>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: 24, letterSpacing: 1, lineHeight: 1 }}>rit</div>
                <div style={{ color: "#93C5FD", fontSize: 10, lineHeight: 1.5, marginTop: 3 }}>RAJALAKSHMI INSTITUTE<br />OF TECHNOLOGY</div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div style={{ marginBottom: 28, borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 60px #00000030" }}>
            <HeroMap />
          </div>

          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, margin: "0 0 12px", letterSpacing: "-0.5px" }}>
            Safe Travel Starts Here
          </h2>
          <p style={{ color: "#93C5FD", fontSize: 15, lineHeight: 1.7, margin: "0 0 28px" }}>
            Real-time GPS tracking, live ETA updates, and safety tools — built for RIT students & staff.
          </p>

          {/* Feature badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {[
              { icon: Bus, label: "12 Buses" },
              { icon: Navigation2, label: "Live GPS" },
              { icon: Shield, label: "Safe Rides" },
              { icon: Users, label: "486 Students" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} style={{ background: "#ffffff12", borderRadius: 12, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, border: "1px solid #ffffff15" }}>
                <Icon size={13} color="#93C5FD" />
                <span style={{ color: "#E0EAFF", fontSize: 12, fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: 490, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", background: "#fff", boxShadow: "-4px 0 40px #1B4FD810" }}>
        <div style={{ width: "100%", maxWidth: 385 }}>
          <div style={{ marginBottom: 30 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: "#0F172A", margin: "0 0 8px", letterSpacing: "-0.5px" }}>
              Welcome back 👋
            </h1>
            <p style={{ color: "#64748B", fontSize: 15, margin: 0 }}>Sign in to your RIT Bus Tracker account</p>
          </div>

          {/* Role selector */}
          <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 14, padding: 4, marginBottom: 26 }}>
            {(["student", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  flex: 1, padding: "11px 0", border: "none", borderRadius: 11, cursor: "pointer",
                  fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14,
                  background: role === r ? "#fff" : "transparent",
                  color: role === r ? "#1B4FD8" : "#94A3B8",
                  boxShadow: role === r ? "0 2px 8px #1B4FD815" : "none",
                  transition: "all .2s",
                }}
              >
                {r === "student" ? "👤 Student" : "⚙️ Admin"}
              </button>
            ))}
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
              Email address
            </label>
            <input
              type="email"
              placeholder="you@rit.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{ ...inputStyle, paddingRight: 48 }}
              />
              <button
                onClick={() => setShowPw((s) => !s)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 4, color: "#94A3B8" }}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor: "#1B4FD8" }} />
              <span style={{ fontSize: 13, color: "#64748B" }}>Remember me</span>
            </label>
            <span style={{ color: "#1B4FD8", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>Forgot password?</span>
          </div>

          {error && (
            <div style={{ background: "#FEF2F2", color: "#EF4444", borderRadius: 10, padding: "11px 16px", fontSize: 13, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%", padding: "15px 0",
              background: loading ? "#93C5FD" : "linear-gradient(135deg, #1340B0, #1B4FD8)",
              border: "none", borderRadius: 14, color: "#fff",
              fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 20px #1B4FD840",
              transition: "all .2s", letterSpacing: 0.3,
            }}
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>

          <div style={{ textAlign: "center", marginTop: 22, color: "#CBD5E1", fontSize: 12 }}>
            🔒 Protected by RIT IT Department • SSL Encrypted
          </div>
        </div>
      </div>
    </div>
  );
}
