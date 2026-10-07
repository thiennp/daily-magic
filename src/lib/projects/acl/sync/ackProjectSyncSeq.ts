import { assertProjectSyncDeviceAccess } from "@/lib/projects/acl/sync/assertProjectSyncDeviceAccess";
import { PROJECT_SYNC_CHAT_PATH_PREFIX } from "@/lib/projects/acl/sync/projectSync.constants";
import { recordProjectMessageComputerAck } from "@/lib/projects/acl/messaging/recordProjectMessageComputerAck";
import { asRowArray, getSql } from "@/lib/db";

export type AckProjectSyncSeqResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code: "not_enabled" | "not_member" | "invalid" | "not_found";
    };

/**
 * Device applied seq. Chat paths also write project_message_computer_acks
 * so Neon prune can run. Marks synced_once on first ack.
 */
export const ackProjectSyncSeq = async (input: {
  readonly projectId: string;
  readonly deviceId: string;
  readonly seq: number;
}): Promise<AckProjectSyncSeqResult> => {
  const access = await assertProjectSyncDeviceAccess(input);
  if (!access.ok) {
    return {
      ok: false,
      code: access.code === "folder_ref_required" ? "not_enabled" : access.code,
    };
  }
  const sql = getSql();
  const versions = asRowArray(
    await sql`
      SELECT path, kind FROM project_sync_versions
      WHERE project_id = ${input.projectId}
        AND seq = ${input.seq}
      LIMIT 1
    `,
  );
  if (versions.length === 0) {
    return { ok: false, code: "not_found" };
  }
  await sql`
    INSERT INTO project_sync_acks (project_id, seq, device_id)
    VALUES (${input.projectId}, ${input.seq}, ${input.deviceId})
    ON CONFLICT DO NOTHING
  `;
  await sql`
    UPDATE project_sync_devices
    SET synced_once = true,
        last_pulled_seq = GREATEST(last_pulled_seq, ${input.seq}),
        updated_at = NOW()
    WHERE project_id = ${input.projectId}
      AND device_id = ${input.deviceId}
  `;
  const path = String(versions[0].path);
  if (path.startsWith(PROJECT_SYNC_CHAT_PATH_PREFIX)) {
    const messageId = path
      .slice(PROJECT_SYNC_CHAT_PATH_PREFIX.length)
      .replace(/\.json$/i, "");
    if (messageId.length > 0) {
      await recordProjectMessageComputerAck({
        projectId: input.projectId,
        messageId,
        deviceId: input.deviceId,
      });
    }
  }
  return { ok: true };
};
