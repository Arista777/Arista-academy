import "dotenv/config";
import { runMigrations } from "./src/models/migrate.js";
import { pool } from "./src/models/db.js";

async function migrate() {
  try {
    await runMigrations();
  } finally {
    await pool.end();
  }
}

migrate().catch((error) => {
  console.error("Migration failed", error);
  process.exit(1);
});
