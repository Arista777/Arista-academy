import React from "react";

export default function DataStat({ label, value, change }) {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-[0.2em] text-ember">{label}</p>
      <div className="mt-4 flex items-end justify-between">
        <p className="font-display text-3xl font-semibold text-ink">{value}</p>
        {change ? (
          <span className="rounded-full bg-haze px-3 py-1 text-xs font-semibold text-ink">
            {change}
          </span>
        ) : null}
      </div>
    </div>
  );
}
