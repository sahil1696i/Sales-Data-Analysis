import React from "react";
import { Bell, Moon, Sun, RefreshCw } from "lucide-react";

export default function Header({ dark, setDark }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <header style={{
      borderBottom: "1px solid var(--border)",
      padding: "16px 28px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "var(--surface)",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      <div>
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22,
          background: "linear-gradient(90deg, var(--text) 0%, var(--muted) 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>Sales Dashboard</h1>
        <p style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--font-mono)", marginTop: 2 }}>{dateStr}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          padding: "4px 10px", borderRadius: 20, fontSize: 10,
          fontFamily: "var(--font-mono)", letterSpacing: "0.08em",
          background: "rgba(96,240,160,0.12)", color: "var(--success)",
          border: "1px solid rgba(96,240,160,0.2)",
          display: "flex", alignItems: "center", gap: 5
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)", display: "inline-block", animation: "pulse 2s infinite" }} />
          LIVE
        </span>

        <button
          title="Refresh data"
          style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 10px", color: "var(--muted)", cursor: "pointer", display: "flex" }}
          onClick={() => window.location.reload()}
        ><RefreshCw size={14} /></button>

        <button
          title="Notifications"
          style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "7px 10px", color: "var(--muted)", cursor: "pointer", display: "flex", position: "relative" }}
        >
          <Bell size={14} />
          <span style={{
            position: "absolute", top: 5, right: 5, width: 7, height: 7,
            background: "var(--accent3)", borderRadius: "50%",
            border: "1.5px solid var(--surface)"
          }} />
        </button>
      </div>
    </header>
  );
}
