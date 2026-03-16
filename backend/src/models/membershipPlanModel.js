import { pool } from "./db.js";

async function listMembershipPlans() {
  const result = await pool.query(
    "SELECT * FROM membership_plans WHERE is_active = true ORDER BY name"
  );
  return result.rows;
}

export { listMembershipPlans };
