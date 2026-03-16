import React from "react";

export default function SectionHeader({ kicker, title, subtitle, actions }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        {kicker ? (
          <p className="text-xs uppercase tracking-[0.28em] text-ember">{kicker}</p>
        ) : null}
        <h2 className="mt-2 font-display text-xl font-semibold text-ink">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-steel">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
