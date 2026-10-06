import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";

const readNonEmptyString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

/**
 * Orchestrators (automations, workflows, prompt SDLC) store a single error
 * string. Append the dispatch `hint` (e.g. for `project_required`) so the
 * stored error tells the owner how to fix it.
 */
export const readDispatchErrorMessageWithHint = (
  message: Pick<AgentWitchMessage, "payload">,
  fallback: string,
): string => {
  const errorMessage = readNonEmptyString(message.payload?.errorMessage);
  const hint = readNonEmptyString(message.payload?.hint);
  const base = errorMessage.length > 0 ? errorMessage : fallback;

  return hint.length > 0 ? `${base} ${hint}` : base;
};

export default readDispatchErrorMessageWithHint;
