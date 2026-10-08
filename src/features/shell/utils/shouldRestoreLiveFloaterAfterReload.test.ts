import { describe, expect, it } from "vitest";

import { shouldRestoreLiveFloaterAfterReload } from "@/features/shell/utils/shouldRestoreLiveFloaterAfterReload";

describe("shouldRestoreLiveFloaterAfterReload (afae8216)", () => {
  it("restores a running or pending run when no floater is open", () => {
    for (const runStatus of ["running", "pending_approval"]) {
      expect(
        shouldRestoreLiveFloaterAfterReload({
          storedRunId: "run-1",
          runStatus,
          floaterOpen: false,
        }),
      ).toBe(true);
    }
  });

  it("skips when the floater is already open", () => {
    expect(
      shouldRestoreLiveFloaterAfterReload({
        storedRunId: "run-1",
        runStatus: "running",
        floaterOpen: true,
      }),
    ).toBe(false);
  });

  it("skips ended runs and missing ids", () => {
    expect(
      shouldRestoreLiveFloaterAfterReload({
        storedRunId: "run-1",
        runStatus: "completed",
        floaterOpen: false,
      }),
    ).toBe(false);
    expect(
      shouldRestoreLiveFloaterAfterReload({
        storedRunId: null,
        runStatus: "running",
        floaterOpen: false,
      }),
    ).toBe(false);
  });
});
