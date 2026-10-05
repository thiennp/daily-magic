import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";

/**
 * project_id of a report (agent_runs, NOT NULL since 069). The project page
 * guard decides access, so project members can follow the link too, not only
 * the run's requester and executor.
 */
export const lookupAgentRunProjectId = async (
  runId: string,
): Promise<string | null> => {
  try {
    const run = await getAgentRunById(runId);
    const projectId = run?.projectId ?? null;
    return projectId !== null && projectId.length > 0 ? projectId : null;
  } catch {
    return null;
  }
};
