import { AGENT_RUN_WORKING_ESTIMATE_INSTRUCTION } from "@/lib/dispatch/agentRunWorkingEstimate.constant";
import { AGENT_RUN_WAVE_PLAN_INSTRUCTION } from "@/lib/dispatch/agentRunWavePlan.constant";

export const AGENT_RUN_PROGRESS_MARKER = "[[PROGRESS]]";

export const AGENT_RUN_PROGRESS_INSTRUCTION = [
  AGENT_RUN_WORKING_ESTIMATE_INSTRUCTION,
  "",
  AGENT_RUN_WAVE_PLAN_INSTRUCTION,
  "",
  "While working, report user-visible progress with this exact format (plain language, not developer jargon):",
  "1. Put the marker on its own line:",
  AGENT_RUN_PROGRESS_MARKER,
  "2. On the next line, a short step title (for example: Reading portfolio files).",
  "3. On the next 1–3 lines only, write short detail sentences about what you are doing or found (no blank line inside those detail lines).",
  "4. After those detail lines, continue normally. Put the final answer outside progress blocks.",
  "5. Emit a new progress block whenever you start a meaningful new step or a subagent finishes.",
  "6. Do not put [[NEXT_ACTIONS]] or [[AWAITING_INPUT]] inside a progress block.",
].join("\n");

export const wrapPromptWithAgentRunProgressInstruction = (
  prompt: string,
): string => `${prompt.trim()}\n\n---\n${AGENT_RUN_PROGRESS_INSTRUCTION}`;
