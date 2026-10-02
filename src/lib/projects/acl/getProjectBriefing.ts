import { formatProjectBriefingText } from "@/lib/projects/acl/formatProjectBriefingText";
import { listBoundHarnessSlugsForProject } from "@/lib/projects/acl/listBoundHarnessSlugsForProject";
import { listProjectPeers } from "@/lib/projects/acl/messaging/listProjectPeers";
import { PROJECT_BRIEFING_HOW_TO_DISPATCH } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { resolveProjectAclAccess } from "@/lib/projects/acl/resolveProjectAclAccess";
import type { ProjectBriefing } from "@/lib/projects/acl/types/ProjectBriefing.type";

export type GetProjectBriefingResult =
  | { readonly ok: true; readonly briefing: ProjectBriefing }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

export const getProjectBriefing = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<GetProjectBriefingResult> => {
  const access = await resolveProjectAclAccess({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    requiredScopes: ["project:meta"],
  });
  if (!access.ok) {
    return {
      ok: false,
      code: access.reason === "not_found" ? "not_found" : "forbidden",
    };
  }

  const peersResult = await listProjectPeers({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
  });
  const peers =
    peersResult.ok
      ? peersResult.peers.map((peer) => ({
          projectDisplayName: peer.projectDisplayName,
          teamLabel: peer.teamLabel,
        }))
      : [];

  const boundHarnessSetSlugs = await listBoundHarnessSlugsForProject(
    input.projectId,
  );
  const base = {
    projectId: input.projectId,
    projectName: access.project.name,
    caller: {
      projectDisplayName: access.membership?.projectDisplayName ?? null,
      teamLabel: access.membership?.teamLabel ?? null,
    },
    peers,
    howToDispatch: PROJECT_BRIEFING_HOW_TO_DISPATCH,
    playbooks: {
      boundHarnessSetSlugs,
      note:
        boundHarnessSetSlugs.length === 0 ? "no playbooks bound" : null,
    },
  };
  return {
    ok: true,
    briefing: { ...base, briefingText: formatProjectBriefingText(base) },
  };
};
