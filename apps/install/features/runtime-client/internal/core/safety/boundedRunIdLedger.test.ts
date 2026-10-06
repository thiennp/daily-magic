import { describe, expect, it } from "vitest";

import { createBoundedRunIdLedger, rememberRunId } from "./boundedRunIdLedger";

describe("boundedRunIdLedger", () => {
  it("remembers ids once, newest last, within capacity", () => {
    expect(rememberRunId(["a", "b"], "a", 5)).toEqual(["b", "a"]);
    expect(rememberRunId(["a", "b", "c"], "d", 3)).toEqual(["b", "c", "d"]);
  });

  it("tracks accepted runs and forgets the oldest past capacity", () => {
    const ledger = createBoundedRunIdLedger(2);
    ledger.add("run-1");
    ledger.add("run-2");
    expect(ledger.has("run-1")).toBe(true);
    ledger.add("run-3");
    expect(ledger.has("run-1")).toBe(false);
    expect(ledger.has("run-3")).toBe(true);
  });
});
