import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import KPICard from "./components/KPICard";
import RevenueChart from "./components/RevenueChart";
import CategoryChart from "./components/CategoryChart";
import RegionalChart from "./components/RegionalChart";
import WeeklyOrders from "./components/WeeklyOrders";
import TopProducts from "./components/TopProducts";
import Transactions from "./components/Transactions";
import { kpiData } from "./data/salesData";
import {
  DollarSign, ShoppingBag, Tag, Percent, UserPlus, RotateCcw
} from "lucide-react";

const KPI_META = [
  { key: "totalRevenue",   label: "Total Revenue",     icon: DollarSign,  color: "#c8f060", delay: 0   },
  { key: "totalOrders",    label: "Total Orders",      icon: ShoppingBag, color: "#60c8f0", delay: 60  },
  { key: "avgOrderValue",  label: "Avg. Order Value",  icon: Tag,         color: "#f060c8", delay: 120 },
  { key: "conversionRate", label: "Conversion Rate",   icon: Percent,     color: "#f0c860", delay: 180 },
  { key: "newCustomers",   label: "New Customers",     icon: UserPlus,    color: "#60f0a0", delay: 240 },
  { key: "returnRate",     label: "Return Rate",       icon: RotateCcw,   color: "#f07060", delay: 300 },
];

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header />

        <main style={{ flex: 1, padding: "28px", display: "flex", flexDirection: "column", gap: 24 }}>

          {/* KPI Grid */}
          <section>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16
            }}>
              {KPI_META.map(({ key, label, icon, color, delay }) => (
                <KPICard
                  key={key}
                  label={label}
                  data={kpiData[key]}
                  icon={icon}
                  accentColor={color}
                  delay={delay}
                />
              ))}
            </div>
          </section>

          {/* Revenue + Category */}
          <section style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 20,
          }}>
            <RevenueChart />
            <CategoryChart />
          </section>

          {/* Regional + Weekly */}
          <section style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}>
            <RegionalChart />
            <WeeklyOrders />
          </section>

          {/* Top Products */}
          <TopProducts />

          {/* Transactions */}
          <Transactions />

        </main>

        <footer style={{
          borderTop: "1px solid var(--border)",
          padding: "14px 28px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "var(--surface)"
        }}>
          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
            © 2024 SalesIQ Dashboard — All data is sample data
          </span>
          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
            Built with React + Recharts
          </span>
        </footer>
      </div>
    </div>
  );
}
