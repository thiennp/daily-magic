import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type { SetupProjectState } from "../../public-api/setupProject.types";
import { applyDefaultsFlags } from "./applyDefaultsFlags";
import type { CliFs, CliIo } from "./cliFs.types";
import { createNodeCliFs, createNodeCliIo } from "./createNodeCliFs";
import {
  clearProjectDecline,
  declineProjectForCwd,
  isDeclinedCwd,
} from "./declinedProjectsStore";
import {
  isDeclinedTerminal,
  transitionSetupProject,
} from "./setupProjectTransition";
import { writeGlobalTriggers } from "./writeGlobalTriggers";
import { writeProjectFragments } from "./writeProjectFragments";

export interface SetupProjectFlowResult {
  readonly state: SetupProjectState;
  readonly ok: boolean;
  readonly reason?: string;
  readonly projectId?: string;
}

/**
 * Explicit-state setup_project for one cwd. Cloud create/attach is injected
 * (NRG owns AWC). Declined stays Declined until resolve succeeds, then
 * clearDecline → GlobalTriggersWritten; only then defaults/fragments.
 */
export const runSetupProject = (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly cwd: string;
  readonly accept: boolean;
  readonly projectId?: string;
  readonly resolveProject?: (cwd: string) => {
    readonly projectId: string;
    readonly kind: "created" | "attached";
  };
  readonly fs?: CliFs;
  readonly io?: CliIo;
  readonly fromState?: SetupProjectState;
}): SetupProjectFlowResult => {
  const fs = input.fs ?? createNodeCliFs();
  const io = input.io ?? createNodeCliIo();
  let state: SetupProjectState = input.fromState ?? "GlobalTriggersWritten";

  if (!input.accept) {
    const dec = transitionSetupProject(state, "decline");
    if (!dec.ok) {
      return { ok: false, state: dec.state, reason: dec.reason };
    }
    declineProjectForCwd({ layout: input.layout, cwd: input.cwd, fs });
    return { ok: true, state: "Declined" };
  }

  const wasDeclined =
    isDeclinedTerminal(state) ||
    isDeclinedCwd({ layout: input.layout, cwd: input.cwd, fs });
  if (wasDeclined) {
    state = "Declined";
  }

  // Resolve/create FIRST; decline file and Declined state stay until this succeeds.
  const resolved =
    input.resolveProject?.(input.cwd) ??
    (input.projectId !== undefined
      ? { projectId: input.projectId, kind: "attached" as const }
      : null);
  if (resolved === null) {
    return { ok: false, state, reason: "projectId required on accept" };
  }

  if (wasDeclined) {
    const cleared = transitionSetupProject(state, "clearDecline");
    if (!cleared.ok) {
      return { ok: false, state: cleared.state, reason: cleared.reason };
    }
    clearProjectDecline({ layout: input.layout, cwd: input.cwd, fs });
    state = cleared.state;
  }

  // Ensure globals exist (idempotent; install path also calls this).
  writeGlobalTriggers({ io });
  state = transitionSetupProject(state, "writeGlobalTriggers").ok
    ? "GlobalTriggersWritten"
    : state;

  const toResolved = transitionSetupProject(state, "accept");
  if (!toResolved.ok) {
    return { ok: false, state: toResolved.state, reason: toResolved.reason };
  }
  state = toResolved.state;
  const toDefaults = transitionSetupProject(state, "applyDefaults");
  if (!toDefaults.ok) {
    return { ok: false, state: toDefaults.state, reason: toDefaults.reason };
  }
  applyDefaultsFlags({ fs, projectRoot: input.cwd });
  state = toDefaults.state;
  const toFrags = transitionSetupProject(state, "writeProjectFragments");
  if (!toFrags.ok) {
    return { ok: false, state: toFrags.state, reason: toFrags.reason };
  }
  writeProjectFragments({
    fs,
    projectRoot: input.cwd,
    projectId: resolved.projectId,
  });
  return { ok: true, state: toFrags.state, projectId: resolved.projectId };
};
