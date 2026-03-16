import "dotenv/config";
import { pool } from "./src/models/db.js";
import { runAllJobs } from "./src/jobs/index.js";

const INTERVAL_MINUTES = Number(process.env.JOB_INTERVAL_MINUTES || 60);
const intervalMs = INTERVAL_MINUTES * 60 * 1000;

async function runOnce() {
  try {
    await runAllJobs();
  } catch (error) {
    console.error("Job run failed", error);
  }
}

async function start() {
  console.log(`Worker started. Interval: ${INTERVAL_MINUTES} minutes.`);
  await runOnce();
  setInterval(runOnce, intervalMs);
}

start();

process.on("SIGINT", async () => {
  await pool.end();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await pool.end();
  process.exit(0);
});
