import { checkProjectMembershipStatus } from "@/lib/projects/acl/checkProjectMembershipStatus";
import { getProjectBriefing } from "@/lib/projects/acl/getProjectBriefing";
import type { ProjectBriefing } from "@/lib/projects/acl/types/ProjectBriefing.type";

export type MyProjectAccessPayload = {
  readonly ok: true;
  readonly projectId: string;
  readonly status: string;
  readonly briefing?: ProjectBriefing;
};

/**
 * Status for the caller; when active/owner, attach the onboard briefing once
 * so agents polling after Approve can self-onboard without a push channel.
 */
export const buildMyProjectAccessPayload = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<MyProjectAccessPayload> => {
  const status = await checkProjectMembershipStatus(
    input.projectId,
    input.actorUserId,
  );
  const base = { ok: true as const, projectId: input.projectId, status };
  if (status !== "active" && status !== "owner") {
    return base;
  }
  const briefing = await getProjectBriefing({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
  });
  if (!briefing.ok) {
    return base;
  }
  return { ...base, briefing: briefing.briefing };
};
