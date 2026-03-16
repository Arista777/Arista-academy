import React from "react";

const items = [
  { name: "Ana Perez", amount: "CRC 35.000", status: "Pagado", method: "Tarjeta" },
  { name: "Luis Mora", amount: "CRC 30.000", status: "Pendiente", method: "Transferencia" },
  { name: "Carla Soto", amount: "CRC 45.000", status: "Vencido", method: "Efectivo" },
];

const plans = [
  { plan: "Unlimited", active: 94 },
  { plan: "BJJ 3x", active: 48 },
  { plan: "Muay Thai", active: 32 },
];

export default function Payments() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">Pagos recientes</h2>
              <p className="text-sm text-steel">Ultimos movimientos y estado.</p>
            </div>
            <button className="rounded-full bg-ember px-4 py-2 text-xs font-semibold text-white">Registrar pago</button>
          </div>
          <div className="mt-5 divide-y divide-mist">
            {items.map((item) => (
              <div key={item.name} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-display text-base text-ink">{item.name}</p>
                  <p className="text-xs text-steel">{item.amount} · {item.method}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === "Pagado" ? "bg-jade/10 text-jade" : item.status === "Pendiente" ? "bg-amber-100 text-amber-700" : "bg-ember/10 text-ember"}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h2 className="font-display text-xl font-semibold">Mix de planes</h2>
          <p className="text-sm text-steel">Distribucion de membresias activas.</p>
          <div className="mt-6 space-y-4">
            {plans.map((item) => (
              <div key={item.plan}>
                <div className="flex items-center justify-between text-xs font-semibold text-steel">
                  <span>{item.plan}</span>
                  <span>{item.active}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-mist">
                  <div className="h-2 rounded-full bg-ink" style={{ width: `${item.active}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
