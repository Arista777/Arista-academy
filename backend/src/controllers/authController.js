import { login, register } from "../services/authService.js";

async function registerUser(req, res) {
  const username = String(req.body?.username || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  try {
    const result = await register({ username, password });
    res.status(201).json(result);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
}

async function loginUser(req, res) {
  const username = String(req.body?.username || "").trim().toLowerCase();
  const password = String(req.body?.password || "");

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const result = await login({ username, password });
    res.json(result);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
}

function me(req, res) {
  res.json({ user: req.user });
}

export { registerUser, loginUser, me };
