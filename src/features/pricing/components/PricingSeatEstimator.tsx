"use client";

import { useState } from "react";

import {
  MAX_ESTIMATOR_SEATS,
  clampSeats,
  computeSeatPrice,
  type PaidPlanId,
} from "@/features/pricing/computeSeatPrice";
import { formatUsd } from "@/features/pricing/formatUsd";
import { PRICING_CONFIG } from "@/features/pricing/pricingConfig.constant";

const PLANS: readonly PaidPlanId[] = ["pro", "team"];

const STEP_BUTTON_CLASS =
  "grid size-9 place-items-center rounded-lg border border-awc-border-strong bg-awc-surface text-lg font-semibold text-awc-fg disabled:opacity-40";

/** What the seats cost per month. Prices come from PRICING_CONFIG only; nothing is charged here. */
export default function PricingSeatEstimator() {
  const [planId, setPlanId] = useState<PaidPlanId>("team");
  const [seats, setSeats] = useState<number>(PRICING_CONFIG.team.minSeats);
  const price = computeSeatPrice(planId, seats);

  const choosePlan = (next: PaidPlanId): void => {
    setPlanId(next);
    setSeats((current) => clampSeats(next, current));
  };

  return (
    <section
      aria-labelledby="pricing-estimator-h"
      className="mt-10 rounded-2xl border border-awc-border bg-awc-surface p-5"
    >
      <h2 id="pricing-estimator-h" className="text-lg font-bold text-awc-fg">
        What would it cost?
      </h2>
      <p className="mt-1 text-sm text-awc-fg-muted">
        Pick a plan and how many people. Your first month is free; cancel
        anytime.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div
          role="group"
          aria-label="Plan"
          className="inline-flex gap-1 rounded-xl bg-awc-tile p-1"
        >
          {PLANS.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={planId === id}
              onClick={() => choosePlan(id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${planId === id ? "bg-awc-surface text-awc-fg shadow-sm" : "text-awc-fg-muted"}`}
            >
              {PRICING_CONFIG[id].name}
            </button>
          ))}
        </div>
        <div
          role="group"
          aria-label="Seats"
          className="inline-flex items-center gap-2"
        >
          <button
            type="button"
            aria-label="Fewer seats"
            className={STEP_BUTTON_CLASS}
            disabled={price.seats <= PRICING_CONFIG[planId].minSeats}
            onClick={() => setSeats(clampSeats(planId, price.seats - 1))}
          >
            −
          </button>
          <output
            aria-live="polite"
            className="min-w-16 text-center text-sm font-semibold text-awc-fg"
          >
            {price.seats} {price.seats === 1 ? "seat" : "seats"}
          </output>
          <button
            type="button"
            aria-label="More seats"
            className={STEP_BUTTON_CLASS}
            disabled={price.seats >= MAX_ESTIMATOR_SEATS}
            onClick={() => setSeats(clampSeats(planId, price.seats + 1))}
          >
            +
          </button>
        </div>
      </div>
      <p className="mt-4 text-sm text-awc-fg-muted">
        {price.seats} × {formatUsd(price.perSeat)} ={" "}
        <b className="text-2xl font-bold text-awc-fg">
          {formatUsd(price.monthly)}
        </b>{" "}
        per month, in USD.
        {planId === "team"
          ? ` Team starts at ${PRICING_CONFIG.team.minSeats} seats.`
          : ""}
      </p>
    </section>
  );
}
