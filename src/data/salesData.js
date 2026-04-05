// ──────────────────────────────────────────────
// SALES DATA  — used across the entire dashboard
// ──────────────────────────────────────────────

export const monthlyRevenue = [
  { month: "Jan", revenue: 42000, target: 40000, lastYear: 36000 },
  { month: "Feb", revenue: 38500, target: 42000, lastYear: 34000 },
  { month: "Mar", revenue: 51000, target: 45000, lastYear: 41000 },
  { month: "Apr", revenue: 47800, target: 46000, lastYear: 43500 },
  { month: "May", revenue: 56200, target: 50000, lastYear: 47000 },
  { month: "Jun", revenue: 62100, target: 55000, lastYear: 52000 },
  { month: "Jul", revenue: 58400, target: 57000, lastYear: 54000 },
  { month: "Aug", revenue: 64800, target: 60000, lastYear: 56000 },
  { month: "Sep", revenue: 71300, target: 65000, lastYear: 60000 },
  { month: "Oct", revenue: 68900, target: 68000, lastYear: 63000 },
  { month: "Nov", revenue: 79500, target: 72000, lastYear: 69000 },
  { month: "Dec", revenue: 91200, target: 80000, lastYear: 77000 },
];

export const categoryData = [
  { name: "Electronics",  value: 34, color: "#c8f060" },
  { name: "Apparel",      value: 22, color: "#60c8f0" },
  { name: "Home & Garden",value: 18, color: "#f060c8" },
  { name: "Sports",       value: 14, color: "#f0c860" },
  { name: "Books",        value: 12, color: "#60f0a0" },
];

export const topProducts = [
  { name: "Pro Laptop X1",      sales: 1842, revenue: 184200, growth: 23.4, category: "Electronics" },
  { name: "Wireless Earbuds Z", sales: 3210, revenue: 96300,  growth: 41.2, category: "Electronics" },
  { name: "Running Shoes Pro",  sales: 2750, revenue: 82500,  growth: 18.7, category: "Sports"      },
  { name: "Smart Watch S3",     sales: 1540, revenue: 77000,  growth: -4.2, category: "Electronics" },
  { name: "Denim Jacket Classic",sales:2100, revenue: 63000,  growth: 12.1, category: "Apparel"     },
  { name: "Garden Tool Set",    sales: 1280, revenue: 38400,  growth: 29.6, category: "Home & Garden"},
  { name: "Novel Bundle Pack",  sales: 4100, revenue: 36900,  growth: 8.3,  category: "Books"       },
  { name: "Yoga Mat Premium",   sales: 1900, revenue: 34200,  growth: 55.1, category: "Sports"      },
];

export const regionData = [
  { region: "North", q1: 38000, q2: 52000, q3: 61000, q4: 74000 },
  { region: "South", q1: 29000, q2: 41000, q3: 48000, q4: 59000 },
  { region: "East",  q1: 44000, q2: 57000, q3: 66000, q4: 82000 },
  { region: "West",  q1: 51000, q2: 63000, q3: 72000, q4: 91000 },
];

export const weeklyOrders = [
  { day: "Mon", orders: 120, returns: 8  },
  { day: "Tue", orders: 145, returns: 11 },
  { day: "Wed", orders: 162, returns: 9  },
  { day: "Thu", orders: 138, returns: 13 },
  { day: "Fri", orders: 195, returns: 15 },
  { day: "Sat", orders: 231, returns: 21 },
  { day: "Sun", orders: 178, returns: 17 },
];

export const kpiData = {
  totalRevenue:   { value: 731700,  change: 18.4, unit: "$"  },
  totalOrders:    { value: 24680,   change: 12.7, unit: ""   },
  avgOrderValue:  { value: 296.5,   change: 5.1,  unit: "$"  },
  conversionRate: { value: 3.82,    change: -0.4, unit: "%"  },
  newCustomers:   { value: 8412,    change: 22.1, unit: ""   },
  returnRate:     { value: 9.4,     change: -1.2, unit: "%"  },
};

export const recentTransactions = [
  { id: "TXN-9821", customer: "Alex Morgan",    product: "Pro Laptop X1",       amount: 1299, status: "completed", date: "2024-12-14" },
  { id: "TXN-9820", customer: "Jamie Chen",     product: "Wireless Earbuds Z",  amount: 299,  status: "completed", date: "2024-12-14" },
  { id: "TXN-9819", customer: "Sam Rivera",     product: "Smart Watch S3",      amount: 499,  status: "pending",   date: "2024-12-13" },
  { id: "TXN-9818", customer: "Jordan Kim",     product: "Running Shoes Pro",   amount: 189,  status: "completed", date: "2024-12-13" },
  { id: "TXN-9817", customer: "Casey Park",     product: "Garden Tool Set",     amount: 149,  status: "refunded",  date: "2024-12-12" },
  { id: "TXN-9816", customer: "Riley Johnson",  product: "Yoga Mat Premium",    amount: 89,   status: "completed", date: "2024-12-12" },
  { id: "TXN-9815", customer: "Drew Wilson",    product: "Denim Jacket Classic", amount: 249, status: "pending",   date: "2024-12-11" },
  { id: "TXN-9814", customer: "Taylor Brown",   product: "Novel Bundle Pack",   amount: 59,   status: "completed", date: "2024-12-11" },
];
