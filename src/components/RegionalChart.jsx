import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { regionData } from "../data/salesData";
import { formatCurrency } from "../utils/helpers";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--surface2)", border: "1px solid var(--border)",
      borderRadius: 8, padding: "12px 16px", fontFamily: "var(--font-mono)", fontSize: 12
    }}>
      <p style={{ color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 10 }}>{label} Region</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.fill, marginBottom: 4 }}>
          {p.name}: <strong>{formatCurrency(p.value)}</strong>
        </p>
      ))}
      <p style={{ color: "var(--accent)", marginTop: 6, fontWeight: 600 }}>
        Total: {formatCurrency(payload.reduce((s, p) => s + p.value, 0))}
      </p>
    </div>
  );
};

const COLORS = ["#c8f060", "#60c8f0", "#f060c8", "#f0c860"];
const QUARTERS = ["q1", "q2", "q3", "q4"];

export default function RegionalChart() {
  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "24px",
      animation: "fadeUp 0.5s ease 0.55s both"
    }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Regional Performance</h2>
      <p style={{ color: "var(--muted)", fontSize: 12, fontFamily: "var(--font-mono)", marginBottom: 20 }}>Quarterly breakdown by region</p>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={regionData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={3}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="region" tick={{ fill: "var(--muted)", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => `$${v / 1000}k`} tick={{ fill: "var(--muted)", fontSize: 11, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: 12, paddingTop: 12 }} formatter={(v) => <span style={{ color: "var(--muted)" }}>{v.toUpperCase()}</span>} />
          {QUARTERS.map((q, i) => (
            <Bar key={q} dataKey={q} name={q.toUpperCase()} fill={COLORS[i]} radius={[3, 3, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
