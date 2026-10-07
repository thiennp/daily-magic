/** Locked entitlements + internal Free/trial infra budget (ops currency). */
export const BILLING_PLANS = ["trial", "pro", "team", "admin_free"] as const;

export const MAX_COMPUTERS_ALL_PLANS = 2;

export const MAX_ASSISTANT_CONNECTS = {
  trial: 3,
  pro: 3,
  team: 10,
  admin_free: 3,
} as const;

/** Soft Free/trial infra loss guard (Railway + Neon + related). Admin only. */
export const FREE_TRIAL_INFRA_BUDGET_EUR = 200;

export const TRIAL_LENGTH_DAYS = 30;
