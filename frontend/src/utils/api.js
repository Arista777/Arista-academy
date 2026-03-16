const FALLBACK_URL = "http://localhost:3000";

export function getApiBase() {
  if (typeof window === "undefined") return FALLBACK_URL;
  return localStorage.getItem("arista_api_base") || FALLBACK_URL;
}

async function request(path, options = {}) {
  const base = getApiBase();
  const url = `${base}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
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
  return api.get("/classes");
}

export async function fetchTechniques() {
  return api.get("/techniques");
}

export async function fetchProgress() {
  return api.get("/belt-progress");
}
