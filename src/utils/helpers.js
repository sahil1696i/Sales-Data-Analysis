// Format a number as currency
export const formatCurrency = (val) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

// Format large numbers with K / M suffix
export const formatNumber = (val) => {
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000)     return `${(val / 1_000).toFixed(1)}K`;
  return val.toString();
};

// Return colour class for a growth percentage
export const growthColor = (g) => (g >= 0 ? "var(--success)" : "var(--danger)");

// Clamp a value between min and max
export const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// Generate a simple CSV from an array of objects
export const toCSV = (rows) => {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(","), ...rows.map((r) => headers.map((h) => r[h]).join(","))];
  return lines.join("\n");
};

// Trigger a browser download
export const downloadFile = (content, filename, type = "text/csv") => {
  const blob = new Blob([content], { type });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
};
