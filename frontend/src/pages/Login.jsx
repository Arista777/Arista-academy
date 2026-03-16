import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin, apiRegister } from "../utils/api.js";
import { enableDemoMode, setAuth } from "../utils/auth.js";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = mode === "login"
        ? await apiLogin({ username, password })
        : await apiRegister({ username, password, role });

      setAuth(payload);
      navigate("/");
    } catch (err) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  const onDemo = () => {
    enableDemoMode();
    navigate("/");
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-12">
        <div className="grid w-full gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="card">
            <p className="text-xs uppercase tracking-[0.3em] text-ember">Arista Academy</p>
            <h1 className="mt-3 font-display text-3xl font-semibold">Bienvenido al CRM</h1>
            <p className="mt-3 text-sm text-steel">
              Inicia sesion para gestionar estudiantes, pagos, asistencia y progreso.
              Si es tu primera vez, crea el usuario admin.
            </p>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-mist bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-steel">Paso 1</p>
                <p className="mt-2 text-sm text-ink">Usa tu API base en la barra superior una vez entres.</p>
              </div>
              <div className="rounded-2xl border border-mist bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-steel">Paso 2</p>
                <p className="mt-2 text-sm text-ink">Crea usuarios para coaches y estudiantes.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex gap-2">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold ${mode === "login" ? "bg-ink text-white" : "border border-mist text-ink"}`}
              >
                Iniciar sesion
              </button>
              <button
                onClick={() => setMode("register")}
                className={`flex-1 rounded-full px-4 py-2 text-xs font-semibold ${mode === "register" ? "bg-ink text-white" : "border border-mist text-ink"}`}
              >
                Crear admin
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-steel">Usuario</label>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-mist bg-haze px-3 py-2 text-sm"
                  placeholder="admin"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-steel">Contrasena</label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-mist bg-haze px-3 py-2 text-sm"
                  placeholder="Minimo 6 caracteres"
                />
              </div>
              {mode === "register" ? (
                <div>
                  <label className="text-xs font-semibold text-steel">Rol</label>
                  <select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-mist bg-haze px-3 py-2 text-sm"
                  >
                    <option value="admin">Admin</option>
                    <option value="coach">Coach</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              ) : null}

              {error ? <p className="text-xs text-ember">{error}</p> : null}

              <button
                disabled={loading}
                className="w-full rounded-xl bg-ember px-4 py-2 text-sm font-semibold text-white"
              >
                {loading ? "Procesando..." : mode === "login" ? "Entrar" : "Crear usuario"}
              </button>
            </form>

            <div className="mt-6">
              <button
                onClick={onDemo}
                className="w-full rounded-xl border border-mist px-4 py-2 text-xs font-semibold text-ink"
              >
                Continuar en demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
