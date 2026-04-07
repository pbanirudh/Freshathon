import { LayoutDashboard, MapPin, Shield, Settings2, LogOut, Bus } from "lucide-react";
import ritLogo from "../../assets/ritlogo.png";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tracking", label: "Live Tracking", icon: MapPin, live: true },
  { id: "safety", label: "Safety Panel", icon: Shield },
  { id: "admin", label: "Admin Panel", icon: Settings2, adminOnly: true },
];

interface SidebarProps {
  page: string;
  setPage: (p: string) => void;
  role: string;
  onLogout: () => void;
}

export function Sidebar({ page, setPage, role, onLogout }: SidebarProps) {
  return (
    <div
      style={{
        width: 240,
        minHeight: "100vh",
        background: "#fff",
        borderRight: "1px solid #E2E8F0",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        boxShadow: "2px 0 20px #1B4FD80A",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "22px 20px 18px", borderBottom: "1px solid #F1F5F9" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          <img src={ritLogo} alt="RIT Logo" style={{ height: 40, width: "auto" }} />
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "#EEF3FF",
            borderRadius: 8,
            padding: "5px 10px",
          }}
        >
          <Bus size={12} color="#1B4FD8" />
          <span style={{ fontSize: 11, fontWeight: 600, color: "#1B4FD8" }}>Smart Bus Tracker</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "14px 10px" }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: "#CBD5E1",
            letterSpacing: 1,
            textTransform: "uppercase",
            padding: "0 8px",
            marginBottom: 8,
          }}
        >
          Navigation
        </div>
        {navItems
          .filter((n) => !n.adminOnly || role === "admin")
          .map((item) => {
            const Icon = item.icon;
            const isActive = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 12px",
                  borderRadius: 10,
                  marginBottom: 2,
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  background: isActive ? "#EEF3FF" : "transparent",
                  color: isActive ? "#1B4FD8" : "#64748B",
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 14,
                  transition: "all .15s",
                  position: "relative",
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "22%",
                      bottom: "22%",
                      width: 3,
                      borderRadius: "0 3px 3px 0",
                      background: "#1B4FD8",
                    }}
                  />
                )}
                <Icon size={17} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.live && (
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      background: "#22C55E",
                      boxShadow: "0 0 0 2px #F0FDF4",
                      animation: "pulse 1.8s infinite",
                    }}
                  />
                )}
              </button>
            );
          })}
      </nav>

      {/* User */}
      <div style={{ padding: "14px 10px", borderTop: "1px solid #F1F5F9" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: 10,
            background: "#F8FAFF",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1B4FD8, #60A5FA)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 12,
              flexShrink: 0,
            }}
          >
            {role === "admin" ? "AD" : "ST"}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 13,
                color: "#0F172A",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {role === "admin" ? "Admin User" : "Student User"}
            </div>
            <div style={{ fontSize: 11, color: "#94A3B8" }}>RIT Campus</div>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid #E2E8F0",
            background: "#fff",
            color: "#64748B",
            fontFamily: "'Sora', sans-serif",
            fontSize: 13,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all .15s",
          }}
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
