import React from "react";

export default function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-mist bg-white/60 p-6">
      <div>
        <p className="font-display text-lg text-ink">{title}</p>
        <p className="text-sm text-steel">{description}</p>
      </div>
      {action}
    </div>
  );
}
