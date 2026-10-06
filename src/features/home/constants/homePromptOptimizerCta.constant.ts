import { PROMPT_SDLC_AWL_PAGE_HREF } from "@/features/prompt-optimizer/internal/presentation/promptSdlcAwlHref.constant";

/** Home CTA opens AgentWitch Local on this computer (not the cloud explainer runner). */
export const HOME_PROMPT_OPTIMIZER_CTA_HREF = PROMPT_SDLC_AWL_PAGE_HREF;

export const HOME_PROMPT_OPTIMIZER_CTA_COPY = {
  eyebrow: "Prompt optimizer",
  body: "Improve a prompt in your project on your computer.",
  cta: "Open in AgentWitch Local",
} as const;
