import React from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import useApi from "../hooks/useApi.js";
import { fetchClasses } from "../utils/api.js";
import { demoClasses, demoSessions } from "../utils/demoData.js";

export default function Classes() {
  const { data, error } = useApi(fetchClasses, []);
  const classes = (data && data.classes) || data || demoClasses;
  const sessions = (data && data.sessions) || demoSessions;

  return (
    <section className="space-y-6 animate-rise">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="card">
          <SectionHeader
            kicker="Programacion"
            title="Clases activas"
            subtitle="Programacion semanal y coaches asignados."
            actions={[
              <button key="new" className="rounded-full bg-ember px-4 py-2 text-xs font-semibold text-white">Nueva clase</button>,
            ]}
          />
          <div className="mt-6 space-y-4">
            {classes.map((item) => (
              <div key={item.id || item.name} className="rounded-2xl border border-mist bg-white/70 p-5">
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
          <SectionHeader title="Siguientes sesiones" subtitle="Lista rapida para check-in." />
          <div className="mt-6 space-y-3">
            {sessions.map((item) => (
              <div key={item.id || item.time} className="flex items-center justify-between rounded-xl border border-mist px-4 py-3">
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
          {error ? (
            <p className="mt-4 text-xs text-ember">No se pudo conectar a la API. Mostrando demo.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
