import { describe, expect, it } from "vitest";

import {
  MAX_ESTIMATOR_SEATS,
  clampSeats,
  computeSeatPrice,
} from "@/features/pricing/computeSeatPrice";
import { PRICING_CONFIG } from "@/features/pricing/pricingConfig.constant";

describe("computeSeatPrice", () => {
  it("multiplies seats by the configured per-seat price", () => {
    const pro = computeSeatPrice("pro", 4);
    expect(pro).toEqual({
      seats: 4,
      perSeat: PRICING_CONFIG.pro.pricePerSeatMonth,
      monthly: 4 * PRICING_CONFIG.pro.pricePerSeatMonth,
    });
  });

  it("lifts Team to its minimum seats and Pro to one", () => {
    expect(computeSeatPrice("team", 1).seats).toBe(
      PRICING_CONFIG.team.minSeats,
    );
    expect(computeSeatPrice("pro", 0).seats).toBe(1);
  });

  it("caps seats and survives junk input", () => {
    expect(clampSeats("pro", 10_000)).toBe(MAX_ESTIMATOR_SEATS);
    expect(clampSeats("team", Number.NaN)).toBe(PRICING_CONFIG.team.minSeats);
    expect(clampSeats("pro", 2.9)).toBe(2);
  });
});
