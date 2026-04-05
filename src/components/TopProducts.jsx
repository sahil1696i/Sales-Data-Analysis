import React, { useState } from "react";
import { topProducts } from "../data/salesData";
import { formatCurrency, downloadFile, toCSV } from "../utils/helpers";
import { TrendingUp, TrendingDown, Download, Search } from "lucide-react";

const CATEGORIES = ["All", "Electronics", "Sports", "Apparel", "Home & Garden", "Books"];

export default function TopProducts() {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");
  const [sortKey, setSortKey]   = useState("revenue");
  const [sortAsc, setSortAsc]   = useState(false);

  const handleSort = (key) => {
    if (key === sortKey) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const filtered = topProducts
    .filter((p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]);

  const SortBtn = ({ k, label }) => (
    <button
      onClick={() => handleSort(k)}
      style={{
        background: "none", border: "none", color: sortKey === k ? "var(--accent)" : "var(--muted)",
        fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.08em",
        textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 4
      }}
    >
      {label} {sortKey === k && (sortAsc ? "↑" : "↓")}
    </button>
  );

  return (
    <div style={{
      background: "var(--surface)", border: "1px solid var(--border)",
      borderRadius: "var(--radius)", padding: "24px",
      animation: "fadeUp 0.5s ease 0.5s both"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Top Products</h2>
          <p style={{ color: "var(--muted)", fontSize: 12, fontFamily: "var(--font-mono)" }}>Performance by SKU — click headers to sort</p>
        </div>
        <button
          onClick={() => downloadFile(toCSV(filtered), "top-products.csv")}
          style={{
            padding: "6px 12px", borderRadius: 6, fontSize: 12,
            fontFamily: "var(--font-mono)", border: "1px solid var(--border)",
            background: "transparent", color: "var(--muted)",
            display: "flex", alignItems: "center", gap: 6, cursor: "pointer"
          }}
        ><Download size={13} /> Export</button>
      </div>

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
          <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products…"
            style={{
              width: "100%", paddingLeft: 30, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
              background: "var(--surface2)", border: "1px solid var(--border)",
              borderRadius: 6, color: "var(--text)", fontSize: 12, fontFamily: "var(--font-mono)",
              outline: "none"
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              style={{
                padding: "6px 12px", borderRadius: 6, fontSize: 11,
                fontFamily: "var(--font-mono)", border: "1px solid",
                borderColor: category === c ? "var(--accent2)" : "var(--border)",
                background: category === c ? "rgba(96,200,240,0.1)" : "transparent",
                color: category === c ? "var(--accent2)" : "var(--muted)", cursor: "pointer", transition: "all 0.2s"
              }}
            >{c}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {[
                { k: "name",     l: "Product",  numeric: false },
                { k: "sales",    l: "Units",    numeric: true  },
                { k: "revenue",  l: "Revenue",  numeric: true  },
                { k: "growth",   l: "Growth",   numeric: true  },
              ].map(({ k, l, numeric }) => (
                <th key={k} style={{ padding: "10px 12px", textAlign: numeric ? "right" : "left" }}>
                  <SortBtn k={k} label={l} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr
                key={p.name}
                style={{ borderBottom: "1px solid var(--border)", transition: "background 0.15s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface2)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "12px", fontSize: 13, fontFamily: "var(--font-mono)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11,
                      color: "var(--muted)", width: 20, textAlign: "right"
                    }}>{i + 1}</span>
                    <div>
                      <div style={{ color: "var(--text)", marginBottom: 2 }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em" }}>{p.category.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text)" }}>
                  {p.sales.toLocaleString()}
                </td>
                <td style={{ padding: "12px", textAlign: "right", fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
                  {formatCurrency(p.revenue)}
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 12, fontFamily: "var(--font-mono)", padding: "3px 8px", borderRadius: 4,
                    color: p.growth >= 0 ? "var(--success)" : "var(--danger)",
                    background: p.growth >= 0 ? "rgba(96,240,160,0.1)" : "rgba(240,96,96,0.1)"
                  }}>
                    {p.growth >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {p.growth > 0 ? "+" : ""}{p.growth}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p style={{ textAlign: "center", padding: "32px", color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
            No products match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
