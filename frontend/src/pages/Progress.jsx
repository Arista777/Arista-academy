import React from "react";

const belts = [
  { belt: "White", count: 48 },
  { belt: "Blue", count: 36 },
  { belt: "Purple", count: 22 },
  { belt: "Brown", count: 12 },
  { belt: "Black", count: 6 },
];

const promotions = [
  { name: "Ana Perez", belt: "Blue", date: "Mar 10" },
  { name: "Mario Diaz", belt: "Brown", date: "Mar 08" },
  { name: "Carla Soto", belt: "Purple", date: "Mar 01" },
];

export default function Progress() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="card">
          <h2 className="font-display text-xl font-semibold">Distribucion de cinturones</h2>
          <p className="text-sm text-steel">Estado actual del programa de BJJ.</p>
          <div className="mt-6 space-y-4">
            {belts.map((item) => (
              <div key={item.belt}>
                <div className="flex items-center justify-between text-xs font-semibold text-steel">
                  <span>{item.belt}</span>
                  <span>{item.count}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-mist">
                  <div className="h-2 rounded-full bg-ink" style={{ width: `${item.count}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="font-display text-xl font-semibold">Promociones recientes</h2>
          <p className="text-sm text-steel">Ultimos ascensos registrados.</p>
          <div className="mt-6 space-y-3">
            {promotions.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-mist px-4 py-3">
                <div>
                  <p className="font-display text-base text-ink">{item.name}</p>
                  <p className="text-xs text-steel">{item.date}</p>
                </div>
                <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                  {item.belt}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="font-display text-xl font-semibold">Progreso individual</h2>
        <p className="text-sm text-steel">Notas de coaches, objetivos y tecnicas dominadas.</p>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            {
              name: "Ana Perez",
              focus: "Guard attacks",
              goals: "Triangle + Armbar",
              checkins: "8 sesiones"
            },
            {
              name: "Luis Mora",
              focus: "Fundamentals",
              goals: "Shrimp + Frames",
              checkins: "5 sesiones"
            },
            {
              name: "Carla Soto",
              focus: "Passing",
              goals: "Knee slice",
              checkins: "10 sesiones"
            }
          ].map((item) => (
            <div key={item.name} className="rounded-2xl border border-mist bg-white/70 p-5">
              <p className="font-display text-lg text-ink">{item.name}</p>
              <p className="text-xs text-steel">Focus: {item.focus}</p>
              <div className="mt-3 space-y-2 text-xs text-steel">
                <p>Objetivo: {item.goals}</p>
                <p>Asistencias: {item.checkins}</p>
              </div>
              <button className="mt-4 text-xs font-semibold text-ember">Ver ficha completa</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
