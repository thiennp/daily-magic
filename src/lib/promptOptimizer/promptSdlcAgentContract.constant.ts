import { AGENT_WITCH_LOCAL_APP_ORIGIN } from "@/lib/agentWitch/agentWitchLocalAppPort.constant";

export const PROMPT_SDLC_AGENT_PATH = "/prompt-optimizer/agent";

export const PROMPT_SDLC_AGENT_URL = `${AGENT_WITCH_LOCAL_APP_ORIGIN}${PROMPT_SDLC_AGENT_PATH}`;

export const PROMPT_SDLC_LIVE_PAGE_URL = `${AGENT_WITCH_LOCAL_APP_ORIGIN}/prompt-optimizer`;

/** Why a bot must run the prompt optimizer in the project folder, not in a separate optimizer. */
export const PROMPT_SDLC_LOCAL_CONTEXT_REASON =
  "The prompt optimizer runs the judge and improver inside the project folder on this computer, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.";

export const PROMPT_SDLC_AGENT_BODY_ERROR = `goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this computer. ${PROMPT_SDLC_LOCAL_CONTEXT_REASON}`;

export const PROMPT_SDLC_AGENT_MANUAL_ERROR =
  "This API runs installed writers. Score or rewrite by hand on the prompt optimizer page.";
