import { describe, expect, it } from "vitest";

import { resolveCostControlStatus } from "@/lib/billing/resolveCostControlStatus";

describe("resolveCostControlStatus", () => {
  it("keeps trialGate open under and near the €200 budget", () => {
    expect(resolveCostControlStatus({ spendEur: 0 }).trialGate).toBe("open");
    expect(resolveCostControlStatus({ spendEur: 160 }).status).toBe(
      "near_limit",
    );
    expect(resolveCostControlStatus({ spendEur: 160 }).trialGate).toBe("open");
  });

  it("closes trialGate at or over budget", () => {
    const over = resolveCostControlStatus({ spendEur: 200 });
    expect(over.status).toBe("over_budget");
    expect(over.trialGate).toBe("closed");
  });
});
