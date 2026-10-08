import { getSkillRow } from "./skillIndexDb";
import type { SkillIndexDb } from "./skillIndex.types";
import { insertSkillCall, markFindChosen } from "./skillCallLog";
import { isSafeSkillPathId } from "./skillMirror";

export const SKILL_CALL_TIMEOUT_MS = 30_000;

export type GateRequest = {
  readonly db: SkillIndexDb;
  readonly projectId: string;
  readonly skillId: string;
  readonly tool: string;
  readonly chosenBy: "agent" | "bot" | "owner";
  readonly runId: string | null;
  readonly timeoutMs?: number;
  /** The load / run step; only called when every check passes. */
  readonly execute: () => Promise<string> | string;
};

export type GateResult =
  | { readonly ok: true; readonly output: string }
  | { readonly ok: false; readonly error: string };

/** A check returns a refusal reason, or null to allow. */
type GateCheck = (request: GateRequest) => string | null;

/**
 * Phase 2 checks. Phase 3 appends here: script permission approval, project
 * folder confinement of script writes, network policy.
 */
export const GATE_CHECKS: readonly GateCheck[] = [
  (r) => (isSafeSkillPathId(r.skillId) ? null : "invalid_skill_id"),
  (r) =>
    getSkillRow(r.db, r.projectId, r.skillId) === null
      ? "skill_not_installed"
      : null,
];

const withTimeout = async (
  work: Promise<string> | string,
  ms: number,
): Promise<string> => {
  let timer: NodeJS.Timeout | undefined;
  try {
    return await Promise.race([
      Promise.resolve(work),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("timeout")), ms);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
};

const logCall = (r: GateRequest, ok: boolean, startedAt: number): void => {
  try {
    insertSkillCall(r.db, {
      skillId: r.skillId,
      projectId: r.projectId,
      runId: r.runId,
      chosenBy: r.chosenBy,
      tool: r.tool,
      ok,
      durationMs: Date.now() - startedAt,
    });
    if (ok) {
      markFindChosen(r.db, { projectId: r.projectId, skillId: r.skillId });
    }
  } catch {
    // logging must never break the call
  }
};

/**
 * The single entry for loading or running a skill: checks, timeout and a
 * `skill_call` row for every attempt (refusals included).
 */
export const gateSkillCall = async (r: GateRequest): Promise<GateResult> => {
  const startedAt = Date.now();
  const refusal = GATE_CHECKS.map((check) => check(r)).find((x) => x !== null);
  if (refusal !== undefined && refusal !== null) {
    logCall(r, false, startedAt);
    return { ok: false, error: refusal };
  }
  try {
    const output = await withTimeout(
      r.execute(),
      r.timeoutMs ?? SKILL_CALL_TIMEOUT_MS,
    );
    logCall(r, true, startedAt);
    return { ok: true, output };
  } catch (error) {
    logCall(r, false, startedAt);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "skill_call_failed",
    };
  }
};
