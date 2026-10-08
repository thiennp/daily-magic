/**
 * Single source of truth for AgentWitch seat pricing (provisional).
 * Change numbers here only — do not scatter $29 / $49 literals.
 */
export const PRICING_CONFIG = {
  currency: "USD",
  trial: {
    id: "trial",
    name: "Trial",
    pricePerSeatMonth: 0,
    minSeats: 1,
    assistantsConnect: 3,
    maxComputers: 5,
  },
  pro: {
    id: "pro",
    name: "Pro",
    pricePerSeatMonth: 29,
    minSeats: 1,
    assistantsConnect: 3,
    maxComputers: 5,
  },
  team: {
    id: "team",
    name: "Team",
    pricePerSeatMonth: 49,
    minSeats: 3,
    assistantsConnect: 10,
    maxComputers: 5,
  },
  /** Optional add-on credit pack sizes from design HTML (not part of seats). */
  aiCreditPacksUsd: [10, 20, 50] as const,
  /** Optional cloud storage from design HTML (not during trial). */
  cloudStorageUsdPerGbMonth: 0.9,
} as const;

export type PricingPlanId = keyof Pick<
  typeof PRICING_CONFIG,
  "trial" | "pro" | "team"
>;
