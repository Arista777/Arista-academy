import { getToken } from "./auth.js";

const FALLBACK_URL = "http://localhost:3000";

export function getApiBase() {
  if (typeof window === "undefined") return FALLBACK_URL;
  return localStorage.getItem("arista_api_base") || FALLBACK_URL;
}

export function setApiBase(value) {
  if (typeof window === "undefined") return;
  if (value && value.trim()) {
    localStorage.setItem("arista_api_base", value.trim());
  } else {
    localStorage.removeItem("arista_api_base");
  }
}

function normalizeBase(base) {
  if (base.endsWith("/api/v1")) return base;
  if (base.endsWith("/")) return `${base}api/v1`;
  return `${base}/api/v1`;
}

async function request(path, options = {}) {
  const base = normalizeBase(getApiBase());
  const url = `${base}${path}`;
  const token = getToken();
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }

  return response.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
};

export async function apiLogin(body) {
  return api.post("/auth/login", body);
}

export async function apiRegister(body) {
  return api.post("/auth/register", body);
}

export async function apiMe() {
  return api.get("/auth/me");
}

export async function fetchDashboard() {
  return api.get("/dashboard/summary");
}

export async function fetchStudents() {
  return api.get("/students");
}

export async function fetchPayments() {
  return api.get("/payments");
}

export async function fetchAttendance() {
  return api.get("/attendance/recent");
}

export async function fetchClasses() {
  return api.get("/classes/summary");
}

export async function fetchTechniques() {
  return api.get("/techniques");
}

export async function fetchProgress() {
  return api.get("/belt-progress");
}
