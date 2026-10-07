import { assertProjectSyncDeviceAccess } from "@/lib/projects/acl/sync/assertProjectSyncDeviceAccess";
import { asRowArray, getSql } from "@/lib/db";

export type LoadProjectSyncBlobResult =
  | { readonly ok: true; readonly bodyUtf8: string; readonly sizeBytes: number }
  | {
      readonly ok: false;
      readonly code: "not_enabled" | "not_member" | "invalid" | "not_found";
    };

export const loadProjectSyncBlobUtf8 = async (input: {
  readonly projectId: string;
  readonly deviceId: string;
  readonly contentSha256: string;
}): Promise<LoadProjectSyncBlobResult> => {
  const access = await assertProjectSyncDeviceAccess(input);
  if (!access.ok) {
    return {
      ok: false,
      code: access.code === "folder_ref_required" ? "not_enabled" : access.code,
    };
  }
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT bytes, size_bytes FROM project_sync_blobs
      WHERE project_id = ${input.projectId}
        AND content_sha256 = ${input.contentSha256}
      LIMIT 1
    `,
  );
  if (rows.length === 0 || rows[0].bytes == null) {
    return { ok: false, code: "not_found" };
  }
  const buf = Buffer.isBuffer(rows[0].bytes)
    ? rows[0].bytes
    : Buffer.from(rows[0].bytes as Uint8Array);
  return {
    ok: true,
    bodyUtf8: buf.toString("utf8"),
    sizeBytes: Number(rows[0].size_bytes),
  };
};
