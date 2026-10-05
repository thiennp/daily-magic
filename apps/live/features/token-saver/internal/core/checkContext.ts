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
): string | null => {
  const explicit = input.projectId?.trim();
  if (explicit !== undefined && explicit.length > 0) {
    return explicit;
  }
  const cwd = input.cwd?.trim();
  if (cwd === undefined || cwd.length === 0 || deps.resolveProjectId === undefined) {
    return null;
  }
  return deps.resolveProjectId(cwd);
};

/**
 * Keyword check_context: hit|miss|none. Never throws to the caller.
 * Declined cwd → none without promptCreate (terminal).
 */
export const checkContext = (
  deps: CheckContextDeps,
  input: CheckContextInput,
): CheckContextResult => {
  try {
    const projectId = resolveProjectId(deps, input);
    if (projectId === null || deps.registry === null) {
      const cwd = input.cwd?.trim();
      const declined =
        cwd !== undefined &&
        cwd.length > 0 &&
        deps.isDeclined?.(cwd) === true;
      return declined
        ? { status: "none" }
        : { status: "none", promptCreate: cwd !== undefined && cwd.length > 0 };
    }

    const matched = deps.registry.matchPitfalls({
      projectId,
      text: input.message ?? "",
    });
    if (matched.length === 0) {
      return { status: "miss", projectId };
    }

    for (const pitfall of matched) {
      deps.registry.recordHit({ projectId, id: pitfall.id });
    }
    return {
      status: "hit",
      projectId,
      pitfalls: toPitfallBotLines(matched),
    };
  } catch (error) {
    deps.logError?.(error);
    return { status: "none" };
  }
};
