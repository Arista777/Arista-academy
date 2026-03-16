import React from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import StatusPill from "../components/StatusPill.jsx";
import useApi from "../hooks/useApi.js";
import { fetchPayments } from "../utils/api.js";
import { demoPayments, demoPlans } from "../utils/demoData.js";

function mapStatus(status) {
  if (!status) return "neutral";
  const lowered = status.toLowerCase();
  if (lowered.includes("venc")) return "overdue";
  if (lowered.includes("pend")) return "pending";
  if (lowered.includes("pag")) return "ok";
  return "neutral";
}

export default function Payments() {
  const { data, error } = useApi(fetchPayments, []);
  const payments = (data && data.payments) || data || demoPayments;
  const plans = (data && data.plans) || demoPlans;

  return (
    <section className="space-y-6 animate-rise">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="card">
          <SectionHeader
            kicker="Finanzas"
            title="Pagos recientes"
            subtitle="Ultimos movimientos y estado."
            actions={[
              <button key="add" className="rounded-full bg-ember px-4 py-2 text-xs font-semibold text-white">Registrar pago</button>,
            ]}
          />
          <div className="mt-5 divide-y divide-mist">
            {payments.map((item) => (
              <div key={item.id || item.name} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div>
                  <p className="font-display text-base text-ink">{item.name || item.student_name}</p>
                  <p className="text-xs text-steel">{item.amount} · {item.method || "Tarjeta"}</p>
                </div>
                <StatusPill status={item.status || "Pendiente"} variant={mapStatus(item.status)} />
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <SectionHeader title="Mix de planes" subtitle="Distribucion de membresias activas." />
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
          {error ? (
            <p className="mt-4 text-xs text-ember">No se pudo conectar a la API. Mostrando demo.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
