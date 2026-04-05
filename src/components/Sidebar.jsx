import React from "react";
import {
  LayoutDashboard, ShoppingCart, Package, Users, BarChart3,
  Settings, Bell, ChevronRight
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Overview",  active: true  },
  { icon: ShoppingCart,    label: "Orders",    active: false },
  { icon: Package,         label: "Products",  active: false },
  { icon: Users,           label: "Customers", active: false },
  { icon: BarChart3,       label: "Analytics", active: false },
  { icon: Settings,        label: "Settings",  active: false },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      minHeight: "100vh",
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      padding: "0",
      transition: "width 0.25s ease",
      flexShrink: 0,
      position: "sticky",
      top: 0,
      alignSelf: "flex-start",
      maxHeight: "100vh",
      overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? "20px 0" : "20px 20px",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center",
        justifyContent: collapsed ? "center" : "space-between",
        gap: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: "var(--accent)",
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <BarChart3 size={18} color="var(--bg)" />
          </div>
          {!collapsed && (
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, lineHeight: 1.2 }}>SalesIQ</div>
              <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.1em" }}>ANALYTICS</div>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: 2 }}
          ><ChevronRight size={14} style={{ transform: "rotate(180deg)" }} /></button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            title={collapsed ? label : undefined}
            style={{
              display: "flex", alignItems: "center",
              gap: collapsed ? 0 : 10,
              justifyContent: collapsed ? "center" : "flex-start",
              padding: collapsed ? "10px 0" : "10px 12px",
              borderRadius: 8,
              background: active ? "rgba(200,240,96,0.1)" : "transparent",
              border: active ? "1px solid rgba(200,240,96,0.2)" : "1px solid transparent",
              color: active ? "var(--accent)" : "var(--muted)",
              fontSize: 13, fontFamily: "var(--font-mono)", cursor: "pointer",
              transition: "all 0.15s", width: "100%",
            }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "var(--muted)"; }}
          >
            <Icon size={16} />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse toggle (when collapsed) */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          style={{
            margin: "0 auto 16px", display: "block", background: "none",
            border: "1px solid var(--border)", color: "var(--muted)",
            borderRadius: 6, padding: "6px 8px", cursor: "pointer"
          }}
          title="Expand sidebar"
        ><ChevronRight size={13} /></button>
      )}

      {/* Footer */}
      {!collapsed && (
        <div style={{
          padding: "16px", borderTop: "1px solid var(--border)",
          display: "flex", alignItems: "center", gap: 10
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: "var(--bg)", flexShrink: 0
          }}>A</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Admin User</div>
            <div style={{ fontSize: 10, color: "var(--muted)" }}>admin@salesiq.com</div>
          </div>
        </div>
      )}
    </aside>
  );
}
