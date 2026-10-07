import type { CostControlStatus } from "@/features/billing/billingPlan.types";

const STATUS_LABELS: Record<CostControlStatus, string> = {
  under_budget: "Under budget",
  near_limit: "Near limit",
  over_budget: "Over budget",
};

export default function formatCostControlStatus(
  status: CostControlStatus,
): string {
  return STATUS_LABELS[status];
}
