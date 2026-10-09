import { describe, expect, it } from "vitest";

import { assertTrialGateOpen } from "@/lib/billing/assertTrialGateOpen";

describe("assertTrialGateOpen", () => {
  it("always allows signup (gate disabled)", async () => {
    await expect(assertTrialGateOpen()).resolves.toEqual({ ok: true });
  });
});
