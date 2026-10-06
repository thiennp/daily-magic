import {
  PROMPT_SDLC_AGENT_URL,
  PROMPT_SDLC_LIVE_PAGE_URL,
  PROMPT_SDLC_LOCAL_CONTEXT_REASON,
  PROMPT_SDLC_WIZARD_MAX_ROUNDS,
  PROMPT_SDLC_WIZARD_PASS_SCORE,
} from "../../../../adapters/promptSdlcAwcCore";
import type { PromptSdlcLocalWriterChoice } from "./promptSdlcLocalForm";

export const buildPromptSdlcAgentCatalog = (
  writers: readonly PromptSdlcLocalWriterChoice[],
) => {
  const sole = writers.length === 1 ? writers[0].id : null;

  return {
    ok: true as const,
    url: PROMPT_SDLC_AGENT_URL,
    page: PROMPT_SDLC_LIVE_PAGE_URL,
    context: PROMPT_SDLC_LOCAL_CONTEXT_REASON,
    installedWriters: writers,
    post: {
      method: "POST" as const,
      url: PROMPT_SDLC_AGENT_URL,
      body: {
        goal: "what a good result is",
        prompt: "the prompt to score and rewrite",
        workingDirectory: "absolute project folder on this computer",
        judge: sole ?? "installed writer id",
        improver: sole ?? "installed writer id",
        passScore: PROMPT_SDLC_WIZARD_PASS_SCORE,
        maxRounds: PROMPT_SDLC_WIZARD_MAX_ROUNDS,
      },
    },
    poll: `GET ${PROMPT_SDLC_AGENT_URL}?cycle=<cycleId> until done is true.`,
    writers:
      sole === null
        ? "Set judge and improver to installed writer ids. Omit them only when one writer is installed; that writer fills both roles."
        : `Only ${sole} is installed. Omit judge and improver and both roles use it.`,
  };
};
