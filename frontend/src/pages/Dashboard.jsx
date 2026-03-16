import React from "react";
import useApi from "../hooks/useApi.js";
import DataStat from "../components/DataStat.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { fetchDashboard } from "../utils/api.js";
import { demoDashboard } from "../utils/demoData.js";

function getPayload(data) {
  return data || demoDashboard;
}

export default function Dashboard() {
  const { data, loading, error } = useApi(fetchDashboard, []);
  const payload = getPayload(data);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SectionHeader
          kicker="Resumen"
          title="Indicadores clave"
          subtitle="Lo esencial de la operacion en tiempo real."
        />
        <span className="rounded-full bg-haze px-3 py-1 text-xs font-semibold text-ink">
          {loading ? "Sincronizando" : error ? "Modo demo" : "Conectado"}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {payload.stats.map((card) => (
          <DataStat key={card.label} label={card.label} value={card.value} change={card.change} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="card">
          <SectionHeader
            title="Ingresos por membresia"
            subtitle="Ultimos 6 meses"
            actions={[
              <button key="report" className="rounded-full border border-mist px-3 py-1 text-xs font-semibold text-ink">
                Ver reporte
              </button>,
            ]}
          />
          <div className="mt-6 flex h-56 items-end gap-3">
            {payload.revenue.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-3">
                <div className="w-full rounded-full bg-mist">
                  <div
                    className="rounded-full bg-ember"
                    style={{ height: `${item.value * 2}px` }}
                  ></div>
                </div>
                <span className="text-xs font-semibold text-steel">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-strong">
          <SectionHeader title="Alertas activas" subtitle="Acciones inmediatas." />
          {payload.alerts.length ? (
            <ul className="mt-4 space-y-3 text-sm text-sand/80">
              {payload.alerts.map((alert) => (
                <li key={alert} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-ember"></span>
                  <span>{alert}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Todo en orden" description="No hay alertas urgentes hoy." />
          )}
          <button className="mt-6 w-full rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold">Gestionar alertas</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="card">
          <SectionHeader title="Agenda de hoy" subtitle="Clases y coaches asignados." />
          <div className="mt-5 space-y-3">
            {payload.schedule.map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-xl border border-mist px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-steel">{item.time}</p>
                  <p className="font-display text-lg text-ink">{item.name}</p>
                </div>
                <span className="text-xs font-semibold text-ember">{item.coach}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <SectionHeader title="Ritmo de asistencia" subtitle="Comparacion semanal por programa." />
          <div className="mt-6 space-y-4">
            {payload.attendance.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs font-semibold text-steel">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-mist">
                  <div className="h-2 rounded-full bg-ink" style={{ width: `${item.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
