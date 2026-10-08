import { logCall, withTimeout, type LoggedCall } from "./gateSupport";
import { resolveScriptCall, type ScriptRequest } from "./resolveScriptCall";
import { getSkillBaseline } from "./skillBaselineDb";
import { countSkillRunCalls } from "./skillCallLog";
import { getSkillRow } from "./skillIndexDb";
import { isSafeSkillPathId } from "./skillMirror";
import { shouldHoldout } from "./skillSavings";

export const SKILL_CALL_TIMEOUT_MS = 30_000;

/** `ok: false` marks a failed call (e.g. script exit != 0) in the call log. */
export type GateExec = { readonly output: string; readonly ok: boolean };

export type GateRequest = LoggedCall & {
  readonly timeoutMs?: number;
  /** Script run: adds manifest, hash, approval, params and confinement checks. */
  readonly script?: ScriptRequest;
  /** Holdout cadence override (tests). */
  readonly holdoutEvery?: number;
  /** The load / run step; only called when every check passes. */
  readonly execute: () => Promise<string | GateExec> | string | GateExec;
};

export type GateResult =
  | { readonly ok: true; readonly output: string }
  | { readonly ok: false; readonly error: string; readonly output?: string };

/** A check returns a refusal reason, or null to allow. */
type GateCheck = (request: GateRequest) => string | null;

/** Checks every skill call passes; script and holdout gates follow below. */
export const GATE_CHECKS: readonly GateCheck[] = [
  (r) => (isSafeSkillPathId(r.skillId) ? null : "invalid_skill_id"),
  (r) => {
    const row = getSkillRow(r.db, r.projectId, r.skillId);
    if (row === null) {
      return "skill_not_installed";
    }
    return r.script !== undefined && !row.hasScripts
      ? "script_not_found"
      : null;
  },
  (r) => {
    if (r.script === undefined) {
      return null;
    }
    const resolved = resolveScriptCall(r.db, r, r.script);
    return resolved.ok ? null : resolved.error;
  },
];

const isHoldoutCall = (r: GateRequest): boolean =>
  r.tool === "skills_run" &&
  shouldHoldout({
    skillId: r.skillId,
    priorCalls: countSkillRunCalls(r.db, r.projectId, r.skillId),
    hasBaseline:
      getSkillBaseline(r.db, r.projectId, r.skillId).baseline !== null,
    ...(r.holdoutEvery !== undefined ? { every: r.holdoutEvery } : {}),
  });

/**
 * The single entry for loading or running a skill: checks, holdout, timeout
 * and a `skill_call` row for every attempt (refusals included).
 */
export const gateSkillCall = async (r: GateRequest): Promise<GateResult> => {
  const startedAt = Date.now();
  const refusal = GATE_CHECKS.map((check) => check(r)).find((x) => x !== null);
  if (refusal !== undefined && refusal !== null) {
    logCall(r, false, startedAt);
    return { ok: false, error: refusal };
  }
  if (isHoldoutCall(r)) {
    logCall(r, true, startedAt, true);
    return { ok: false, error: "holdout" };
  }
  try {
    const done = await withTimeout(
      r.execute(),
      r.timeoutMs ?? SKILL_CALL_TIMEOUT_MS,
    );
    const exec = typeof done === "string" ? { output: done, ok: true } : done;
    logCall(r, exec.ok, startedAt);
    return exec.ok
      ? { ok: true, output: exec.output }
      : { ok: false, error: "script_failed", output: exec.output };
  } catch (error) {
    logCall(r, false, startedAt);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "skill_call_failed",
    };
  }
};
