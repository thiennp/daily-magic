import {
  isPromptSdlcTerminalStatus,
  PROMPT_SDLC_LIVE_PAGE_URL,
  PROMPT_SDLC_LOCAL_CONTEXT_REASON,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";

export const buildPromptSdlcAgentSnapshot = (cycle: PromptSdlcLocalCycle) => {
  const latest = cycle.revisions[cycle.revisions.length - 1] ?? null;
  const done = isPromptSdlcTerminalStatus(cycle.status);

  return {
    ok: true as const,
    cycleId: cycle.id,
    status: cycle.status,
    done,
    useThisPrompt: cycle.status === "passed",
    prompt: latest?.promptText ?? "",
    score: latest?.judgement?.score ?? null,
    passed: latest?.judgement?.passed ?? null,
    goal: cycle.goal,
    judge: cycle.judgeModel,
    improver: cycle.improverModel,
    workingDirectory: cycle.workingDirectory ?? null,
    passScore: cycle.passScore,
    round: cycle.currentRound,
    errorMessage: cycle.errorMessage,
    context: PROMPT_SDLC_LOCAL_CONTEXT_REASON,
    page: `${PROMPT_SDLC_LIVE_PAGE_URL}?cycle=${encodeURIComponent(cycle.id)}`,
  };
};
