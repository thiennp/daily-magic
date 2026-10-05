import { randomUUID } from "node:crypto";

import { ensureProjectComputerMembershipSchema } from "@/lib/projects/acl/ensureProjectComputerMembershipSchema";
import mapProjectMembershipRow from "@/lib/projects/acl/mapProjectMembershipRow";
import { resolveComputerMembershipDisplayName } from "@/lib/projects/acl/resolveComputerMembershipDisplayName";
import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export type UpsertProjectComputerMembershipResult =
  | { readonly ok: true; readonly membership: ProjectMembershipRecord }
  | { readonly ok: false; readonly code: "device_not_found" | "forbidden" };

/** Ensure one active computer seat for (project, device). Idempotent. */
export const upsertProjectComputerMembership = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly deviceId: string;
}): Promise<UpsertProjectComputerMembershipResult> => {
  await ensureProjectComputerMembershipSchema();
  const sql = getSql();
  const devices = asRowArray(
    await sql`
      SELECT id, user_id, display_name, device_label, revoked_at
      FROM agent_witch_devices
      WHERE id = ${input.deviceId}
      LIMIT 1
    `,
  );
  const device = devices[0];
  if (device === undefined || device.revoked_at != null) {
    return { ok: false, code: "device_not_found" };
  }
  if (String(device.user_id) !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }
  const displayName = resolveComputerMembershipDisplayName({
    displayName: device.display_name ? String(device.display_name) : null,
    deviceLabel: device.device_label ? String(device.device_label) : null,
    deviceId: input.deviceId,
  });
  const existing = asRowArray(
    await sql`
      SELECT *
      FROM project_memberships
      WHERE project_id = ${input.projectId}
        AND device_id = ${input.deviceId}
        AND member_kind = 'computer'
        AND status = 'active'
      LIMIT 1
    `,
  );
  if (existing[0] !== undefined) {
    const updated = asRowArray(
      await sql`
        UPDATE project_memberships
        SET project_display_name = ${displayName},
            user_id = ${input.ownerUserId}
        WHERE id = ${String(existing[0].id)}
        RETURNING *
      `,
    );
    return { ok: true, membership: mapProjectMembershipRow(updated[0]!) };
  }
  const membershipId = randomUUID();
  const inserted = asRowArray(
    await sql`
      INSERT INTO project_memberships (
        id, project_id, user_id, role, status, team_label, scopes,
        project_display_name, member_kind, device_id
      )
      VALUES (
        ${membershipId},
        ${input.projectId},
        ${input.ownerUserId},
        'member',
        'active',
        NULL,
        ${[]},
        ${displayName},
        'computer',
        ${input.deviceId}
      )
      RETURNING *
    `,
  );
  return { ok: true, membership: mapProjectMembershipRow(inserted[0]!) };
};
