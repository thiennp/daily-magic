import { AGENT_RUN_WORKING_ESTIMATE_INSTRUCTION } from "@/lib/dispatch/agentRunWorkingEstimate.constant";

export const buildMarketplaceVibeCodingPlanEstimatePrompt = (
  taskPrompt: string,
): string =>
  [
    "Marketplace vibe-coding run — plan/estimate stage (read-only).",
    "Clarify the feature in plain language, list files you would touch (paths only), and estimate duration.",
    "Do not modify the repo, run git commands, or write files.",
    "",
    AGENT_RUN_WORKING_ESTIMATE_INSTRUCTION,
    "",
    "Task to plan and estimate:",
    taskPrompt.trim(),
  ].join("\n");
