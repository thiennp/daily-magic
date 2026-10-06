import { getPublishedCapabilityById } from "@/lib/capabilities/capabilityQueries";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { resolveOrchestratorDispatchProjectId } from "@/lib/dispatch/resolveOrchestratorDispatchProjectId";
import type WorkflowRunRecord from "@/lib/workflowOrchestration/types/WorkflowRunRecord.type";

const readCapabilityProjectId = async (
  capabilityId: string | null,
): Promise<string | null> => {
  if (capabilityId === null || capabilityId.length === 0) {
    return null;
  }
  try {
    const capability = await getPublishedCapabilityById(capabilityId);
    return capability?.projectId ?? null;
  } catch {
    return null;
  }
};

/**
 * Thien LOCK: a workflow step run always carries a project.
 * Explicit body projectId -> workflow capability's project -> requester's
 * Default on the step's computer. Null only when none resolves (dispatch
 * then answers `project_required` with a hint).
 */
export const resolveWorkflowRunDispatchProjectId = async (input: {
  readonly run: WorkflowRunRecord;
  readonly requesterUserId: string;
  readonly requesterEmail?: string | null;
  readonly dispatchBodyBase: Omit<AgentRunDispatchBody, "prompt">;
}): Promise<string | null> => {
  const explicit = input.dispatchBodyBase.projectId?.trim() ?? "";
  const capabilityProjectId =
    explicit.length > 0
      ? null
      : await readCapabilityProjectId(input.run.capabilityId);

  return resolveOrchestratorDispatchProjectId({
    ownerUserId: input.requesterUserId,
    ownerEmail: input.requesterEmail,
    boundProjectIds: [explicit, capabilityProjectId],
    deviceIds: [input.dispatchBodyBase.targetDeviceId, input.run.deviceId],
  });
};

export default resolveWorkflowRunDispatchProjectId;
