import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import {
  comparePeersByName,
  loadActiveMemberPeers,
} from "@/lib/projects/acl/messaging/loadProjectMemberPeers";
import {
  loadOwnerPeer,
  loadOwnerSelf,
} from "@/lib/projects/acl/messaging/loadProjectOwnerPeerProfile";
import type {
  ListProjectPeersResult,
  ProjectPeerSelf,
} from "@/lib/projects/acl/messaging/projectPeer.types";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type {
  ListProjectPeersResult,
  ProjectPeer,
  ProjectPeerSelf,
} from "@/lib/projects/acl/messaging/projectPeer.types";

/** Active membership required. Peers = other members + project owner. */
export const listProjectPeers = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<ListProjectPeersResult> => {
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (membership === null) {
    return { ok: false, code: "forbidden" };
  }

  const isAgent = await isAgentUserId(input.actorUserId);
  const self: ProjectPeerSelf = {
    membershipId: membership.id,
    projectDisplayName: membership.projectDisplayName,
    teamLabel: membership.teamLabel,
    isAgent,
  };

  const memberPeers = await loadActiveMemberPeers({
    projectId: input.projectId,
    excludeUserId: input.actorUserId,
  });
  const ownerPeer = await loadOwnerPeer({
    projectId: input.projectId,
    excludeUserId: input.actorUserId,
  });
  const peers = [
    ...memberPeers,
    ...(ownerPeer !== null ? [ownerPeer] : []),
  ].sort(comparePeersByName);

  return { ok: true, self, peers };
};

/** Owner actor roster for get_project_acl (owners are not in memberships). */
export const listProjectPeersForOwnerActor = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
}): Promise<ListProjectPeersResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null || project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }

  const self = await loadOwnerSelf(input.ownerUserId);
  const peers = (
    await loadActiveMemberPeers({
      projectId: input.projectId,
      excludeUserId: input.ownerUserId,
    })
  ).sort(comparePeersByName);

  return { ok: true, self, peers };
};
