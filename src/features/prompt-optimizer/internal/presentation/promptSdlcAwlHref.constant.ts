import { AGENT_WITCH_LOCAL_PROMPT_OPTIMIZER_DEEP_LINK } from "@/features/agent-witch/macDevices/public-api/types";
import { PROMPT_SDLC_GUIDE_EXAMPLE } from "@/features/prompt-optimizer/internal/presentation/promptSdlcGuideExamples.constant";

/**
 * AWL-H7 PM-3 (b): open Prompt optimizer in the Mac app (not retired http://127.0.0.1:… pages).
 * Mac handleOpenURL loads the wizard in an in-app WKWebView on the discovered port.
 */
export const PROMPT_SDLC_AWL_PAGE_HREF =
  AGENT_WITCH_LOCAL_PROMPT_OPTIMIZER_DEEP_LINK;

export const PROMPT_SDLC_AWL_GUIDE_HREF = `${PROMPT_SDLC_AWL_PAGE_HREF}/guide`;

export const PROMPT_SDLC_AWL_SAMPLE_HREF = `${PROMPT_SDLC_AWL_PAGE_HREF}?example=${PROMPT_SDLC_GUIDE_EXAMPLE}`;
