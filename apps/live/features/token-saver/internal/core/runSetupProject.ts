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

type ResolveProjectFn = (cwd: string) => {
  readonly projectId: string;
  readonly kind: "created" | "attached";
};

const PROJECT_ID_REQUIRED = "projectId required on accept";

/**
 * Injected resolve, else the explicit projectId. A throwing resolver or a
 * missing/blank projectId is `ok:false` + reason, never a throw.
 */
const resolveProjectSafely = (input: {
  readonly cwd: string;
  readonly projectId?: string;
  readonly resolveProject?: ResolveProjectFn;
}):
  | { readonly ok: true; readonly projectId: string }
  | { readonly ok: false; readonly reason: string } => {
  let candidate: string | undefined = input.projectId;
  if (input.resolveProject !== undefined) {
    try {
      candidate = input.resolveProject(input.cwd).projectId;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return { ok: false, reason: `project resolve failed: ${message}` };
    }
  }
  const projectId = candidate?.trim() ?? "";
  return projectId.length > 0
    ? { ok: true, projectId }
    : { ok: false, reason: PROJECT_ID_REQUIRED };
};

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
  readonly resolveProject?: ResolveProjectFn;
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
  const resolved = resolveProjectSafely(input);
  if (!resolved.ok) {
    return { ok: false, state, reason: resolved.reason };
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
