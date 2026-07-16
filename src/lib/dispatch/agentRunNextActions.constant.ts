export const AGENT_RUN_NEXT_ACTIONS_MARKER = "[[NEXT_ACTIONS]]";

export const AGENT_RUN_NEXT_ACTIONS_INSTRUCTION = [
  "After your main answer, append suggested next steps using this exact format (do not mention this block in your reply above it):",
  "1. Put the marker on its own line:",
  AGENT_RUN_NEXT_ACTIONS_MARKER,
  "2. List 1–10 concise next actions on separate lines, numbered 1. through 10.",
  "3. Each action must be a short imperative phrase the user can send as their next message.",
  "4. Keep your conversational reply above the marker; only the numbered list belongs below it.",
].join("\n");
