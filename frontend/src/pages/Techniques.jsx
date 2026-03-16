import React from "react";

const techniques = [
  {
    name: "Triangle choke",
    category: "Guard attacks",
    related: ["Armbar", "Omoplata"],
    resources: "Video + Drills"
  },
  {
    name: "Knee slice pass",
    category: "Passing",
    related: ["Underhook", "Crossface"],
    resources: "Notes + Sparring cues"
  },
  {
    name: "Teep",
    category: "Muay Thai basics",
    related: ["Jab", "Rear kick"],
    resources: "Video + Pad combos"
  }
];

export default function Techniques() {
  return (
    <section className="space-y-6">
      <div className="card">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold">Base de conocimiento</h2>
            <p className="text-sm text-steel">Crea relaciones entre tecnicas y recursos.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full border border-mist px-4 py-2 text-xs font-semibold">Agregar recurso</button>
            <button className="rounded-full bg-ember px-4 py-2 text-xs font-semibold text-white">Nueva tecnica</button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {techniques.map((item) => (
            <div key={item.name} className="rounded-2xl border border-mist bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-steel">{item.category}</p>
              <p className="mt-2 font-display text-lg text-ink">{item.name}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.related.map((rel) => (
                  <span key={rel} className="rounded-full bg-haze px-3 py-1 text-xs font-semibold text-ink">
                    {rel}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-steel">{item.resources}</p>
              <button className="mt-4 text-xs font-semibold text-ember">Ver mapa</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
