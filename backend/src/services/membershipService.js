import { listMembershipPlans } from "../models/membershipPlanModel.js";

async function getMembershipPlans() {
  return listMembershipPlans();
}

export { getMembershipPlans };
