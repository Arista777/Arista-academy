import React, { useState } from "react";

const defaultApi = "http://localhost:3000";

export default function Topbar() {
  const saved = localStorage.getItem("arista_api_base") || "";
  const [value, setValue] = useState(saved);

  const onSubmit = (event) => {
    event.preventDefault();
    if (value.trim()) {
      localStorage.setItem("arista_api_base", value.trim());
    } else {
      localStorage.removeItem("arista_api_base");
    }
    window.location.reload();
  };

  return (
    <div className="card flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-ember">Control Center</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink">Panel general</h1>
        <p className="mt-2 text-sm text-steel">Todo tu dojo conectado: alumnos, clases y pagos en un solo lugar.</p>
      </div>
      <div className="flex flex-col gap-3 lg:items-end">
        <div className="flex flex-wrap gap-2">
          <button className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white">Crear clase</button>
          <button className="rounded-full border border-mist px-4 py-2 text-xs font-semibold text-ink">Registrar pago</button>
          <button className="rounded-full border border-mist px-4 py-2 text-xs font-semibold text-ink">Nuevo alumno</button>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={defaultApi}
            className="w-full rounded-xl border border-mist bg-haze px-3 py-2 text-xs font-semibold text-ink outline-none focus:border-ember sm:w-60"
          />
          <button className="rounded-xl bg-ember px-4 py-2 text-xs font-semibold text-white">Guardar API</button>
        </form>
      </div>
    </div>
  );
}
