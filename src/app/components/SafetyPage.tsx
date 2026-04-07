import { useState } from "react";
import { Phone, Shield, MapPin, CheckCircle2, AlertTriangle, Clock, ChevronRight, Send } from "lucide-react";
import { toast } from "sonner";

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #E2E8F0", padding: "20px 22px", boxShadow: "0 2px 10px #1B4FD80A", ...style }}>
      {children}
    </div>
  );
}

const stops = ["Main Gate", "Block A", "Block B", "Canteen", "Library", "Sports Ground", "Back Gate"];

export function SafetyPage() {
  const [sosActive, setSosActive] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [incidentType, setIncidentType] = useState("");
  const [incidentNote, setIncidentNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSOS = () => {
    setSosActive((s) => !s);
    if (!sosActive) {
      toast.error("🚨 Emergency SOS Sent! Campus security notified.", { duration: 4000 });
    } else {
      toast.info("SOS alert cancelled.");
    }
  };

  const handleLocationShare = () => {
    setLocationShared((s) => !s);
    if (!locationShared) {
      toast.success("📍 Location shared with emergency contacts.");
    }
  };

  const handleReport = () => {
    if (!incidentType) { toast.error("Please select an incident type."); return; }
    setSubmitted(true);
    toast.success("Incident report submitted to campus security.");
    setTimeout(() => { setSubmitted(false); setIncidentType(""); setIncidentNote(""); }, 3000);
  };

  return (
    <div style={{ padding: "28px 32px" }}>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 24, color: "#0F172A", margin: 0 }}>
          Safety Panel
        </h1>
        <p style={{ color: "#64748B", fontSize: 14, margin: "4px 0 0" }}>
          Emergency tools and route safety information
        </p>
      </div>

      {/* SOS + Location */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* SOS */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <AlertTriangle size={18} color="#EF4444" />
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>
              Emergency SOS
            </h3>
          </div>
          <div style={{ textAlign: "center", padding: "16px 0 20px" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              {sosActive && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      inset: -22,
                      borderRadius: "50%",
                      background: "#FEE2E2",
                      animation: "sosping 1.4s infinite",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: -10,
                      borderRadius: "50%",
                      background: "#FECACA",
                      animation: "sosping 1.4s infinite .25s",
                    }}
                  />
                </>
              )}
              <button
                onClick={handleSOS}
                style={{
                  position: "relative",
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: sosActive
                    ? "linear-gradient(135deg, #991B1B, #EF4444)"
                    : "linear-gradient(135deg, #DC2626, #EF4444)",
                  border: `6px solid ${sosActive ? "#FCA5A5" : "#FEE2E2"}`,
                  color: "#fff",
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 800,
                  fontSize: 26,
                  cursor: "pointer",
                  boxShadow: sosActive
                    ? "0 0 0 20px #FEE2E255, 0 8px 40px #EF444480"
                    : "0 6px 30px #EF444445",
                  transition: "all .2s",
                  letterSpacing: 1,
                }}
              >
                SOS
              </button>
            </div>

            {sosActive ? (
              <div style={{ marginTop: 28, background: "#FEF2F2", borderRadius: 12, padding: "14px 20px", border: "1px solid #FECACA" }}>
                <div style={{ color: "#EF4444", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                  🚨 Emergency Alert Sent!
                </div>
                <div style={{ color: "#64748B", fontSize: 12 }}>
                  Campus security has been notified. Help is on the way.
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 20, color: "#94A3B8", fontSize: 13 }}>
                Tap to send emergency alert to campus security
              </div>
            )}
          </div>
        </Card>

        {/* Share Location */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <MapPin size={18} color="#1B4FD8" />
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>
              Share Location
            </h3>
          </div>
          <div style={{ background: "#F8FAFF", borderRadius: 12, padding: "14px 16px", marginBottom: 16, border: "1px solid #E2E8F0" }}>
            <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 3, textTransform: "uppercase", letterSpacing: 0.4, fontWeight: 600 }}>
              Current Location
            </div>
            <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 14 }}>Bus RIT-01 · Near Main Gate</div>
            <div style={{ fontSize: 12, color: "#64748B", marginTop: 4 }}>12.9876°N, 80.1234°E</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 12, color: "#94A3B8" }}>
              <Clock size={12} />
              Updated just now
            </div>
          </div>

          <button
            onClick={handleLocationShare}
            style={{
              width: "100%",
              padding: "13px 0",
              borderRadius: 12,
              border: "none",
              background: locationShared ? "#1B4FD8" : "#F1F5F9",
              color: locationShared ? "#fff" : "#374151",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              transition: "all .2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {locationShared ? <><CheckCircle2 size={16} /> Sharing Location</> : <><MapPin size={16} /> Share My Location</>}
          </button>

          {locationShared && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 12, color: "#64748B", marginBottom: 8, fontWeight: 600 }}>
                Shared with:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[
                  { label: "Parent", icon: "👨‍👩‍👧" },
                  { label: "Emergency", icon: "🆘" },
                  { label: "Security", icon: "🔒" },
                ].map((c) => (
                  <div
                    key={c.label}
                    style={{
                      background: "#EEF3FF",
                      borderRadius: 10,
                      padding: "10px 8px",
                      textAlign: "center",
                      border: "1px solid #BFDBFE",
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 4 }}>{c.icon}</div>
                    <div style={{ fontSize: 11, color: "#1B4FD8", fontWeight: 600 }}>{c.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Emergency contacts + Incident form */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Emergency Contacts */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Phone size={18} color="#22C55E" />
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>
              Emergency Contacts
            </h3>
          </div>
          {[
            { name: "Campus Security", number: "044-2680-1000", icon: "🔒", color: "#1B4FD8" },
            { name: "Transport Office", number: "044-2680-1001", icon: "🚌", color: "#F59E0B" },
            { name: "Medical Center", number: "044-2680-1002", icon: "🏥", color: "#EF4444" },
            { name: "Police Control", number: "100", icon: "👮", color: "#8B5CF6" },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                background: "#F8FAFF",
                borderRadius: 10,
                marginBottom: 8,
                border: "1px solid #F1F5F9",
              }}
            >
              <span style={{ fontSize: 20, flexShrink: 0 }}>{c.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#0F172A" }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#64748B" }}>{c.number}</div>
              </div>
              <button
                style={{
                  padding: "6px 12px",
                  background: c.color + "18",
                  color: c.color,
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 12,
                  fontFamily: "'Sora', sans-serif",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Phone size={11} /> Call
              </button>
            </div>
          ))}
        </Card>

        {/* Incident Report */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Send size={18} color="#8B5CF6" />
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>
              Report Incident
            </h3>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 }}>
              Incident Type
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {["Accident", "Breakdown", "Harassment", "Route Issue"].map((t) => (
                <button
                  key={t}
                  onClick={() => setIncidentType(t)}
                  style={{
                    padding: "9px 12px",
                    borderRadius: 8,
                    border: `1.5px solid ${incidentType === t ? "#8B5CF6" : "#E2E8F0"}`,
                    background: incidentType === t ? "#F5F3FF" : "#fff",
                    color: incidentType === t ? "#8B5CF6" : "#64748B",
                    fontSize: 13,
                    fontWeight: incidentType === t ? 600 : 400,
                    cursor: "pointer",
                    fontFamily: "'Sora', sans-serif",
                    transition: "all .15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 }}>
              Description
            </label>
            <textarea
              placeholder="Describe what happened..."
              value={incidentNote}
              onChange={(e) => setIncidentNote(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "11px 14px",
                border: "1.5px solid #E2E8F0",
                borderRadius: 10,
                fontFamily: "'Sora', sans-serif",
                fontSize: 13,
                color: "#0F172A",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
                background: "#F8FAFF",
              }}
            />
          </div>

          <button
            onClick={handleReport}
            style={{
              width: "100%",
              padding: "12px 0",
              background: submitted ? "#22C55E" : "#8B5CF6",
              border: "none",
              borderRadius: 10,
              color: "#fff",
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all .2s",
            }}
          >
            {submitted ? <><CheckCircle2 size={16} /> Submitted!</> : <><Send size={16} /> Submit Report</>}
          </button>
        </Card>
      </div>

      {/* Route Safety */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <Shield size={18} color="#1B4FD8" />
          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: "#0F172A", margin: 0 }}>
            Route Safety Indicators
          </h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${stops.length}, 1fr)`, gap: 10 }}>
          {stops.map((s, i) => {
            const safe = i !== 2 && i !== 5;
            const c = safe ? "#22C55E" : "#F59E0B";
            const bg = safe ? "#F0FDF4" : "#FFFBEB";
            return (
              <div key={s} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    margin: "0 auto 8px",
                    background: bg,
                    border: `2px solid ${c}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {safe ? <CheckCircle2 size={18} color={c} /> : <AlertTriangle size={16} color={c} />}
                </div>
                <div style={{ fontSize: 11, color: "#64748B", fontWeight: safe ? 400 : 600, lineHeight: 1.3 }}>{s}</div>
                <div style={{ fontSize: 10, color: c, marginTop: 3, fontWeight: 600 }}>
                  {safe ? "Safe" : "Caution"}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
