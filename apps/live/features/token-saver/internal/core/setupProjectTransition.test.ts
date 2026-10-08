import { describe, expect, it } from "vitest";

import {
  isDeclinedTerminal,
  transitionSetupProject,
} from "./setupProjectTransition";

describe("setupProjectTransition", () => {
  it("walks install → accept → fragments → verified", () => {
    let state = transitionSetupProject("Unconnected", "connect").state;
    state = transitionSetupProject(state, "signInComplete").state;
    state = transitionSetupProject(state, "writeGlobalTriggers").state;
    expect(state).toBe("GlobalTriggersWritten");
    state = transitionSetupProject(state, "accept").state;
    state = transitionSetupProject(state, "applyDefaults").state;
    state = transitionSetupProject(state, "writeProjectFragments").state;
    state = transitionSetupProject(state, "verify").state;
    expect(state).toBe("Verified");
  });

  it("Declined is terminal: no defaults or fragments", () => {
    const declined = transitionSetupProject("GlobalTriggersWritten", "decline");
    expect(declined).toEqual({ ok: true, state: "Declined" });
    expect(isDeclinedTerminal("Declined")).toBe(true);
    expect(transitionSetupProject("Declined", "applyDefaults").ok).toBe(false);
    expect(transitionSetupProject("Declined", "writeProjectFragments").ok).toBe(
      false,
    );
    expect(transitionSetupProject("Declined", "accept").ok).toBe(false);
    expect(transitionSetupProject("Declined", "clearDecline")).toEqual({
      ok: true,
      state: "GlobalTriggersWritten",
    });
  });

  it("writeGlobalTriggers is idempotent at GlobalTriggersWritten", () => {
    expect(
      transitionSetupProject("GlobalTriggersWritten", "writeGlobalTriggers"),
    ).toEqual({ ok: true, state: "GlobalTriggersWritten" });
  });
});
