import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Students from "./pages/Students.jsx";
import Classes from "./pages/Classes.jsx";
import Attendance from "./pages/Attendance.jsx";
import Payments from "./pages/Payments.jsx";
import Techniques from "./pages/Techniques.jsx";
import Progress from "./pages/Progress.jsx";
import Login from "./pages/Login.jsx";
import { getToken, isDemoMode } from "./utils/auth.js";

const labels = {
  "/": "Panel general",
  "/students": "Estudiantes",
  "/classes": "Clases",
  "/attendance": "Asistencias",
  "/payments": "Pagos",
  "/techniques": "Tecnicas",
  "/progress": "Progreso",
};

function RequireAuth({ children }) {
  const token = getToken();
  const demo = isDemoMode();
  if (token || demo) return children;
  return <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();
  const activeLabel = labels[location.pathname] || "Panel general";
  const isLogin = location.pathname === "/login";

  if (isLogin) {
    return <Login />;
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <Topbar activeLabel={activeLabel} />
          <RequireAuth>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/techniques" element={<Techniques />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </RequireAuth>
          <div className="flex flex-col gap-2 text-xs text-steel md:flex-row md:items-center md:justify-between">
            <span>Arista Academy CRM · Vision 2026</span>
            <span>Ultima sincronizacion: hoy 08:42 AM</span>
          </div>
        </main>
      </div>
    </div>
  );
}
