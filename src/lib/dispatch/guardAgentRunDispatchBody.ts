import { getAgentRunById } from "@/lib/dispatch/agentRunQueries";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type DispatchBodyGuard =
  { readonly ok: true } | { readonly ok: false; readonly errorMessage: string };

/**
 * Two things the group check alone does not cover:
 * - a run to continue (`sourceRunId`) must be one the requester took part in, not any run id;
 * - a project run sent to a colleague's computer needs that colleague to be on the project
 *   (the project's composition and folder go to their Mac).
 */
export const guardAgentRunDispatchBody = async (input: {
  readonly requesterUserId: string;
  readonly body: {
    readonly sourceRunId?: string;
    readonly projectId?: string;
    readonly targetUserId?: string;
  };
}): Promise<DispatchBodyGuard> => {
  const { requesterUserId, body } = input;
  if (body.sourceRunId !== undefined) {
    const source = await getAgentRunById(body.sourceRunId);
    const mine =
      source !== null &&
      (source.requesterUserId === requesterUserId ||
        source.executorUserId === requesterUserId);
    if (!mine) {
      return { ok: false, errorMessage: "That run is not yours to continue." };
    }
  }
  const { projectId, targetUserId } = body;
  if (
    projectId !== undefined &&
    targetUserId !== undefined &&
    targetUserId !== requesterUserId
  ) {
    const project = await getUserProjectById(projectId);
    const onProject =
      project !== null &&
      (project.ownerUserId === targetUserId ||
        (await getActiveProjectMembership(projectId, targetUserId)) !== null);
    if (!onProject) {
      return {
        ok: false,
        errorMessage: "That colleague is not on this project.",
      };
    }
  }
  return { ok: true };
};
