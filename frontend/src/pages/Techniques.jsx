import React from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import useApi from "../hooks/useApi.js";
import { fetchTechniques } from "../utils/api.js";
import { demoTechniques } from "../utils/demoData.js";

export default function Techniques() {
  const { data, error } = useApi(fetchTechniques, []);
  const techniques = (data && data.techniques) || data || demoTechniques;

  return (
    <section className="space-y-6">
      <div className="card">
        <SectionHeader
          kicker="Knowledge"
          title="Base de conocimiento"
          subtitle="Crea relaciones entre tecnicas y recursos."
          actions={[
            <button key="resource" className="rounded-full border border-mist px-4 py-2 text-xs font-semibold">Agregar recurso</button>,
            <button key="new" className="rounded-full bg-ember px-4 py-2 text-xs font-semibold text-white">Nueva tecnica</button>,
          ]}
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {techniques.map((item) => (
            <div key={item.id || item.name} className="rounded-2xl border border-mist bg-white/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-steel">{item.category}</p>
              <p className="mt-2 font-display text-lg text-ink">{item.name}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(item.related || []).map((rel) => (
                  <span key={rel} className="rounded-full bg-haze px-3 py-1 text-xs font-semibold text-ink">
                    {rel}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-steel">{item.resources}</p>
              <button className="mt-4 text-xs font-semibold text-ember">Ver mapa</button>
            </div>
          ))}
        </div>
        {error ? (
          <p className="mt-4 text-xs text-ember">No se pudo conectar a la API. Mostrando demo.</p>
        ) : null}
      </div>
    </section>
  );
}
