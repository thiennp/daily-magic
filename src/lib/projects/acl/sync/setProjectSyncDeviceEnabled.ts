import { assertProjectSyncDeviceAccess } from "@/lib/projects/acl/sync/assertProjectSyncDeviceAccess";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";
import { getSql } from "@/lib/db";

export type SetProjectSyncDeviceEnabledResult =
  | { readonly ok: true; readonly enabled: boolean }
  | {
      readonly ok: false;
      readonly code: "not_member" | "invalid" | "forbidden";
    };

/**
 * Owner toggle: Sync this computer. Validates computer ∈ project via folder ACL.
 * Does not purge local files when disabled (LOCKED O10).
 */
export const setProjectSyncDeviceEnabled = async (input: {
  readonly projectId: string;
  readonly deviceId: string;
  readonly enabled: boolean;
  readonly actorUserId: string;
  readonly folderRefId?: string | null;
  readonly isOwner: boolean;
}): Promise<SetProjectSyncDeviceEnabledResult> => {
  if (!input.isOwner) {
    return { ok: false, code: "forbidden" };
  }
  const access = await assertProjectSyncDeviceAccess({
    projectId: input.projectId,
    deviceId: input.deviceId,
    requireEnabled: false,
  });
  if (!access.ok && access.code !== "not_enabled") {
    return {
      ok: false,
      code: access.code === "invalid" ? "invalid" : "not_member",
    };
  }
  const sql = getSql();
  await sql`
    INSERT INTO project_sync_devices (
      project_id, device_id, enabled, folder_ref_id, state, updated_at
    ) VALUES (
      ${input.projectId},
      ${input.deviceId},
      ${input.enabled},
      ${input.folderRefId ?? null},
      ${input.enabled ? "enabled" : "off"},
      NOW()
    )
    ON CONFLICT (project_id, device_id) DO UPDATE SET
      enabled = EXCLUDED.enabled,
      folder_ref_id = COALESCE(EXCLUDED.folder_ref_id, project_sync_devices.folder_ref_id),
      state = EXCLUDED.state,
      updated_at = NOW()
  `;
  await writeProjectAccessAudit({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    action: input.enabled ? "sync.device_enabled" : "sync.device_disabled",
    detail: { deviceId: input.deviceId },
  });
  return { ok: true, enabled: input.enabled };
};
