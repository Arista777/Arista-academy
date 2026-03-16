import React from "react";

const students = [
  {
    name: "Ana Perez",
    belt: "Blue",
    status: "Al dia",
    plan: "Unlimited",
    progress: "2 stripes",
  },
  {
    name: "Luis Mora",
    belt: "White",
    status: "Pendiente",
    plan: "BJJ 3x",
    progress: "Onboarding",
  },
  {
    name: "Carla Soto",
    belt: "Purple",
    status: "Atrasado",
    plan: "Full Access",
    progress: "Ready for brown",
  },
  {
    name: "Mario Diaz",
    belt: "Brown",
    status: "Al dia",
    plan: "Pro Team",
    progress: "Competition prep",
  },
];

export default function Students() {
  return (
    <section className="space-y-6">
      <div className="card">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold">Estudiantes</h2>
            <p className="text-sm text-steel">Ultima actividad y estado de membresia.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full border border-mist px-4 py-2 text-xs font-semibold">Exportar</button>
            <button className="rounded-full bg-ember px-4 py-2 text-xs font-semibold text-white">Agregar alumno</button>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {students.map((student) => (
            <div key={student.name} className="rounded-2xl border border-mist bg-white/70 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-lg text-ink">{student.name}</p>
                  <p className="text-xs text-steel">Plan: {student.plan}</p>
                </div>
                <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                  {student.belt}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-steel">
                <span className="rounded-full bg-haze px-3 py-1 font-semibold text-ink">{student.progress}</span>
                <span className={`rounded-full px-3 py-1 font-semibold ${student.status === "Atrasado" ? "bg-ember/10 text-ember" : "bg-jade/10 text-jade"}`}>
                  {student.status}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-steel">
                <span>Ultima clase: 2 dias</span>
                <button className="font-semibold text-ember">Ver perfil</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
