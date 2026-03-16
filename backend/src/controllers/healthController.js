import { pool } from "../models/db.js";

async function healthCheck(req, res) {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "API & DB connected" });
  } catch (error) {
    res.status(500).json({ error: "DB error" });
  }
}

export { healthCheck };
