import React from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import StatusPill from "../components/StatusPill.jsx";
import EmptyState from "../components/EmptyState.jsx";
import useApi from "../hooks/useApi.js";
import { fetchStudents } from "../utils/api.js";
import { demoStudents } from "../utils/demoData.js";

function mapStatus(status) {
  if (!status) return "neutral";
  const lowered = status.toLowerCase();
  if (lowered.includes("atras")) return "overdue";
  if (lowered.includes("pend")) return "pending";
  return "ok";
}

export default function Students() {
  const { data, loading, error } = useApi(fetchStudents, []);
  const students = (data && data.students) || data || demoStudents;

  return (
    <section className="space-y-6 animate-rise">
      <div className="card">
        <SectionHeader
          kicker="Academia"
          title="Estudiantes"
          subtitle="Ultima actividad y estado de membresia."
          actions={[
            <button key="export" className="rounded-full border border-mist px-4 py-2 text-xs font-semibold">Exportar</button>,
            <button key="add" className="rounded-full bg-ember px-4 py-2 text-xs font-semibold text-white">Agregar alumno</button>,
          ]}
        />
        {loading && !students.length ? (
          <div className="mt-6 text-sm text-steel">Cargando estudiantes...</div>
        ) : students.length ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {students.map((student) => (
              <div key={student.id || student.name} className="rounded-2xl border border-mist bg-white/70 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg text-ink">{student.name}</p>
                    <p className="text-xs text-steel">Plan: {student.plan || student.membership_plan || "Sin plan"}</p>
                  </div>
                  <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                    {student.belt || "White"}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-steel">
                  <span className="rounded-full bg-haze px-3 py-1 font-semibold text-ink">
                    {student.progress || "Sin progreso"}
                  </span>
                  <StatusPill status={student.status || "Al dia"} variant={mapStatus(student.status)} />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-steel">
                  <span>Ultima clase: {student.lastClass || "Sin datos"}</span>
                  <button className="font-semibold text-ember">Ver perfil</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <EmptyState
              title="Sin estudiantes"
              description="Registra el primer alumno para empezar a medir progreso."
              action={<button className="rounded-full bg-ember px-4 py-2 text-xs font-semibold text-white">Agregar alumno</button>}
            />
          </div>
        )}
        {error ? (
          <p className="mt-4 text-xs text-ember">No se pudo conectar a la API. Mostrando demo.</p>
        ) : null}
      </div>
    </section>
  );
}
