import { pool } from "./db.js";

async function findUserByUsername(username) {
  const result = await pool.query(
    "SELECT id, username, password_hash, role FROM users WHERE username = $1",
    [username]
  );

  return result.rows[0] || null;
}

async function findUserByUsernameForRegistration(username) {
  const result = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
  return result.rows[0] || null;
}

async function createUser(username, passwordHash, role = "admin") {
  const result = await pool.query(
    `INSERT INTO users (username, password_hash, role)
     VALUES ($1, $2, $3)
     RETURNING id, username, role, created_at`,
    [username, passwordHash, role]
  );

  return result.rows[0];
}

export { findUserByUsername, findUserByUsernameForRegistration, createUser };
