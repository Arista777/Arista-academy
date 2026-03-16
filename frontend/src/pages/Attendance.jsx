import React from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import StatusPill from "../components/StatusPill.jsx";
import useApi from "../hooks/useApi.js";
import { fetchAttendance } from "../utils/api.js";
import { demoAttendance, demoStreaks } from "../utils/demoData.js";

export default function Attendance() {
  const { data, error } = useApi(fetchAttendance, []);
  const sessions = (data && data.sessions) || data || demoAttendance;
  const streaks = (data && data.streaks) || demoStreaks;

  return (
    <section className="space-y-6 animate-rise">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="card">
          <SectionHeader
            kicker="Asistencias"
            title="Check-ins recientes"
            subtitle="Control por clase y ocupacion."
            actions={[
              <button key="checkin" className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white">Nuevo check-in</button>,
            ]}
          />
          <div className="mt-5 space-y-3">
            {sessions.map((session) => (
              <div key={session.id || session.className} className="flex items-center justify-between rounded-2xl border border-mist bg-white/70 p-4">
                <div>
                  <p className="font-display text-base text-ink">{session.className}</p>
                  <p className="text-xs text-steel">{session.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-ember">{session.attendees} asistentes</p>
                  <StatusPill status={session.occupancy || "OK"} variant="neutral" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <SectionHeader title="Rachas activas" subtitle="Alumnos con mayor frecuencia." />
          <div className="mt-6 space-y-4">
            {streaks.map((item) => (
              <div key={item.id || item.name} className="flex items-center justify-between rounded-xl border border-mist px-4 py-3">
                <span className="text-sm font-semibold text-ink">{item.name}</span>
                <span className="rounded-full bg-jade/10 px-3 py-1 text-xs font-semibold text-jade">
                  {item.days} dias
                </span>
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
