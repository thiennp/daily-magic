import { describe, expect, it } from "vitest";

import { aggregatePreflightStatus } from "./aggregatePreflightStatus";

describe("aggregatePreflightStatus", () => {
  it("prefers block over errored, warn, and pass", () => {
    expect(
      aggregatePreflightStatus([
        { status: "pass" },
        { status: "warn" },
        { status: "errored" },
        { status: "block" },
      ]),
    ).toBe("block");
  });

  it("prefers errored over warn and pass", () => {
    expect(
      aggregatePreflightStatus([
        { status: "pass" },
        { status: "warn" },
        { status: "errored" },
      ]),
    ).toBe("errored");
  });

  it("returns warn when any warn and no block/errored", () => {
    expect(
      aggregatePreflightStatus([{ status: "pass" }, { status: "warn" }]),
    ).toBe("warn");
  });

  it("returns pass when empty or only pass/skipped", () => {
    expect(aggregatePreflightStatus([])).toBe("pass");
    expect(
      aggregatePreflightStatus([{ status: "pass" }, { status: "skipped" }]),
    ).toBe("pass");
  });
});
