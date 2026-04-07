import { useState, useEffect, useRef } from "react";
import {
  Search, Bell, X, ChevronDown, LayoutDashboard,
  MapPin, Shield, Settings2, Clock, AlertTriangle,
  CheckCircle2, Bus, Info,
} from "lucide-react";

const pageInfo: Record<string, { label: string; Icon: React.ComponentType<{ size?: number; color?: string }> }> = {
  dashboard: { label: "Dashboard", Icon: LayoutDashboard },
  tracking: { label: "Live Tracking", Icon: MapPin },
  safety: { label: "Safety Panel", Icon: Shield },
  admin: { label: "Admin Panel", Icon: Settings2 },
};

const initialNotifs = [
  { id: 1, type: "warning", message: "RIT-02 is delayed by 8 minutes on Tambaram route", time: "2 min ago", read: false },
  { id: 2, type: "info", message: "RIT-01 approaching Main Gate stop — ETA 3 min", time: "5 min ago", read: false },
  { id: 3, type: "success", message: "RIT-03 arrived at campus on schedule ✓", time: "12 min ago", read: true },
  { id: 4, type: "info", message: "Tomorrow's schedule updated — check all routes", time: "1 hr ago", read: true },
];

interface HeaderProps {
  page: string;
  role: string;
}

export function Header({ page, role }: HeaderProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifs);
  const [time, setTime] = useState(new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowNotifs(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unread = notifs.filter((n) => !n.read).length;
  const info = pageInfo[page];

  return (
    <div
      style={{
        height: 64,
        background: "#fff",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        gap: 14,
        flexShrink: 0,
        boxShadow: "0 1px 8px #1B4FD80A",
      }}
    >
      {/* Page title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
        {info && <info.Icon size={18} color="#1B4FD8" />}
        <span style={{ fontWeight: 700, fontSize: 16, color: "#0F172A" }}>{info?.label}</span>
        <span style={{ color: "#CBD5E1", fontSize: 14 }}>/</span>
        <span style={{ color: "#94A3B8", fontSize: 13 }}>RIT Campus</span>
      </div>

      {/* Live clock */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#94A3B8", fontSize: 13, flexShrink: 0 }}>
        <Clock size={14} />
        {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
      </div>

      {/* Search */}
      {showSearch ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#F8FAFF",
            border: "1.5px solid #1B4FD8",
            borderRadius: 10,
            padding: "7px 14px",
          }}
        >
          <Search size={14} color="#64748B" />
          <input
            autoFocus
            placeholder="Search buses, routes…"
            style={{
              border: "none",
              background: "none",
              outline: "none",
              fontFamily: "'Sora', sans-serif",
              fontSize: 13,
              color: "#0F172A",
              width: 180,
            }}
          />
          <button onClick={() => setShowSearch(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#94A3B8" }}>
            <X size={14} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowSearch(true)}
          style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid #E2E8F0", background: "#F8FAFF", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#64748B" }}
        >
          <Search size={16} />
        </button>
      )}

      {/* Notifications */}
      <div ref={ref} style={{ position: "relative" }}>
        <button
          onClick={() => setShowNotifs((s) => !s)}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "1px solid #E2E8F0",
            background: showNotifs ? "#EEF3FF" : "#F8FAFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
            color: "#64748B",
          }}
        >
          <Bell size={16} />
          {unread > 0 && (
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                width: 18,
                height: 18,
                borderRadius: 9,
                background: "#EF4444",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #fff",
              }}
            >
              {unread}
            </span>
          )}
        </button>

        {showNotifs && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "110%",
              width: 348,
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #E2E8F0",
              boxShadow: "0 8px 32px #1B4FD818",
              zIndex: 200,
            }}
          >
            <div
              style={{
                padding: "14px 18px",
                borderBottom: "1px solid #F1F5F9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 14, color: "#0F172A" }}>Notifications</span>
              {unread > 0 && (
                <button
                  onClick={() => setNotifs((ns) => ns.map((n) => ({ ...n, read: true })))}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#1B4FD8", fontFamily: "'Sora', sans-serif", fontWeight: 600 }}
                >
                  Mark all read
                </button>
              )}
            </div>
            {notifs.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: "13px 18px",
                  borderBottom: "1px solid #F8FAFF",
                  background: n.read ? "#fff" : "#F8FAFF",
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  {n.type === "warning" ? (
                    <AlertTriangle size={16} color="#F59E0B" />
                  ) : n.type === "success" ? (
                    <CheckCircle2 size={16} color="#22C55E" />
                  ) : (
                    <Info size={16} color="#1B4FD8" />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{n.message}</div>
                  <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 4 }}>{n.time}</div>
                </div>
                {!n.read && (
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: "#1B4FD8", flexShrink: 0, marginTop: 4 }} />
                )}
              </div>
            ))}
            <div style={{ padding: "11px 18px", textAlign: "center" }}>
              <span style={{ fontSize: 13, color: "#1B4FD8", fontWeight: 600, cursor: "pointer" }}>
                View all notifications →
              </span>
            </div>
          </div>
        )}
      </div>

      {/* User avatar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          padding: "6px 10px",
          borderRadius: 10,
          border: "1px solid #E2E8F0",
          background: "#F8FAFF",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1B4FD8, #60A5FA)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 11,
          }}
        >
          {role === "admin" ? "AD" : "ST"}
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
          {role === "admin" ? "Admin" : "Student"}
        </span>
        <ChevronDown size={14} color="#94A3B8" />
      </div>
    </div>
  );
}
