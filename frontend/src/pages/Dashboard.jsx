import React from "react";

const stats = [
  { label: "Estudiantes activos", value: "214", change: "+8%" },
  { label: "Membresias activas", value: "186", change: "+5%" },
  { label: "Pagos pendientes", value: "9", change: "-12%" },
  { label: "Asistencias semana", value: "642", change: "+14%" },
];

const revenue = [
  { month: "Oct", value: 38 },
  { month: "Nov", value: 42 },
  { month: "Dic", value: 46 },
  { month: "Ene", value: 51 },
  { month: "Feb", value: 58 },
  { month: "Mar", value: 62 },
];

const alerts = [
  "3 estudiantes con pago vencido",
  "2 clases con lista de espera",
  "1 alumno con inactividad de 30 dias",
];

const schedule = [
  { time: "6:00 AM", name: "BJJ Fundamentals", coach: "Coach Vega" },
  { time: "12:30 PM", name: "Muay Thai Pads", coach: "Coach Rojas" },
  { time: "7:00 PM", name: "BJJ Sparring", coach: "Coach Lima" },
];

export default function Dashboard() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((card) => (
          <div key={card.label} className="card">
            <p className="text-xs uppercase tracking-[0.2em] text-ember">{card.label}</p>
            <div className="mt-4 flex items-end justify-between">
              <p className="font-display text-3xl font-semibold text-ink">{card.value}</p>
              <span className="rounded-full bg-haze px-3 py-1 text-xs font-semibold text-ink">
                {card.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">Ingresos por membresia</h2>
              <p className="text-sm text-steel">Ultimos 6 meses</p>
            </div>
            <button className="rounded-full border border-mist px-3 py-1 text-xs font-semibold text-ink">Ver reporte</button>
          </div>
          <div className="mt-6 flex h-56 items-end gap-3">
            {revenue.map((item) => (
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
          <h2 className="font-display text-xl font-semibold">Alertas activas</h2>
          <ul className="mt-4 space-y-3 text-sm text-sand/80">
            {alerts.map((alert) => (
              <li key={alert} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-ember"></span>
                <span>{alert}</span>
              </li>
            ))}
          </ul>
          <button className="mt-6 w-full rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold">Gestionar alertas</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="card">
          <h2 className="font-display text-xl font-semibold">Agenda de hoy</h2>
          <div className="mt-5 space-y-3">
            {schedule.map((item) => (
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
          <h2 className="font-display text-xl font-semibold">Ritmo de asistencia</h2>
          <p className="text-sm text-steel">Comparacion semanal por programa.</p>
          <div className="mt-6 space-y-4">
            {[
              { label: "BJJ", value: 82 },
              { label: "Muay Thai", value: 64 },
              { label: "Open Mat", value: 41 },
            ].map((item) => (
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
