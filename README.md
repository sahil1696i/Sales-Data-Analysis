# 📊 Sales Data Analysis Dashboard

A production-ready, interactive Sales Analytics Dashboard built with **React** + **Recharts**. Designed with a dark-mode aesthetic, fully responsive layout, and rich data visualization features.

![Dashboard Preview](./preview.png)

---

## ✨ Features

- **KPI Cards** — Revenue, Orders, Avg. Order Value, Conversion Rate, New Customers, Return Rate (with YoY change indicators)
- **Revenue Overview Chart** — Composed area + line chart showing Revenue vs Target vs Last Year (6M / 12M toggle)
- **Sales by Category** — Interactive donut chart with hover-to-highlight behaviour
- **Regional Performance** — Grouped bar chart with quarterly breakdown (North / South / East / West)
- **Weekly Orders** — Bar chart highlighting peak day, with orders vs returns split
- **Top Products Table** — Sortable (click headers), filterable by category, with search input
- **Recent Transactions** — Status-filtered table (All / Completed / Pending / Refunded)
- **CSV Export** — Every table and the revenue chart include an Export button
- **Collapsible Sidebar** — Smooth slide-in/out with icon-only mode
- **Live indicator** — Animated badge in the header

---

## 🛠 Tech Stack

| Tool        | Version   | Purpose                         |
|-------------|-----------|----------------------------------|
| React       | 18.x      | UI framework                    |
| Vite        | 5.x       | Build tool & dev server         |
| Recharts    | 2.x       | Charts & data visualizations    |
| Lucide React| 0.383     | Icon set                        |
| Google Fonts| —         | Syne (display) + DM Mono (body) |

No TypeScript, no Redux, no heavy dependencies — just clean React with hooks.

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/sales-dashboard.git
cd sales-dashboard

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build        # outputs to /dist
npm run preview      # preview the production build locally
```

---

## 📁 Project Structure

```
sales-dashboard/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx           # React entry point
    ├── App.jsx            # Root layout (sidebar + main)
    ├── index.css          # Global styles & CSS variables
    ├── data/
    │   └── salesData.js   # All mock data (easy to swap for an API)
    ├── utils/
    │   └── helpers.js     # formatCurrency, toCSV, downloadFile, etc.
    └── components/
        ├── Header.jsx
        ├── Sidebar.jsx
        ├── KPICard.jsx
        ├── RevenueChart.jsx
        ├── CategoryChart.jsx
        ├── RegionalChart.jsx
        ├── WeeklyOrders.jsx
        ├── TopProducts.jsx
        └── Transactions.jsx
```

---

## 🔌 Connecting Real Data

All data lives in `src/data/salesData.js`. To connect a real backend:

1. Replace the static exports with `async` fetch calls (e.g. using `fetch` or `axios`).
2. Use React's `useState` + `useEffect` inside each component to load and store the data.
3. Add a loading skeleton or spinner while the data is in flight.

Example:

```js
// src/data/api.js
export async function fetchKPIs() {
  const res = await fetch("https://your-api.com/kpis");
  return res.json();
}
```

---

## 📜 License

MIT — free to use, modify, and distribute.

---

## 🙌 Credits

- Charts powered by [Recharts](https://recharts.org/)
- Icons by [Lucide](https://lucide.dev/)
- Fonts: [Syne](https://fonts.google.com/specimen/Syne) & [DM Mono](https://fonts.google.com/specimen/DM+Mono) via Google Fonts
