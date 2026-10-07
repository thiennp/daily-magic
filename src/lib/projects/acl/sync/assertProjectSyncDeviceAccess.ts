import { checkFolderRefDeviceAcl } from "@/lib/projects/acl/checkFolderRefDeviceAcl";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectSyncDeviceAccessResult =
  | {
      readonly ok: true;
      readonly enabled: boolean;
      readonly syncedOnce: boolean;
    }
  | {
      readonly ok: false;
      readonly code:
        | "not_member"
        | "not_enabled"
        | "folder_ref_required"
        | "invalid";
    };

/**
 * Device must be an active computer on the project (folder ACL) and, for
 * transfer routes, owner-enabled in project_sync_devices.
 */
export const assertProjectSyncDeviceAccess = async (input: {
  readonly projectId: string;
  readonly deviceId: string;
  readonly requireEnabled?: boolean;
}): Promise<ProjectSyncDeviceAccessResult> => {
  const acl = await checkFolderRefDeviceAcl({
    projectId: input.projectId,
    machineOrDeviceRef: `device:${input.deviceId}`,
    deviceId: input.deviceId,
  });
  if (!acl.ok) {
    return {
      ok: false,
      code: acl.code === "invalid" ? "invalid" : "not_member",
    };
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT enabled, synced_once FROM project_sync_devices
      WHERE project_id = ${input.projectId}
        AND device_id = ${input.deviceId}
      LIMIT 1
    `,
  );
  if (rows.length === 0) {
    return input.requireEnabled === false
      ? { ok: true, enabled: false, syncedOnce: false }
      : { ok: false, code: "not_enabled" };
  }
  const enabled = rows[0].enabled === true;
  const syncedOnce = rows[0].synced_once === true;
  if (input.requireEnabled !== false && !enabled) {
    return { ok: false, code: "not_enabled" };
  }
  return { ok: true, enabled, syncedOnce };
};
