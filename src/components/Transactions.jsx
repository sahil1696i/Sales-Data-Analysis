import React, { useState } from "react";
import { recentTransactions } from "../data/salesData";
import { formatCurrency, downloadFile, toCSV } from "../utils/helpers";
import { Download } from "lucide-react";

const STATUS_STYLES = {
  completed: { color: "var(--success)", bg: "rgba(96,240,160,0.1)", label: "Completed" },
  pending:   { color: "var(--accent2)", bg: "rgba(96,200,240,0.1)", label: "Pending"   },
  refunded:  { color: "var(--danger)",  bg: "rgba(240,96,96,0.1)",  label: "Refunded"  },
};

export default function Transactions() {
  const [filter, setFilter] = useState("all");

  const visible = filter === "all"
    ? recentTransactions
    : recentTransactions.filter((t) => t.status === filter);

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "24px",
      animation: "fadeUp 0.5s ease 0.65s both"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Recent Transactions</h2>
          <p style={{ color: "var(--muted)", fontSize: 12, fontFamily: "var(--font-mono)" }}>Latest customer activity</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["all", "completed", "pending", "refunded"].map((s) => {
            const st = STATUS_STYLES[s] || { color: "var(--muted)", bg: "transparent", label: "All" };
            const active = filter === s;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: "5px 12px", borderRadius: 6, fontSize: 11, fontFamily: "var(--font-mono)",
                  border: "1px solid", cursor: "pointer", transition: "all 0.2s",
                  borderColor: active ? (s === "all" ? "var(--accent)" : st.color) : "var(--border)",
                  background: active ? (s === "all" ? "rgba(200,240,96,0.1)" : st.bg) : "transparent",
                  color: active ? (s === "all" ? "var(--accent)" : st.color) : "var(--muted)",
                }}
              >{s === "all" ? "All" : st.label}</button>
            );
          })}
          <button
            onClick={() => downloadFile(toCSV(visible), "transactions.csv")}
            style={{
              padding: "5px 10px", borderRadius: 6, fontSize: 11,
              fontFamily: "var(--font-mono)", border: "1px solid var(--border)",
              background: "transparent", color: "var(--muted)",
              display: "flex", alignItems: "center", gap: 5, cursor: "pointer"
            }}
          ><Download size={12} /></button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["TXN ID", "Customer", "Product", "Amount", "Status", "Date"].map((h) => (
                <th key={h} style={{
                  padding: "8px 12px", textAlign: h === "Amount" ? "right" : "left",
                  fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "var(--muted)", fontWeight: 500
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((t) => {
              const st = STATUS_STYLES[t.status];
              return (
                <tr
                  key={t.id}
                  style={{ borderBottom: "1px solid var(--border)", transition: "background 0.15s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface2)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "12px", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{t.id}</td>
                  <td style={{ padding: "12px", fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text)" }}>{t.customer}</td>
                  <td style={{ padding: "12px", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>{t.product}</td>
                  <td style={{ padding: "12px", textAlign: "right", fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
                    {formatCurrency(t.amount)}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span style={{
                      fontSize: 11, fontFamily: "var(--font-mono)", padding: "3px 8px",
                      borderRadius: 4, color: st.color, background: st.bg
                    }}>{st.label}</span>
                  </td>
                  <td style={{ padding: "12px", fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                    {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
