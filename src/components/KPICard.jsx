import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { formatCurrency, formatNumber } from "../utils/helpers";

const styles = {
  card: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transition: "border-color 0.2s, transform 0.2s",
    cursor: "default",
    animation: "fadeUp 0.5s ease both",
  },
  label: {
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--muted)",
  },
  value: {
    fontFamily: "var(--font-display)",
    fontSize: "32px",
    fontWeight: 800,
    lineHeight: 1,
    color: "var(--text)",
  },
  badge: (positive) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    fontFamily: "var(--font-mono)",
    color: positive ? "var(--success)" : "var(--danger)",
    background: positive ? "rgba(96,240,160,0.1)" : "rgba(240,96,96,0.1)",
    padding: "3px 8px",
    borderRadius: "4px",
  }),
  footer: {
    fontSize: "11px",
    color: "var(--muted)",
    fontFamily: "var(--font-mono)",
  },
};

export default function KPICard({ label, data, icon: Icon, delay = 0, accentColor }) {
  const { value, change, unit } = data;
  const positive = change >= 0;
  const displayValue =
    unit === "$" ? formatCurrency(value)
    : unit === "%" ? `${value}%`
    : formatNumber(value);

  return (
    <div
      style={{ ...styles.card, animationDelay: `${delay}ms`, "--hover-border": accentColor || "var(--accent)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor || "var(--accent)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={styles.label}>{label}</span>
        {Icon && (
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: accentColor ? `${accentColor}18` : "rgba(200,240,96,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Icon size={16} color={accentColor || "var(--accent)"} />
          </div>
        )}
      </div>
      <div style={styles.value}>{displayValue}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={styles.badge(positive)}>
          {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {positive ? "+" : ""}{change}%
        </span>
        <span style={styles.footer}>vs last year</span>
      </div>
    </div>
  );
}
