import { asRowArray, getSql } from "@/lib/db";

export type ComponentVersionSnapshotItem = {
  readonly itemKey: string;
  readonly relativePath: string;
  readonly contentSha256: string;
};

const loadComponentVersionItemsForSnapshot = async (
  versionId: string,
): Promise<readonly ComponentVersionSnapshotItem[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT item_key, relative_path, content_sha256
      FROM component_version_items
      WHERE component_version_id = ${versionId}
        AND content_sha256 IS NOT NULL
      ORDER BY item_key
    `,
  );

  return rows
    .map((row) => ({
      itemKey: String(row.item_key),
      relativePath: String(row.relative_path ?? ""),
      contentSha256: String(row.content_sha256),
    }))
    .filter((item) => item.contentSha256.length > 0);
};

export default loadComponentVersionItemsForSnapshot;
