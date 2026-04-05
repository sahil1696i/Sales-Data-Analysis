import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts";
import { categoryData } from "../data/salesData";

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  return (
    <g>
      <text x={cx} y={cy - 14} textAnchor="middle" fill="var(--text)" fontFamily="'Syne', sans-serif" fontWeight={800} fontSize={22}>
        {value}%
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="var(--muted)" fontFamily="'DM Mono', monospace" fontSize={11}>
        {payload.name}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} innerRadius={outerRadius + 12} outerRadius={outerRadius + 16} startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.5} />
    </g>
  );
};

export default function CategoryChart() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "24px",
      animation: "fadeUp 0.5s ease 0.4s both"
    }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Sales by Category</h2>
      <p style={{ color: "var(--muted)", fontSize: 12, fontFamily: "var(--font-mono)", marginBottom: 20 }}>Revenue distribution across product lines</p>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%" cy="50%"
            innerRadius={68} outerRadius={95}
            dataKey="value"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => setActiveIndex(index)}
          >
            {categoryData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        {categoryData.map((d, i) => (
          <div
            key={d.name}
            onMouseEnter={() => setActiveIndex(i)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "8px 12px", borderRadius: 6, cursor: "pointer",
              background: activeIndex === i ? `${d.color}12` : "transparent",
              border: `1px solid ${activeIndex === i ? d.color + "44" : "transparent"}`,
              transition: "all 0.2s"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)" }}>{d.name}</span>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: d.color, fontWeight: 500 }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
