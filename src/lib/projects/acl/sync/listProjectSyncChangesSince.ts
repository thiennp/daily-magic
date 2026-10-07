import { assertProjectSyncDeviceAccess } from "@/lib/projects/acl/sync/assertProjectSyncDeviceAccess";
import { asRowArray, getSql } from "@/lib/db";

export type ProjectSyncChangeRow = {
  readonly seq: number;
  readonly path: string;
  readonly contentSha256: string;
  readonly sizeBytes: number;
  readonly outcome: string;
  readonly kind: string;
};

export type ListProjectSyncChangesResult =
  | { readonly ok: true; readonly changes: readonly ProjectSyncChangeRow[] }
  | {
      readonly ok: false;
      readonly code: "not_enabled" | "not_member" | "invalid";
    };

export const listProjectSyncChangesSince = async (input: {
  readonly projectId: string;
  readonly deviceId: string;
  readonly sinceSeq: number;
  readonly limit?: number;
}): Promise<ListProjectSyncChangesResult> => {
  const access = await assertProjectSyncDeviceAccess(input);
  if (!access.ok) {
    return {
      ok: false,
      code: access.code === "folder_ref_required" ? "not_enabled" : access.code,
    };
  }
  const sql = getSql();
  const limit = input.limit ?? 50;
  const rows = asRowArray(
    await sql`
      SELECT seq, path, content_sha256, size_bytes, outcome, kind
      FROM project_sync_versions
      WHERE project_id = ${input.projectId}
        AND seq > ${input.sinceSeq}
      ORDER BY seq ASC
      LIMIT ${limit}::int
    `,
  );
  return {
    ok: true,
    changes: rows.map((row) => ({
      seq: Number(row.seq),
      path: String(row.path),
      contentSha256: String(row.content_sha256),
      sizeBytes: Number(row.size_bytes),
      outcome: String(row.outcome),
      kind: String(row.kind),
    })),
  };
};
