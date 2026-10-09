import { describe, expect, it } from "vitest";

import { resolveCostControlStatus } from "@/lib/billing/resolveCostControlStatus";

describe("resolveCostControlStatus", () => {
  it("keeps trialGate open under and near the €500 budget", () => {
    expect(resolveCostControlStatus({ spendEur: 0 }).trialGate).toBe("open");
    expect(resolveCostControlStatus({ spendEur: 400 }).status).toBe(
      "near_limit",
    );
    expect(resolveCostControlStatus({ spendEur: 400 }).trialGate).toBe("open");
  });

  it("keeps trialGate open over budget while the gate is disabled", () => {
    const over = resolveCostControlStatus({ spendEur: 500 });
    expect(over.status).toBe("over_budget");
    expect(over.trialGate).toBe("open");
  });
});
