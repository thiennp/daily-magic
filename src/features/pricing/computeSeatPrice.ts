import { PRICING_CONFIG } from "@/features/pricing/pricingConfig.constant";

export type PaidPlanId = "pro" | "team";

export const MAX_ESTIMATOR_SEATS = 100;

/** Seats a plan allows: at least the plan minimum, at most the estimator cap. */
export const clampSeats = (planId: PaidPlanId, seats: number): number => {
  const whole = Number.isFinite(seats) ? Math.floor(seats) : 0;
  return Math.min(
    MAX_ESTIMATOR_SEATS,
    Math.max(PRICING_CONFIG[planId].minSeats, whole),
  );
};

/** Monthly seat price for a paid plan; seats are clamped to the plan's range. */
export const computeSeatPrice = (
  planId: PaidPlanId,
  seats: number,
): {
  readonly seats: number;
  readonly perSeat: number;
  readonly monthly: number;
} => {
  const clamped = clampSeats(planId, seats);
  const perSeat = PRICING_CONFIG[planId].pricePerSeatMonth;
  return { seats: clamped, perSeat, monthly: clamped * perSeat };
};
