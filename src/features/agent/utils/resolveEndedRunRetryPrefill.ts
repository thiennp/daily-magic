import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

/** afae8216: the ask and project to refill when retrying an ended run. */
export const resolveEndedRunRetryPrefill = (
  run: AgentRunRecord | null,
): { readonly prompt: string; readonly projectId: string | null } | null => {
  const prompt = run?.prompt.trim() ?? "";
  if (run === null || prompt.length === 0) {
    return null;
  }
  const projectId = run.projectId?.trim() ?? "";
  return { prompt, projectId: projectId.length > 0 ? projectId : null };
};
