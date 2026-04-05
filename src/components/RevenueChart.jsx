import React, { useState } from "react";
import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Area
} from "recharts";
import { monthlyRevenue } from "../data/salesData";
import { formatCurrency, downloadFile, toCSV } from "../utils/helpers";
import { Download } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--surface2)", border: "1px solid var(--border)",
      borderRadius: 8, padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 12
    }}>
      <p style={{ color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 10 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color, marginBottom: 4 }}>
          {p.name}: <strong>{formatCurrency(p.value)}</strong>
        </p>
      ))}
    </div>
  );
};

export default function RevenueChart() {
  const [view, setView] = useState("all");

  const filtered = view === "all" ? monthlyRevenue : monthlyRevenue.slice(-6);

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "24px",
      animation: "fadeUp 0.5s ease 0.3s both"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Revenue Overview</h2>
          <p style={{ color: "var(--muted)", fontSize: 12, fontFamily: "var(--font-mono)" }}>Revenue vs Target vs Last Year</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["6M", "all"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "6px 14px", borderRadius: 6, fontSize: 12,
                fontFamily: "var(--font-mono)", border: "1px solid",
                borderColor: view === v ? "var(--accent)" : "var(--border)",
                background: view === v ? "rgba(200,240,96,0.1)" : "transparent",
                color: view === v ? "var(--accent)" : "var(--muted)",
                transition: "all 0.2s"
              }}
            >{v === "all" ? "12M" : v}</button>
          ))}
          <button
            onClick={() => downloadFile(toCSV(monthlyRevenue), "revenue.csv")}
            style={{
              padding: "6px 12px", borderRadius: 6, fontSize: 12,
              fontFamily: "var(--font-mono)", border: "1px solid var(--border)",
              background: "transparent", color: "var(--muted)",
              display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
          ><Download size={13} /> Export</button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={filtered} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#c8f060" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#c8f060" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "var(--muted)", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => `$${v / 1000}k`} tick={{ fill: "var(--muted)", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: 12, paddingTop: 16 }}
            formatter={(value) => <span style={{ color: "var(--muted)" }}>{value}</span>}
          />
          <Area type="monotone" dataKey="revenue" name="Revenue" fill="url(#revenueGrad)" stroke="#c8f060" strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="target"   name="Target"    stroke="#60c8f0" strokeWidth={2} dot={false} strokeDasharray="5 4" />
          <Line type="monotone" dataKey="lastYear" name="Last Year" stroke="#6a6a8a" strokeWidth={1.5} dot={false} strokeDasharray="2 3" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
