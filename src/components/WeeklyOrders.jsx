import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { weeklyOrders } from "../data/salesData";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--surface2)", border: "1px solid var(--border)",
      borderRadius: 8, padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 12
    }}>
      <p style={{ color: "var(--muted)", marginBottom: 8, fontSize: 10 }}>{label}</p>
      <p style={{ color: "var(--accent)", marginBottom: 4 }}>Orders: <strong>{payload[0]?.value}</strong></p>
      {payload[1] && <p style={{ color: "var(--danger)" }}>Returns: <strong>{payload[1]?.value}</strong></p>}
    </div>
  );
};

export default function WeeklyOrders() {
  const maxOrders = Math.max(...weeklyOrders.map((d) => d.orders));

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "24px",
      animation: "fadeUp 0.5s ease 0.6s both"
    }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Weekly Orders</h2>
      <p style={{ color: "var(--muted)", fontSize: 12, fontFamily: "var(--font-mono)", marginBottom: 20 }}>Orders & returns by day</p>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weeklyOrders} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: "var(--muted)", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "var(--muted)", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="orders" radius={[4, 4, 0, 0]}>
            {weeklyOrders.map((d) => (
              <Cell key={d.day} fill={d.orders === maxOrders ? "#c8f060" : "rgba(200,240,96,0.35)"} />
            ))}
          </Bar>
          <Bar dataKey="returns" fill="rgba(240,96,96,0.45)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
        {[{ label: "Orders", color: "var(--accent)" }, { label: "Returns", color: "var(--danger)" }].map(({ label, color }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
            <span style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
