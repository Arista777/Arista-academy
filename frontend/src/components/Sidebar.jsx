import React from "react";

const nav = [
  { id: "dashboard", label: "Dashboard" },
  { id: "students", label: "Estudiantes" },
  { id: "payments", label: "Pagos" },
  { id: "attendance", label: "Asistencias" },
  { id: "classes", label: "Clases" },
  { id: "techniques", label: "Tecnicas" },
  { id: "progress", label: "Progreso" },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="card flex h-full flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-white">
          <span className="text-lg font-semibold">A</span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ember">Arista</p>
          <p className="font-display text-lg font-semibold text-ink">Academy CRM</p>
        </div>
      </div>
      <div className="rounded-xl bg-haze px-4 py-3 text-xs text-steel">
        <p className="font-display text-sm text-ink">Sede Central</p>
        <p className="mt-1">BJJ + Muay Thai · 4 coaches</p>
      </div>
      <div className="space-y-2">
        {nav.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
              active === item.id
                ? "bg-ink text-white shadow"
                : "text-steel hover:bg-mist"
            }`}
          >
            <span>{item.label}</span>
            <span className={`h-2 w-2 rounded-full ${active === item.id ? "bg-ember" : "bg-transparent"}`}></span>
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-mist px-4 py-4 text-sm text-ink">
        <p className="font-display text-base">Estado del dia</p>
        <div className="mt-3 space-y-2 text-xs text-steel">
          <p>Retencion mensual: 92%</p>
          <p>Clases llenas: 3 de 6</p>
          <p>Pagos atrasados: 8</p>
        </div>
      </div>
    </aside>
  );
}
