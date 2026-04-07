import { useState } from "react";
import { Toaster } from "sonner";
import { LoginPage } from "./components/LoginPage";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { DashboardPage } from "./components/DashboardPage";
import { TrackingPage } from "./components/TrackingPage";
import { SafetyPage } from "./components/SafetyPage";
import { AdminPage } from "./components/AdminPage";



export default function App() {
  const [auth, setAuth] = useState<string | null>(null);
  const [page, setPage] = useState("dashboard");

  const handleLogin = (role: string) => {
    setAuth(role);
    setPage(role === "admin" ? "admin" : "dashboard");
  };

  if (!auth) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: 'Sora', sans-serif; }
          input:focus, textarea:focus { border-color: #1B4FD8 !important; box-shadow: 0 0 0 3px #1B4FD820 !important; }
        `}</style>
        <Toaster position="top-right" richColors />
        <LoginPage onLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Sora', sans-serif; background: #F8FAFF; }
        input:focus, textarea:focus { border-color: #1B4FD8 !important; box-shadow: 0 0 0 3px #1B4FD820 !important; }
        button:hover { opacity: 0.92; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.92); }
        }
        @keyframes sosping {
          0% { transform: scale(0.96); opacity: 0.7; }
          70% { transform: scale(1.35); opacity: 0; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #F1F5F9; }
        ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
      `}</style>
      <Toaster position="top-right" richColors />

      <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFF", fontFamily: "'Sora', sans-serif" }}>
        <Sidebar page={page} setPage={setPage} role={auth} onLogout={() => setAuth(null)} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Header page={page} role={auth} />
          <main style={{ flex: 1, overflowY: "auto" }}>
            {page === "dashboard" && <DashboardPage role={auth} />}
            {page === "tracking" && <TrackingPage />}
            {page === "safety" && <SafetyPage />}
            {page === "admin" && <AdminPage />}
          </main>
        </div>
      </div>
    </>
  );
}
