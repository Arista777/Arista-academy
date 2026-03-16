import pkg from "pg";
import { DB_CONFIG } from "../utils/config.js";

const { Pool } = pkg;
const pool = new Pool(DB_CONFIG);

async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      belt TEXT NOT NULL,
      age INTEGER NOT NULL,
      monthly_fee NUMERIC(12, 2) NOT NULL DEFAULT 0,
      payment_date DATE,
      status TEXT NOT NULL DEFAULT 'pendiente',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS expenses (
      id SERIAL PRIMARY KEY,
      description TEXT NOT NULL,
      amount NUMERIC(12, 2) NOT NULL,
      month TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS monthly_stats (
      month TEXT PRIMARY KEY,
      active_students INTEGER NOT NULL,
      total_income NUMERIC(12, 2) NOT NULL,
      total_expenses NUMERIC(12, 2) NOT NULL,
      net_profit NUMERIC(12, 2) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export { pool, initDatabase };
