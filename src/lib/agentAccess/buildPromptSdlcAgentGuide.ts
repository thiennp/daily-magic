import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import {
  PROMPT_SDLC_AGENT_URL,
  PROMPT_SDLC_LIVE_PAGE_URL,
  PROMPT_SDLC_LOCAL_CONTEXT_REASON,
} from "@/lib/promptOptimizer/promptSdlcAgentContract.constant";

export const buildPromptSdlcAgentGuide = () => ({
  url: PROMPT_SDLC_AGENT_URL,
  page: PROMPT_SDLC_LIVE_PAGE_URL,
  context: PROMPT_SDLC_LOCAL_CONTEXT_REASON,
  useItYourself:
    "Before send_task, or before you save a prompt, POST your own prompt here. Do not ask the human to paste it into a different optimizer.",
  poll: `GET ${PROMPT_SDLC_AGENT_URL}?cycle=<cycleId> until done is true. The loop rewrites until the score passes, the round limit, the score has not risen for 3 rounds, or the person finishes the run. The next rewrite always starts from the highest scoring prompt. Lower scores become an avoid list, and earlier prompt text is not sent. After 3 tries that do not beat the best, the stop includes those reasons. When status is passed, use bestPrompt (useThisPrompt). When status is stopped or failed, do not use the prompt. totalTokens is the reported writer tokens so far.`,
  writers:
    "GET lists installed writer ids. Set judge and improver to those ids. When only one writer is installed, omit both and that writer fills both roles. Do not send manual. Scoring or rewriting by hand is the human page.",
});

export const buildPromptSdlcAgentGuidelineSection = (): {
  readonly heading: string;
  readonly body: readonly string[];
} => {
  const guide = buildPromptSdlcAgentGuide();

  return {
    heading: "Optimize your own prompt",
    body: [
      `Before you call send_task, or when you are about to save a prompt, run the prompt optimizer on this computer. Do this yourself. Do not ask the human to paste the prompt into a different optimizer.`,
      `${PROMPT_SDLC_LOCAL_CONTEXT_REASON} ${AGENT_WITCH_PRODUCT_NAME} is different because the optimizer runs in that local context.`,
      `GET ${guide.url} lists the installed writers. POST JSON {"goal","prompt","workingDirectory","judge","improver","passScore","maxRounds"} to ${guide.url}. workingDirectory is required and must be the project folder. ${guide.writers} passScore is a whole number from 1 to 100. The default is 90. maxRounds is a whole number from 1 to 30. The default is 10.`,
      guide.poll,
      `The human page is ${guide.page}. Instructions are ${guide.page}/guide.`,
    ],
  };
};
