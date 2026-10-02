import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { isAgentUserId } from "@/lib/projects/acl/isAgentUser";
import { isAgentAccessSyntheticEmail } from "@/lib/agentAccess/isAgentAccessSyntheticEmail";
import { asRowArray, getSql } from "@/lib/db";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

export type ProjectPeerSelf = {
  readonly projectDisplayName: string | null;
  readonly teamLabel: string | null;
  readonly isAgent: boolean;
};

export type ProjectPeer = {
  readonly projectDisplayName: string | null;
  readonly teamLabel: string | null;
  readonly isAgent: boolean;
  readonly isOwner: boolean;
};

export type ListProjectPeersResult =
  | {
      readonly ok: true;
      readonly self: ProjectPeerSelf;
      readonly peers: readonly ProjectPeer[];
    }
  | { readonly ok: false; readonly code: "forbidden" };

const comparePeersByName = (a: ProjectPeer, b: ProjectPeer): number => {
  if (a.projectDisplayName === null && b.projectDisplayName === null) {
    return 0;
  }
  if (a.projectDisplayName === null) {
    return 1;
  }
  if (b.projectDisplayName === null) {
    return -1;
  }
  return a.projectDisplayName.localeCompare(b.projectDisplayName);
};

const loadActiveMemberPeers = async (input: {
  readonly projectId: string;
  readonly excludeUserId: string;
}): Promise<ProjectPeer[]> => {
  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT m.project_display_name, m.team_label, u.email
      FROM project_memberships m
      JOIN users u ON u.id = m.user_id
      WHERE m.project_id = ${input.projectId}
        AND m.status = 'active'
        AND m.user_id <> ${input.excludeUserId}
    `,
  );
  return rows.map((row) => ({
    projectDisplayName: row.project_display_name
      ? String(row.project_display_name)
      : null,
    teamLabel: row.team_label ? String(row.team_label) : null,
    isAgent:
      typeof row.email === "string" &&
      isAgentAccessSyntheticEmail(String(row.email)),
    isOwner: false,
  }));
};

const loadOwnerPeer = async (input: {
  readonly projectId: string;
  readonly excludeUserId: string | null;
}): Promise<ProjectPeer | null> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return null;
  }
  if (
    input.excludeUserId !== null &&
    project.ownerUserId === input.excludeUserId
  ) {
    return null;
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT name, email
      FROM users
      WHERE id = ${project.ownerUserId}
      LIMIT 1
    `,
  );
  const row = rows[0];
  const name =
    row !== undefined && typeof row.name === "string" && row.name.trim().length > 0
      ? String(row.name).trim()
      : "Owner";
  const email =
    row !== undefined && typeof row.email === "string" ? String(row.email) : null;
  return {
    projectDisplayName: name,
    teamLabel: null,
    isAgent: email !== null && isAgentAccessSyntheticEmail(email),
    isOwner: true,
  };
};

const loadOwnerSelf = async (ownerUserId: string): Promise<ProjectPeerSelf> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT name, email
      FROM users
      WHERE id = ${ownerUserId}
      LIMIT 1
    `,
  );
  const row = rows[0];
  const name =
    row !== undefined && typeof row.name === "string" && row.name.trim().length > 0
      ? String(row.name).trim()
      : "Owner";
  const email =
    row !== undefined && typeof row.email === "string" ? String(row.email) : null;
  return {
    projectDisplayName: name,
    teamLabel: null,
    isAgent: email !== null && isAgentAccessSyntheticEmail(email),
  };
};

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
