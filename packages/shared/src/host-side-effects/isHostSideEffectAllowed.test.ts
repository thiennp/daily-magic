import { describe, expect, it } from "vitest";

import {
  buildHostSideEffectRefusalMessage,
  isHostSideEffectAllowed,
} from "./isHostSideEffectAllowed";

describe("isHostSideEffectAllowed", () => {
  it("allows host side effects outside Vitest", () => {
    expect(isHostSideEffectAllowed({})).toBe(true);
    expect(isHostSideEffectAllowed({ VITEST: "" })).toBe(true);
  });

  it("refuses host side effects under Vitest by default", () => {
    expect(isHostSideEffectAllowed({ VITEST: "true" })).toBe(false);
    expect(
      isHostSideEffectAllowed({
        VITEST: "true",
        AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS: "0",
      }),
    ).toBe(false);
  });

  it("allows host side effects under Vitest with explicit opt-in", () => {
    expect(
      isHostSideEffectAllowed({
        VITEST: "true",
        AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS: "1",
      }),
    ).toBe(true);
  });

  it("defaults to process.env (this Vitest run refuses)", () => {
    expect(isHostSideEffectAllowed()).toBe(
      process.env.AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS === "1",
    );
  });

  it("names the subject and the override in the refusal message", () => {
    expect(buildHostSideEffectRefusalMessage("launchctl")).toBe(
      "Refusing launchctl host side effects under VITEST (set AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS=1 to override).",
    );
  });
});
