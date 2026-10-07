import {
  AGENT_WITCH_LOCAL_APP_DISCOVERED_ORIGIN,
  AGENT_WITCH_LOCAL_APP_PORT_DISCOVERY_SENTENCE,
  AGENT_WITCH_LOCAL_DEEP_LINK_SCHEME,
} from "@agent-witch/shared/network";

export const PROMPT_SDLC_AGENT_PATH = "/prompt-optimizer/agent";

/**
 * Bot API URL template (DF-033). Since H6 the port is per account, so bots
 * replace `<localAppPort>` with the value AWL saved; AWL itself answers with
 * its real port (buildPromptSdlcAgentCatalog).
 */
export const PROMPT_SDLC_AGENT_URL = `${AGENT_WITCH_LOCAL_APP_DISCOVERED_ORIGIN}${PROMPT_SDLC_AGENT_PATH}`;

/** How a bot finds `<localAppPort>` for PROMPT_SDLC_AGENT_URL. */
export const PROMPT_SDLC_AGENT_PORT_DISCOVERY =
  AGENT_WITCH_LOCAL_APP_PORT_DISCOVERY_SENTENCE;

/** Human page: the Mac app's Prompt optimizer (H7 deep link; no browser AWL). */
export const PROMPT_SDLC_LIVE_PAGE_URL = `${AGENT_WITCH_LOCAL_DEEP_LINK_SCHEME}://prompt-optimizer`;

/** Why a bot must run the prompt optimizer in the project folder, not in a separate optimizer. */
export const PROMPT_SDLC_LOCAL_CONTEXT_REASON =
  "The prompt optimizer runs the judge and improver inside the project folder on this computer, so they can read the harness and the code. An optimizer that runs somewhere else cannot see that folder, so its score is not reliable for this context.";

export const PROMPT_SDLC_AGENT_BODY_ERROR = `goal, prompt, and workingDirectory are required. workingDirectory is the project folder on this computer. ${PROMPT_SDLC_LOCAL_CONTEXT_REASON}`;

export const PROMPT_SDLC_AGENT_MANUAL_ERROR =
  "This API runs installed writers. Score or rewrite by hand on the prompt optimizer page.";
