import type { BillingPlanId } from "@/features/billing/billingPlan.types";

const PLAN_LABELS: Record<BillingPlanId, string> = {
  trial: "Trial",
  pro: "Pro",
  team: "Team",
  admin_free: "Permanent Free (admin)",
};

export default function formatBillingPlanLabel(plan: BillingPlanId): string {
  return PLAN_LABELS[plan];
}
