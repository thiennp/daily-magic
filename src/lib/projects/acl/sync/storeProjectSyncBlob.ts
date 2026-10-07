import { getSql } from "@/lib/db";

export const storeProjectSyncBlob = async (input: {
  readonly projectId: string;
  readonly contentSha256: string;
  readonly size: number;
  readonly bodyUtf8: string;
}): Promise<void> => {
  const sql = getSql();
  const bytes = Buffer.from(input.bodyUtf8, "utf8");
  await sql`
    INSERT INTO project_sync_blobs (
      content_sha256, project_id, size_bytes, chunk_count, bytes
    ) VALUES (
      ${input.contentSha256},
      ${input.projectId},
      ${input.size},
      1,
      ${bytes}
    )
    ON CONFLICT (content_sha256, project_id) DO NOTHING
  `;
};
