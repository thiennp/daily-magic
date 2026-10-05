import type {
  SetupProjectAction,
  SetupProjectState,
} from "../../public-api/setupProject.types";

export type TransitionResult =
  | { readonly ok: true; readonly state: SetupProjectState }
  | { readonly ok: false; readonly reason: string; readonly state: SetupProjectState };

/**
 * Pure state transitions. Declined is TERMINAL (no DefaultsApplied /
 * fragments) until clearDecline → GlobalTriggersWritten (invoked only after
 * a successful project resolve in runSetupProject).
 */
export const transitionSetupProject = (
  state: SetupProjectState,
  action: SetupProjectAction,
): TransitionResult => {
  if (action === "remove") {
    return { ok: true, state: "Connected" };
  }
  switch (state) {
    case "Unconnected":
      return action === "connect"
        ? { ok: true, state: "SigningIn" }
        : fail(state, action);
    case "SigningIn":
      return action === "signInComplete"
        ? { ok: true, state: "Connected" }
        : fail(state, action);
    case "Connected":
      return action === "writeGlobalTriggers"
        ? { ok: true, state: "GlobalTriggersWritten" }
        : fail(state, action);
    case "GlobalTriggersWritten":
      if (action === "decline") {
        return { ok: true, state: "Declined" };
      }
      if (action === "accept") {
        return { ok: true, state: "ProjectResolved" };
      }
      if (action === "writeGlobalTriggers") {
        return { ok: true, state: "GlobalTriggersWritten" };
      }
      return fail(state, action);
    case "Declined":
      return action === "clearDecline"
        ? { ok: true, state: "GlobalTriggersWritten" }
        : fail(state, action);
    case "ProjectResolved":
      return action === "applyDefaults"
        ? { ok: true, state: "DefaultsApplied" }
        : fail(state, action);
    case "DefaultsApplied":
      return action === "writeProjectFragments"
        ? { ok: true, state: "ProjectFragmentsWritten" }
        : fail(state, action);
    case "ProjectFragmentsWritten":
      return action === "verify"
        ? { ok: true, state: "Verified" }
        : fail(state, action);
    case "Verified":
      return action === "accept" || action === "writeProjectFragments"
        ? { ok: true, state }
        : fail(state, action);
    default:
      return fail(state, action);
  }
};

const fail = (
  state: SetupProjectState,
  action: SetupProjectAction,
): TransitionResult => ({
  ok: false,
  reason: `Illegal transition ${state} + ${action}`,
  state,
});

/** Declined forbids DefaultsApplied / ProjectFragmentsWritten. */
export const isDeclinedTerminal = (state: SetupProjectState): boolean =>
  state === "Declined";
