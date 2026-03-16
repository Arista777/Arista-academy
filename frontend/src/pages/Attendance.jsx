import React from "react";

const sessions = [
  { className: "BJJ Fundamentals", date: "2026-03-15", attendees: 18, occupancy: "75%" },
  { className: "Muay Thai", date: "2026-03-14", attendees: 12, occupancy: "60%" },
  { className: "Open Mat", date: "2026-03-14", attendees: 26, occupancy: "92%" },
];

const streaks = [
  { name: "Ana Perez", days: 12 },
  { name: "Carla Soto", days: 9 },
  { name: "Mario Diaz", days: 8 },
];

export default function Attendance() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">Asistencias recientes</h2>
              <p className="text-sm text-steel">Control de check-ins por clase.</p>
            </div>
            <button className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white">Nuevo check-in</button>
          </div>
          <div className="mt-5 space-y-3">
            {sessions.map((session) => (
              <div key={session.className} className="flex items-center justify-between rounded-2xl border border-mist bg-white/70 p-4">
                <div>
                  <p className="font-display text-base text-ink">{session.className}</p>
                  <p className="text-xs text-steel">{session.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-ember">{session.attendees} asistentes</p>
                  <p className="text-xs text-steel">{session.occupancy} cupo</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="font-display text-xl font-semibold">Rachas activas</h2>
          <p className="text-sm text-steel">Alumnos con mayor frecuencia.</p>
          <div className="mt-6 space-y-4">
            {streaks.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-mist px-4 py-3">
                <span className="text-sm font-semibold text-ink">{item.name}</span>
                <span className="rounded-full bg-jade/10 px-3 py-1 text-xs font-semibold text-jade">
                  {item.days} dias
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
