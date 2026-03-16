import React from "react";

const variants = {
  ok: "bg-jade/10 text-jade",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-ember/10 text-ember",
  neutral: "bg-haze text-ink",
};

export default function StatusPill({ status, variant = "neutral" }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${variants[variant] || variants.neutral}`}>
      {status}
    </span>
  );
}
