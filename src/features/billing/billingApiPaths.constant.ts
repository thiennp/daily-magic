/** Contract paths owned by NRG AgentWitch — UI calls these; do not invent routes. */
export const BILLING_API_PATHS = {
  entitlements: "/api/billing/entitlements",
  plan: "/api/billing/plan",
  checkout: "/api/billing/checkout",
  portal: "/api/billing/portal",
  adminSetFree: "/api/billing/admin/set-free",
  adminSetPlan: "/api/billing/admin/set-plan",
  adminCostControl: "/api/billing/admin/cost-control",
} as const;
