/** Overall work plan: waves with delegated sub-agents. */
export const AGENT_RUN_WAVE_PLAN_MARKER = "[[WAVE_PLAN]]";

/** Per-item status updates (id|status). Latest line wins. */
export const AGENT_RUN_WAVE_STATUS_MARKER = "[[WAVE_STATUS]]";

export const AGENT_RUN_WAVE_PLAN_INSTRUCTION = [
  "When the work can be split, prefer small waves and delegate independent pieces to subagents (or focused sequential agents) so each finished piece can enrich the report:",
  "1. Soon after your overall [[WORKING_ESTIMATE]], emit a plan:",
  AGENT_RUN_WAVE_PLAN_MARKER,
  "2. Then one line per wave or agent, exactly:",
  "W|<waveId>|<short wave title>|<estimateSeconds>",
  "A|<agentId>|<short agent title>|<estimateSeconds>",
  "   Example: W|1|Explore codebase|60",
  "   Example: A|1.1|Map auth flows|30",
  "3. Put agent lines under the wave they belong to (agent ids like 1.1 under wave 1).",
  "4. As work proceeds, emit status updates (re-emit the whole block or append lines):",
  AGENT_RUN_WAVE_STATUS_MARKER,
  "   <id>|<pending|working|done>",
  "   Example: 1.1|done",
  "   Example: 1.2|working",
  "5. Keep waves small. Prefer parallel-safe agents in the same wave when possible.",
  "6. After each agent finishes, also emit a short [[PROGRESS]] finding so the operator sees enriched results.",
  "7. Do not nest [[PROGRESS]], [[NEXT_ACTIONS]], or [[AWAITING_INPUT]] inside wave blocks.",
].join("\n");
