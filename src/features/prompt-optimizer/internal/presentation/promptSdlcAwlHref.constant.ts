import { AGENT_WITCH_LIVE_APP_ORIGIN } from "@agent-witch/shared/network";

import { PROMPT_SDLC_GUIDE_EXAMPLE } from "@/features/prompt-optimizer/internal/presentation/promptSdlcGuideExamples.constant";

/** AWL page where the prompt optimizer run happens. */
export const PROMPT_SDLC_AWL_PAGE_HREF = `${AGENT_WITCH_LIVE_APP_ORIGIN}/prompt-optimizer`;

export const PROMPT_SDLC_AWL_GUIDE_HREF = `${PROMPT_SDLC_AWL_PAGE_HREF}/guide`;

export const PROMPT_SDLC_AWL_SAMPLE_HREF = `${PROMPT_SDLC_AWL_PAGE_HREF}?example=${PROMPT_SDLC_GUIDE_EXAMPLE}`;
