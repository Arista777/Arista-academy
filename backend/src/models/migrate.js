import { readdir, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.resolve(__dirname, "../../migrations");

async function ensureMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function listAppliedMigrations() {
  const result = await pool.query("SELECT filename FROM schema_migrations ORDER BY filename");
  return new Set(result.rows.map((row) => row.filename));
}

async function runMigrations() {
  await ensureMigrationsTable();

  let files = await readdir(MIGRATIONS_DIR);
  files = files.filter((file) => file.endsWith(".sql")).sort();

  const applied = await listAppliedMigrations();

  for (const file of files) {
    if (applied.has(file)) {
      continue;
    }

    const sql = await readFile(path.join(MIGRATIONS_DIR, file), "utf-8");

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query(
        "INSERT INTO schema_migrations (filename) VALUES ($1)",
        [file]
      );
      await client.query("COMMIT");
      console.log(`Applied migration: ${file}`);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

export { runMigrations };
