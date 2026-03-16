import "dotenv/config";
import app from "./src/app.js";
import { pool } from "./src/models/db.js";
import { runMigrations } from "./src/models/migrate.js";
import { PORT } from "./src/utils/config.js";

async function start() {
  try {
    await runMigrations();
    await pool.query("SELECT 1");
    app.listen(PORT, () => {
      console.log(`API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize database", error);
    process.exit(1);
  }
}

start();
