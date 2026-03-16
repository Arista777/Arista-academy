import { getMembershipPlans } from "../services/membershipService.js";

async function listMembershipPlans(req, res) {
  try {
    const plans = await getMembershipPlans();
    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch membership plans" });
  }
}

export { listMembershipPlans };
