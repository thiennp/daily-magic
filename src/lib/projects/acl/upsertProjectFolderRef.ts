import { randomUUID } from "node:crypto";

import { checkFolderRefDeviceAcl } from "@/lib/projects/acl/checkFolderRefDeviceAcl";
import { ensureProjectAclSchema } from "@/lib/projects/acl/ensureProjectAclSchema";
import mapProjectFolderRefRow from "@/lib/projects/acl/mapProjectFolderRefRow";
import type ProjectFolderRefRecord from "@/lib/projects/acl/types/ProjectFolderRefRecord.type";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { asRowArray, getSql } from "@/lib/db";
import { scheduleProjectUpdatedNotify } from "@/lib/projects/acl/messaging/scheduleProjectUpdatedNotify";
import type { ProjectComputerMemberLookup } from "@/lib/projects/acl/types/ProjectComputerMemberLookup.type";
import type { ProjectOwnerDeviceLookup } from "@/lib/projects/acl/types/ProjectOwnerDeviceLookup.type";

export type UpsertProjectFolderRefResult =
  | { readonly ok: true; readonly folderRef: ProjectFolderRefRecord }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "forbidden"
        | "invalid"
        | "folder_ref_device_not_member";
    };

export const upsertProjectFolderRef = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
  readonly machineOrDeviceRef: string;
  readonly folderPath: string;
  /** Explicit picker deviceId; always membership-checked. */
  readonly deviceId?: string | null;
  readonly isComputerMember?: ProjectComputerMemberLookup;
  readonly isOwnerDevice?: ProjectOwnerDeviceLookup;
}): Promise<UpsertProjectFolderRefResult> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId !== input.ownerUserId) {
    return { ok: false, code: "forbidden" };
  }
  const folder = input.folderPath.trim();
  if (folder.length === 0) {
    return { ok: false, code: "invalid" };
  }
  const acl = await checkFolderRefDeviceAcl(input);
  if (!acl.ok) {
    return { ok: false, code: acl.code };
  }
  const machine = acl.ref;

  await ensureProjectAclSchema();
  const sql = getSql();
  const existing = asRowArray(
    await sql`
      SELECT * FROM project_folder_refs
      WHERE project_id = ${input.projectId}
        AND machine_or_device_ref = ${machine}
        AND folder_path = ${folder}
      LIMIT 1
    `,
  );
  if (existing.length > 0) {
    const updated = asRowArray(
      await sql`
        UPDATE project_folder_refs
        SET updated_at = NOW()
        WHERE id = ${String(existing[0].id)}
        RETURNING *
      `,
    );
    const folderRef = mapProjectFolderRefRow(updated[0]);
    await scheduleProjectUpdatedNotify({
      projectId: input.projectId,
      fields: ["folder_refs"],
      actorUserId: input.ownerUserId,
    });
    return { ok: true, folderRef };
  }

  const rows = asRowArray(
    await sql`
      INSERT INTO project_folder_refs (
        id, project_id, machine_or_device_ref, folder_path
      )
      VALUES (
        ${randomUUID()}, ${input.projectId}, ${machine}, ${folder}
      )
      RETURNING *
    `,
  );
  if (rows.length === 0) {
    return { ok: false, code: "invalid" };
  }
  const folderRef = mapProjectFolderRefRow(rows[0]);
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.ownerUserId,
    action: "add_folder_ref",
    detail: { folderRefId: folderRef.id },
  });
  await scheduleProjectUpdatedNotify({
    projectId: input.projectId,
    fields: ["folder_refs"],
    actorUserId: input.ownerUserId,
  });
  return { ok: true, folderRef };
};
