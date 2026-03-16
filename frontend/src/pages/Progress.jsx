import React from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import useApi from "../hooks/useApi.js";
import { fetchProgress } from "../utils/api.js";
import { demoBelts, demoPromotions, demoProgress } from "../utils/demoData.js";

export default function Progress() {
  const { data, error } = useApi(fetchProgress, []);
  const belts = (data && data.belts) || demoBelts;
  const promotions = (data && data.promotions) || demoPromotions;
  const students = (data && data.students) || demoProgress;

  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="card">
          <SectionHeader title="Distribucion de cinturones" subtitle="Estado actual del programa de BJJ." />
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
          <SectionHeader title="Promociones recientes" subtitle="Ultimos ascensos registrados." />
          <div className="mt-6 space-y-3">
            {promotions.map((item) => (
              <div key={item.id || item.name} className="flex items-center justify-between rounded-xl border border-mist px-4 py-3">
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
        <SectionHeader title="Progreso individual" subtitle="Notas de coaches, objetivos y tecnicas dominadas." />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {students.map((item) => (
            <div key={item.id || item.name} className="rounded-2xl border border-mist bg-white/70 p-5">
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
        {error ? (
          <p className="mt-4 text-xs text-ember">No se pudo conectar a la API. Mostrando demo.</p>
        ) : null}
      </div>
    </section>
  );
}
