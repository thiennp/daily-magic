import { nextProjectHistorySkillgenState } from "./nextProjectHistorySkillgenState";
import type {
  ProjectHistorySkillgenEvent,
  ProjectHistorySkillgenState,
} from "./projectHistorySkillgenStateMachine";
import { PROJECT_HISTORY_SKILL_VALIDATE_RETRY_MAX } from "./projectHistory.constants";

export type StepProjectHistorySkillgenFsmVerdict =
  | { readonly kind: "close"; readonly ready: boolean }
  | { readonly kind: "budget"; readonly ok: boolean }
  | { readonly kind: "draft_cap"; readonly reached: boolean }
  | { readonly kind: "scrub"; readonly residualSecret: boolean }
  | { readonly kind: "qualify"; readonly ok: boolean }
  | {
      readonly kind: "dedup";
      readonly action: "skip_exact" | "update_draft" | "create_new";
    }
  | { readonly kind: "extract"; readonly ok: boolean }
  | { readonly kind: "validate"; readonly ok: boolean; readonly attempts: number }
  | { readonly kind: "owner"; readonly decision: "publish" | "discard" };

export type StepProjectHistorySkillgenFsmInput = {
  readonly state: ProjectHistorySkillgenState;
  readonly verdict: StepProjectHistorySkillgenFsmVerdict;
};

export type StepProjectHistorySkillgenFsmResult =
  | {
      readonly ok: true;
      readonly event: ProjectHistorySkillgenEvent;
      readonly nextState: ProjectHistorySkillgenState;
    }
  | {
      readonly ok: false;
      readonly reason: "no_transition" | "illegal_event" | "not_ready";
      readonly state: ProjectHistorySkillgenState;
      readonly event?: ProjectHistorySkillgenEvent;
    };

const mapVerdictToEvent = (
  state: ProjectHistorySkillgenState,
  verdict: StepProjectHistorySkillgenFsmVerdict,
): ProjectHistorySkillgenEvent | null => {
  switch (verdict.kind) {
    case "close":
      return state === "CAPTURING" && verdict.ready ? "episode_closed" : null;
    case "draft_cap":
      return state === "EPISODE_READY" && verdict.reached
        ? "draft_cap_reached"
        : null;
    case "budget":
      if (state !== "EPISODE_READY") {
        return null;
      }
      return verdict.ok ? "budget_ok" : "budget_exceeded";
    case "scrub":
      if (state !== "SCRUBBING") {
        return null;
      }
      return verdict.residualSecret ? "scrub_quarantine" : "scrub_ok";
    case "qualify":
      if (state !== "TRIAGE") {
        return null;
      }
      return verdict.ok ? "qualify_ok" : "qualify_reject";
    case "dedup":
      if (state !== "DEDUP") {
        return null;
      }
      if (verdict.action === "skip_exact") {
        return "dedup_skip";
      }
      if (verdict.action === "update_draft" || verdict.action === "create_new") {
        return verdict.action === "update_draft" ? "dedup_merge" : "dedup_novel";
      }
      return null;
    case "extract":
      if (state !== "EXTRACT") {
        return null;
      }
      return verdict.ok ? "extract_ok" : "extract_fail";
    case "validate":
      if (state !== "VALIDATE") {
        return null;
      }
      if (verdict.ok) {
        return "validate_ok";
      }
      return verdict.attempts <= PROJECT_HISTORY_SKILL_VALIDATE_RETRY_MAX
        ? "validate_retry"
        : "validate_fail";
    case "owner":
      if (state !== "AWAITING_REVIEW") {
        return null;
      }
      return verdict.decision === "publish" ? "owner_publish" : "owner_discard";
    default: {
      const _exhaustive: never = verdict;
      return _exhaustive;
    }
  }
};

/**
 * Pure FSM step: maps (state, step verdict) → legal next state.
 * The IO runner gathers verdicts from step 2–16 functions and calls this.
 * Never performs IO and never invents illegal edges.
 */
export const stepProjectHistorySkillgenFsm = (
  input: StepProjectHistorySkillgenFsmInput,
): StepProjectHistorySkillgenFsmResult => {
  const event = mapVerdictToEvent(input.state, input.verdict);
  if (event === null) {
    return {
      ok: false,
      reason:
        input.verdict.kind === "close" && !input.verdict.ready
          ? "not_ready"
          : "no_transition",
      state: input.state,
    };
  }
  const transition = nextProjectHistorySkillgenState(input.state, event);
  if (!transition.ok) {
    return {
      ok: false,
      reason: "illegal_event",
      state: input.state,
      event,
    };
  }
  return { ok: true, event, nextState: transition.state };
};
