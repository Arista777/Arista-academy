import React from "react";

const classes = [
  {
    name: "BJJ Fundamentals",
    coach: "Coach Vega",
    schedule: "Lun / Mie / Vie · 6:00 AM",
    capacity: "24"
  },
  {
    name: "Muay Thai Power",
    coach: "Coach Rojas",
    schedule: "Mar / Jue · 7:30 PM",
    capacity: "20"
  },
  {
    name: "Competition Team",
    coach: "Coach Lima",
    schedule: "Sab · 9:00 AM",
    capacity: "16"
  }
];

const nextSessions = [
  { time: "Hoy 6:00 AM", className: "BJJ Fundamentals", roster: "18/24" },
  { time: "Hoy 7:30 PM", className: "Muay Thai Power", roster: "14/20" },
  { time: "Manana 6:00 AM", className: "BJJ Fundamentals", roster: "12/24" },
];

export default function Classes() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">Clases activas</h2>
              <p className="text-sm text-steel">Programacion semanal y coaches asignados.</p>
            </div>
            <button className="rounded-full bg-ember px-4 py-2 text-xs font-semibold text-white">Nueva clase</button>
          </div>
          <div className="mt-6 space-y-4">
            {classes.map((item) => (
              <div key={item.name} className="rounded-2xl border border-mist bg-white/70 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg text-ink">{item.name}</p>
                    <p className="text-xs text-steel">{item.schedule}</p>
                  </div>
                  <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                    Cupo {item.capacity}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-steel">
                  <span>Instructor: {item.coach}</span>
                  <button className="font-semibold text-ember">Ver detalle</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="font-display text-xl font-semibold">Siguientes sesiones</h2>
          <p className="text-sm text-steel">Lista rapida para check-in.</p>
          <div className="mt-6 space-y-3">
            {nextSessions.map((item) => (
              <div key={item.time} className="flex items-center justify-between rounded-xl border border-mist px-4 py-3">
                <div>
                  <p className="text-xs text-steel">{item.time}</p>
                  <p className="font-display text-base text-ink">{item.className}</p>
                </div>
                <span className="rounded-full bg-haze px-3 py-1 text-xs font-semibold text-ink">
                  {item.roster}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
