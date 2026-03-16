const TOKEN_KEY = "arista_token";
const USER_KEY = "arista_user";
const DEMO_KEY = "arista_demo";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setAuth({ token, user }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(DEMO_KEY, "false");
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function enableDemoMode() {
  if (typeof window === "undefined") return;
  localStorage.setItem(DEMO_KEY, "true");
}

export function isDemoMode() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(DEMO_KEY) === "true";
}
