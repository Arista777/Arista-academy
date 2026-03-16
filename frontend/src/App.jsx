import React, { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Students from "./pages/Students.jsx";
import Classes from "./pages/Classes.jsx";
import Attendance from "./pages/Attendance.jsx";
import Payments from "./pages/Payments.jsx";
import Techniques from "./pages/Techniques.jsx";
import Progress from "./pages/Progress.jsx";

const pages = {
  dashboard: Dashboard,
  students: Students,
  classes: Classes,
  attendance: Attendance,
  payments: Payments,
  techniques: Techniques,
  progress: Progress,
};

const pageLabels = {
  dashboard: "Panel general",
  students: "Estudiantes",
  classes: "Clases",
  attendance: "Asistencias",
  payments: "Pagos",
  techniques: "Tecnicas",
  progress: "Progreso",
};

export default function App() {
  const [active, setActive] = useState("dashboard");
  const ActivePage = useMemo(() => pages[active], [active]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[280px_1fr]">
        <Sidebar active={active} onChange={setActive} />
        <main className="space-y-6">
          <Topbar activeLabel={pageLabels[active]} />
          <ActivePage />
          <div className="flex flex-col gap-2 text-xs text-steel md:flex-row md:items-center md:justify-between">
            <span>Arista Academy CRM · Vision 2026</span>
            <span>Ultima sincronizacion: hoy 08:42 AM</span>
          </div>
        </main>
      </div>
    </div>
  );
}
