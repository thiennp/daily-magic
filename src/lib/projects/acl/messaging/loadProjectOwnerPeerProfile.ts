import { isAgentAccessSyntheticEmail } from "@/lib/agentAccess/isAgentAccessSyntheticEmail";
import { asRowArray, getSql } from "@/lib/db";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import type {
  ProjectPeer,
  ProjectPeerSelf,
} from "@/lib/projects/acl/messaging/projectPeer.types";

const mapOwnerUserRow = (row: {
  readonly name?: unknown;
  readonly email?: unknown;
} | undefined): { readonly name: string; readonly email: string | null } => {
  const name =
    row !== undefined && typeof row.name === "string" && row.name.trim().length > 0
      ? String(row.name).trim()
      : "Owner";
  const email =
    row !== undefined && typeof row.email === "string" ? String(row.email) : null;
  return { name, email };
};

export const loadOwnerPeer = async (input: {
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
  const { name, email } = mapOwnerUserRow(rows[0]);
  return {
    projectDisplayName: name,
    teamLabel: null,
    isAgent: email !== null && isAgentAccessSyntheticEmail(email),
    isOwner: true,
  };
};

export const loadOwnerSelf = async (
  ownerUserId: string,
): Promise<ProjectPeerSelf> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT name, email
      FROM users
      WHERE id = ${ownerUserId}
      LIMIT 1
    `,
  );
  const { name, email } = mapOwnerUserRow(rows[0]);
  return {
    projectDisplayName: name,
    teamLabel: null,
    isAgent: email !== null && isAgentAccessSyntheticEmail(email),
  };
};
