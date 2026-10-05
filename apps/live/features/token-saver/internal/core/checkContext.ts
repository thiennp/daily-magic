import { formatCheckContextTip } from "@agent-witch/shared/token-saver";

import type {
  CheckContextInput,
  CheckContextResult,
  Pitfall,
} from "../../public-api/types";
import { toPitfallBotLines } from "./formatPitfallsForBot";

export interface CheckContextRegistry {
  readonly matchPitfalls: (input: {
    readonly projectId: string;
    readonly text: string;
  }) => readonly Pitfall[];
  readonly recordHit: (input: {
    readonly projectId: string;
    readonly id: string;
  }) => unknown;
}

export interface CheckContextDeps {
  readonly registry: CheckContextRegistry | null;
  readonly resolveProjectId?: (cwd: string) => string | null;
  readonly isDeclined?: (cwd: string) => boolean;
  readonly logError?: (error: unknown) => void;
}

const resolveProjectId = (
  deps: CheckContextDeps,
  input: CheckContextInput,
  cwd: string | null,
): string | null => {
  const explicit = input.projectId?.trim();
  if (explicit !== undefined && explicit.length > 0) {
    return explicit;
  }
  if (cwd === null || deps.resolveProjectId === undefined) {
    return null;
  }
  return deps.resolveProjectId(cwd);
};

/** Hit counters are telemetry: a failed write (e.g. SQLITE_BUSY) never drops the hit. */
const recordHitsBestEffort = (
  deps: CheckContextDeps,
  registry: CheckContextRegistry,
  projectId: string,
  matched: readonly Pitfall[],
): void => {
  for (const pitfall of matched) {
    try {
      registry.recordHit({ projectId, id: pitfall.id });
    } catch (error) {
      deps.logError?.(error);
    }
  }
};

/**
 * Keyword check_context: hit|miss|none. Never throws to the caller.
 * A hit carries the shared ≤~120-token `tip` (`formatCheckContextTip`).
 * Declined cwd → none without promptCreate (terminal), checked before any
 * project resolution or pitfall lookup.
 */
export const checkContext = (
  deps: CheckContextDeps,
  input: CheckContextInput,
): CheckContextResult => {
  try {
    const trimmedCwd = input.cwd?.trim() ?? "";
    const cwd = trimmedCwd.length > 0 ? trimmedCwd : null;
    if (cwd !== null && deps.isDeclined?.(cwd) === true) {
      return { status: "none" };
    }

    const projectId = resolveProjectId(deps, input, cwd);
    if (projectId === null || deps.registry === null) {
      return { status: "none", promptCreate: cwd !== null };
    }

    const matched = deps.registry.matchPitfalls({
      projectId,
      text: input.message ?? "",
    });
    if (matched.length === 0) {
      return { status: "miss", projectId };
    }

    recordHitsBestEffort(deps, deps.registry, projectId, matched);
    const pitfalls = toPitfallBotLines(matched);
    return {
      status: "hit",
      projectId,
      pitfalls,
      tip: formatCheckContextTip(pitfalls),
    };
  } catch (error) {
    deps.logError?.(error);
    return { status: "none" };
  }
};
