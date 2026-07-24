export const AGENT_RUN_INPUT_MARKER = "[[AWAITING_INPUT]]";

export const AGENT_RUN_INPUT_GUARDRAILS = [
  "When you need a human decision before continuing, pause and ask using this exact format:",
  "1. Put the marker on its own line:",
  AGENT_RUN_INPUT_MARKER,
  "2. Put your single clear question on the next line.",
  "3. Do not invent answers. Wait for the browser response before continuing.",
  "4. Ask only one question per pause.",
  "5. Never ask the operator to confirm a time estimate — estimates are recorded automatically and work should continue immediately.",
].join("\n");

export const wrapPromptWithAgentRunInputGuardrails = (prompt: string): string =>
  `${prompt.trim()}\n\n---\n${AGENT_RUN_INPUT_GUARDRAILS}`;
