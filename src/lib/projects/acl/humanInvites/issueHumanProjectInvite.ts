import { randomUUID } from "node:crypto";

import { authorizeProjectOwner } from "@/lib/projects/acl/authorizeProjectOwner";
import { buildHumanInviteUrl } from "@/lib/projects/acl/humanInvites/buildHumanInviteUrl";
import {
  clampHumanInviteExpiresDays,
  parseHumanInviteEmail,
  parseHumanInviteRole,
  parseRequireEmailMatch,
} from "@/lib/projects/acl/humanInvites/clampHumanInviteParams";
import {
  createHumanInviteToken,
  hashHumanInviteToken,
} from "@/lib/projects/acl/humanInvites/hashHumanInviteToken";
import mapHumanInviteRow from "@/lib/projects/acl/humanInvites/mapHumanInviteRow";
import type HumanInviteRecord from "@/lib/projects/acl/humanInvites/types/HumanInviteRecord.type";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import { asRowArray, getSql } from "@/lib/db";

export type IssueHumanInviteResult =
  | {
      readonly ok: true;
      readonly invite: HumanInviteRecord;
      readonly url: string;
      readonly token: string;
    }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "forbidden"
        | "invalid"
        | "email_required_for_lock";
    };

export const issueHumanProjectInvite = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly role?: unknown;
  readonly email?: unknown;
  readonly requireEmailMatch?: unknown;
  readonly expiresInDays?: unknown;
}): Promise<IssueHumanInviteResult> => {
  const access = await authorizeProjectOwner({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
  });
  if (!access.allow) {
    return { ok: false, code: access.reason };
  }
  const role = parseHumanInviteRole(input.role ?? "member");
  if (role === null) {
    return { ok: false, code: "invalid" };
  }
  const email = parseHumanInviteEmail(input.email);
  const requireEmailMatch = parseRequireEmailMatch(input.requireEmailMatch);
  if (requireEmailMatch && email === null) {
    return { ok: false, code: "email_required_for_lock" };
  }
  const expiresInDays = clampHumanInviteExpiresDays(input.expiresInDays);
  const token = createHumanInviteToken();
  const tokenHash = hashHumanInviteToken(token);
  const inviteId = randomUUID();
  const expiresAt = new Date(
    Date.now() + expiresInDays * 24 * 60 * 60 * 1000,
  ).toISOString();

  await ensureProjectAclSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      INSERT INTO project_human_invites (
        id, project_id, created_by_user_id, token_hash, email,
        require_email_match, role, max_uses, uses_remaining, expires_at
      )
      VALUES (
        ${inviteId},
        ${input.projectId},
        ${input.ownerUserId},
        ${tokenHash},
        ${email},
        ${requireEmailMatch},
        ${role},
        1,
        1,
        ${expiresAt}::timestamptz
      )
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "invalid" };
  }
  return {
    ok: true,
    invite: mapHumanInviteRow(rows[0]),
    url: buildHumanInviteUrl(token),
    token,
  };
};
