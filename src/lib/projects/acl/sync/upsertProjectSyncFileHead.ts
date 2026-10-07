import type { ProjectSyncKind } from "@/lib/projects/acl/sync/projectSync.constants";
import { getSql } from "@/lib/db";

export const upsertProjectSyncFileHead = async (input: {
  readonly projectId: string;
  readonly path: string;
  readonly kind: ProjectSyncKind;
  readonly seq: number;
  readonly contentSha256: string;
  readonly size: number;
  readonly deviceId: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    INSERT INTO project_sync_files (
      project_id, path, kind, head_seq, content_sha256, size_bytes,
      origin_device_id, deleted, updated_at
    ) VALUES (
      ${input.projectId},
      ${input.path},
      ${input.kind},
      ${input.seq},
      ${input.contentSha256},
      ${input.size},
      ${input.deviceId},
      false,
      NOW()
    )
    ON CONFLICT (project_id, path) DO UPDATE SET
      head_seq = EXCLUDED.head_seq,
      content_sha256 = EXCLUDED.content_sha256,
      size_bytes = EXCLUDED.size_bytes,
      origin_device_id = EXCLUDED.origin_device_id,
      deleted = false,
      updated_at = NOW()
  `;
};
