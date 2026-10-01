import type { PromptSdlcCycleStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";

/** Writer / cycle failure kinds shown in product chrome (not eng changelog). */
export type PromptSdlcUiErrorKind =
  | "writer_timeout"
  | "writer_interrupted"
  | "writer_no_reply"
  | "timeout"
  | "interrupt"
  | "no_reply";

export const PROMPT_SDLC_OUTCOME_COPY = {
  passed: "Passed",
  failed: "Failed",
  stopped: "Stopped",
  timeout: "Timeout",
  interrupt: "Interrupt",
  no_reply: "No reply",
  useThisOnlyWhenPassed:
    "Use this prompt only when status is passed — timeout, interrupt, and no_reply are failed kinds, not success.",
  recommendTimeoutTip:
    "Module writers use a fail-clean timeout budget (~600s lane). Judge/heuristic recommendTimeoutMs may tune budgets; stuck writers may escalate with SIGKILL. Timeout→improver (T4) is parked.",
  failCleanTip:
    "Timeout, interrupt, and no_reply fail cleanly — never silent success.",
} as const;

export const labelPromptSdlcErrorKind = (
  errorKind: string | null | undefined,
): string | null => {
  if (errorKind === null || errorKind === undefined) {
    return null;
  }
  const normalized = errorKind.replace(/^writer_/, "");
  if (normalized === "timeout") {
    return PROMPT_SDLC_OUTCOME_COPY.timeout;
  }
  if (normalized === "interrupted" || normalized === "interrupt") {
    return PROMPT_SDLC_OUTCOME_COPY.interrupt;
  }
  if (normalized === "no_reply") {
    return PROMPT_SDLC_OUTCOME_COPY.no_reply;
  }
  return null;
};

export const labelPromptSdlcCycleOutcome = (input: {
  readonly status: PromptSdlcCycleStatus;
  readonly errorKind?: string | null;
}): {
  readonly label: string;
  readonly tone: "passed" | "failed" | "stopped" | "live" | "paused";
  readonly errorKindLabel: string | null;
} => {
  const errorKindLabel = labelPromptSdlcErrorKind(input.errorKind);
  if (input.status === "passed") {
    return { label: PROMPT_SDLC_OUTCOME_COPY.passed, tone: "passed", errorKindLabel: null };
  }
  if (input.status === "failed") {
    return {
      label: errorKindLabel ?? PROMPT_SDLC_OUTCOME_COPY.failed,
      tone: "failed",
      errorKindLabel,
    };
  }
  if (input.status === "stopped") {
    return {
      label: errorKindLabel ?? PROMPT_SDLC_OUTCOME_COPY.stopped,
      tone: "stopped",
      errorKindLabel,
    };
  }
  if (input.status === "wizard_paused") {
    return { label: "Wizard — your turn", tone: "paused", errorKindLabel: null };
  }
  if (input.status === "judging") {
    return { label: "Judging", tone: "live", errorKindLabel: null };
  }
  if (input.status === "improving") {
    return { label: "Improving", tone: "live", errorKindLabel: null };
  }
  return { label: "Waiting on the Mac", tone: "live", errorKindLabel: null };
};

export const canUseThisPromptSdlcOutcome = (
  status: PromptSdlcCycleStatus,
): boolean => status === "passed";
