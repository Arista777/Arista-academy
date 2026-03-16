import React from "react";
import { NavLink } from "react-router-dom";

const nav = [
  { id: "dashboard", label: "Dashboard", to: "/" },
  { id: "students", label: "Estudiantes", to: "/students" },
  { id: "payments", label: "Pagos", to: "/payments" },
  { id: "attendance", label: "Asistencias", to: "/attendance" },
  { id: "classes", label: "Clases", to: "/classes" },
  { id: "techniques", label: "Tecnicas", to: "/techniques" },
  { id: "progress", label: "Progreso", to: "/progress" },
];

export default function Sidebar() {
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
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) =>
              `flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                isActive ? "bg-ink text-white shadow" : "text-steel hover:bg-mist"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{item.label}</span>
                <span className={`h-2 w-2 rounded-full ${isActive ? "bg-ember" : "bg-transparent"}`}></span>
              </>
            )}
          </NavLink>
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
